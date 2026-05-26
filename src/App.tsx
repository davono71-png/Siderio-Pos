import { useState, useEffect, useRef } from "react"
import DocumentoCompleto from "./pages/DocumentoCompleto"
import Frontespizio from "./pages/Frontespizio"
import Capitolo0Cantiere from "./pages/Capitolo0Cantiere"
import Capitolo1Personale from "./pages/Capitolo1Personale"
import Capitolo2Opere from "./pages/Capitolo2Opere"
import Capitolo3Rischi from "./pages/Capitolo3Rischi"
import Capitolo4Emergenze from "./pages/Capitolo4Emergenze"
import Capitolo5Psc from "./pages/Capitolo5Psc"
import CantierePanel from "./panels/CantierePanel"
import PersonalePanel from "./panels/PersonalePanel"
import OperePanel from "./panels/OperePanel"
import RischiPanel from "./panels/RischiPanel"
import EmergenzePscPanel from "./panels/EmergenzePscPanel"
import InfoBox from "./components/form/Infobox"
import { initialPosData } from "./data/initialPosData"
import type { PosData } from "./types/pos"
import { usePosStorage } from "./hooks/usePosStorage"

const PRIMARY = "#7C3AED"
const SUITE_URL = 'https://siderio-suite-app.vercel.app'
const GREEN = "#22843a"
const AMBER = "#b45309"

type Section = "frontespizio" | "cantiere" | "personale" | "opere" | "rischi" | "emergenze" | "preview"

const MENU: { key: Section; label: string }[] = [
  { key: "frontespizio", label: "Frontespizio" },
  { key: "cantiere",     label: "Il Cantiere" },
  { key: "personale",    label: "Personale" },
  { key: "opere",        label: "Le Opere" },
  { key: "rischi",       label: "Rischi Specifici" },
  { key: "emergenze",    label: "Emergenze & PSC" },
  { key: "preview",      label: "Preview / PDF" },
]

// Legge i parametri dall'URL: ?commessa_id=xxx&numero=3928&cliente=Fabrizio+Conte
function getUrlParams() {
  const p = new URLSearchParams(window.location.search)
  return {
    commessaId: p.get('commessa_id'),
    numero: p.get('numero') || '',
    cliente: p.get('cliente') || '',
  }
}

export default function App() {
  const [section, setSection] = useState<Section>("frontespizio")
  const [pos, setPos] = useState<PosData>(initialPosData)
  const [appReady, setAppReady] = useState(false)
  const urlParams = useRef(getUrlParams())
  const { loadPos, savePos, saveStatus, setLoading } = usePosStorage(urlParams.current.commessaId)

  // All'avvio: carica da Supabase se c'è commessa_id, altrimenti pre-compila con URL params
  useEffect(() => {
    async function init() {
      try {
      const { commessaId, numero, cliente } = urlParams.current

      if (commessaId) {
        let saved = null
        try { saved = await loadPos(commessaId) } catch(e) { console.warn('Supabase load failed:', e) }
        if (saved) {
          setPos(saved)
        } else {
          // Nuovo POS: pre-compila commessa e committente dall'URL
          setPos({
            ...initialPosData,
            commessa: numero,
            committente: {
              ...initialPosData.committente,
              nomeDitta: cliente,
            },
          })
        }
      } else if (numero || cliente) {
        // Parametri URL senza commessa_id (modalità standalone)
        setPos({
          ...initialPosData,
          commessa: numero,
          committente: {
            ...initialPosData.committente,
            nomeDitta: cliente,
          },
        })
      }

      } catch(e) { console.error('Init error:', e) }
      setLoading(false)
      setAppReady(true)
    }
    init()
  }, [])

  // Autosave disabilitato in modalità demo

  function handleSave() {
    if (urlParams.current.commessaId) {
      savePos(pos, urlParams.current.commessaId)
    }
  }

  if (!appReady) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F3FF" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, justifyContent: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#3B0764", letterSpacing: -0.5 }}>CC</span>
            <span style={{ fontSize: 14, fontWeight: 400, color: "#8B5CF6" }}>cuccaconsulting</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12 }}>Caricamento...</div>
        </div>
      </div>
    )
  }

  const hasCommessa = false // Demo: nessun collegamento a Suite

  return (
    <div style={{ minHeight: "100vh", background: "#F5F3FF" }}>
      {/* ── TOPBAR ── */}
      <div className="no-print" style={{
        background: "white", padding: "0 20px",
        display: "flex", alignItems: "center", gap: 0,
        position: "sticky", top: 0, zIndex: 50,
        boxShadow: "0 1px 4px rgba(91,33,182,0.08)",
        borderBottom: "1px solid #E5E7EB", minHeight: 52,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginRight: 28, flexShrink: 0 }}>
          <span style={{ fontSize: 20, fontWeight: 900, color: "#3B0764", letterSpacing: -0.5 }}>CC</span>
          <span style={{ fontSize: 12, fontWeight: 400, color: "#8B5CF6" }}>cuccaconsulting</span>
        </div>
        <span style={{
          background: "#EDE9FE", color: "#7C3AED", fontSize: 9,
          fontWeight: 700, padding: "2px 8px", borderRadius: 20, marginRight: 20,
          letterSpacing: 1, flexShrink: 0, border: "1px solid #C4B5FD"
        }}>DEMO</span>

        {/* Bottone torna a Commesse */}
        {hasCommessa && (
          <a
            href={SUITE_URL}
            style={{
              marginRight: 16, padding: "5px 14px", borderRadius: 8,
              background: "rgba(255,255,255,0.15)", color: "white",
              textDecoration: "none", fontSize: 13, fontWeight: 600,
              flexShrink: 0, display: "flex", alignItems: "center", gap: 6,
            }}
          >
            ← Commesse
          </a>
        )}

        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", flex: 1 }}>
          {MENU.map(({ key, label }) => (
            <button key={key} onClick={() => setSection(key)} style={{
              padding: "14px 14px", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: section === key ? 700 : 500,
              background: "transparent",
              color: section === key ? "#7C3AED" : "#6B7280",
              borderBottom: section === key ? "2px solid #7C3AED" : "2px solid transparent",
              transition: "all 0.15s",
            }}>{label}</button>
          ))}
        </div>

        <div style={{ display: "flex", gap: 8, marginLeft: "auto", flexShrink: 0 }}>
          <button onClick={() => setSection("preview")} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8,
            border: "1.5px solid #C4B5FD", background: "white",
            color: "#7C3AED", fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            Anteprima
          </button>
          <button onClick={() => { setSection("preview"); setTimeout(()=>window.print(),400) }} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8,
            border: "none", background: "#7C3AED",
            color: "white", fontWeight: 600, fontSize: 13, cursor: "pointer",
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/></svg>
            Genera PDF
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: 24 }}>
        {section === "preview" ? (
          <div>
            <div className="no-print" style={{
              background: "white", borderRadius: 12, padding: 20,
              boxShadow: "0 2px 12px rgba(91,33,182,0.08)", maxWidth: 360, marginBottom: 24,
              borderLeft: "4px solid #7C3AED",
            }}>
              {hasCommessa && (
                <div style={{ marginBottom: 12 }}>
                  <button onClick={handleSave} style={{
                    width: "100%", padding: "10px 0", background: PRIMARY, color: "white",
                    border: "none", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: "pointer", marginBottom: 8,
                  }}>
                    {saveStatus === 'saving' ? 'Salvo...' : saveStatus === 'saved' ? '✓ Salvato!' : '💾 Salva POS'}
                  </button>
                </div>
              )}
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
                Anteprima completa. Usa il pulsante per stampare o salvare in PDF.
              </p>
              <button type="button" onClick={() => window.print()} style={{
                background: AMBER, color: "white", border: "none", borderRadius: 10,
                padding: "12px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%",
                boxShadow: "0 2px 8px rgba(180,83,9,0.25)"
              }}>
                🖨 Stampa / Salva PDF
              </button>
              <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 8, textAlign: "center" }}>
                Versione demo — i dati non vengono salvati
              </p>
            </div>
            <DocumentoCompleto pos={pos} />
          </div>
        ) : (
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "400px 1fr", gap: 24 }}>
            <div className="no-print" style={{
              background: "white", borderRadius: 12,
              boxShadow: "0 2px 12px rgba(91,33,182,0.08)",
              position: "sticky", top: 68, maxHeight: "calc(100vh - 88px)", overflowY: "auto",
              border: "1px solid #EDE9FE", overflow: "hidden",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "14px 18px 12px", borderBottom: "1px solid #EDE9FE",
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <div>
                  <h1 style={{ fontSize: 15, fontWeight: 700, color: "#1E1B2E", margin: 0 }}>Compilazione POS</h1>
                  <div style={{ fontSize: 11, color: "#8B5CF6", marginTop: 1 }}>Piano Operativo di Sicurezza</div>
                </div>
              </div>
              <div style={{ padding: "14px 18px" }}>

              {section === "frontespizio" && <InfoBox>Il frontespizio non si compila direttamente. Riprende automaticamente i dati inseriti nelle sezioni successive.</InfoBox>}
              {section === "cantiere"   && <CantierePanel pos={pos} setPos={setPos} />}
              {section === "personale"  && <PersonalePanel pos={pos} setPos={setPos} />}
              {section === "opere"      && <OperePanel pos={pos} setPos={setPos} />}
              {section === "rischi"     && <RischiPanel pos={pos} setPos={setPos} />}
              {section === "emergenze"  && <EmergenzePscPanel pos={pos} setPos={setPos} />}
              </div>
            </div>

            <div>
              {section === "frontespizio" && <Frontespizio pos={pos} />}
              {section === "cantiere"     && <Capitolo0Cantiere pos={pos} />}
              {section === "personale"    && <Capitolo1Personale pos={pos} />}
              {section === "opere"        && <Capitolo2Opere pos={pos} />}
              {section === "rischi"       && <Capitolo3Rischi pos={pos} />}
              {section === "emergenze"    && <><Capitolo4Emergenze pos={pos} /><Capitolo5Psc pos={pos} /></>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
