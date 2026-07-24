import React, { useState, useEffect, useMemo } from "react"
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
import DichiarazioniPanel, { DichiarazioniPreview } from './pages/Dichiarazioni'
import { usePosStorage } from "./hooks/usePosStorage"
import { initSessionFromSuite } from "./supabaseClient"

const SUITE_URL = 'https://siderio-suite-app.vercel.app'
// const GREEN = "#22843a"
// const AMBER = "#b45309"

type Section = "frontespizio" | "cantiere" | "personale" | "opere" | "rischi" | "emergenze" | "dichiarazioni" | "preview"

const MENU: { key: Section; label: string }[] = [
  { key: "frontespizio", label: "Frontespizio" },
  { key: "cantiere",     label: "Il Cantiere" },
  { key: "personale",    label: "Personale" },
  { key: "opere",        label: "Le Opere" },
  { key: "rischi",       label: "Rischi Specifici" },
  { key: "emergenze",    label: "Emergenze & PSC" },
  { key: "dichiarazioni", label: "Dichiarazioni" },
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

type UrlParams = ReturnType<typeof getUrlParams>

const LOCAL_DRAFT_PREFIX = 'siderio-pos:draft:'

function getDraftKey({ commessaId, numero, cliente }: UrlParams) {
  const key = commessaId || numero || cliente || 'standalone'
  return `${LOCAL_DRAFT_PREFIX}${encodeURIComponent(key)}`
}

function createInitialPos(numero: string, cliente: string): PosData {
  return {
    ...initialPosData,
    commessa: numero,
    committente: {
      ...initialPosData.committente,
      nomeDitta: cliente,
    },
  }
}


// ─── MINIATURE PAGINE ────────────────────────────────────────────────────────
const PAGINE: { n: number; label: string; section: Section }[] = [
  { n: 1,  label: "Frontespizio",   section: "frontespizio" },
  { n: 2,  label: "Sommario",       section: "frontespizio" },
  { n: 3,  label: "0.1 Dati doc.",  section: "cantiere" },
  { n: 4,  label: "0.5 Appaltatrice", section: "cantiere" },
  { n: 5,  label: "0.7 Cantiere",   section: "cantiere" },
  { n: 6,  label: "1. Personale",   section: "personale" },
  { n: 7,  label: "1.4 DPI",        section: "personale" },
  { n: 8,  label: "2. Opere",       section: "opere" },
  { n: 9,  label: "3. Rischi 1",    section: "rischi" },
  { n: 10, label: "3. Rischi 2",    section: "rischi" },
  { n: 11, label: "3. Rischi 3",    section: "rischi" },
  { n: 12, label: "4. Emergenze",   section: "emergenze" },
  { n: 13, label: "5. PSC 1",       section: "emergenze" },
  { n: 14, label: "5. PSC 2",       section: "emergenze" },
]

function ThumbnailStrip({ onSectionChange }: { onSectionChange: (s: Section) => void }) {
  const [activePage, setActivePage] = React.useState(1)
  const stripRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    // IntersectionObserver: rileva quale pagina è visibile
    const pages = document.querySelectorAll('.page-a4')
    if (!pages.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Array.from(pages).indexOf(entry.target as HTMLElement)
            if (idx !== -1) {
              const pageNum = idx + 1
              setActivePage(pageNum)
              // Scrolla la strip per tenere la miniatura attiva in vista
              if (stripRef.current) {
                const thumb = stripRef.current.querySelector(`[data-page="${pageNum}"]`) as HTMLElement
                if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
              }
            }
          }
        })
      },
      { threshold: 0.4 }
    )

    pages.forEach(p => observer.observe(p))
    return () => observer.disconnect()
  }, [])

  function scrollToPage(n: number, section?: Section) {
    const pages = document.querySelectorAll('.page-a4')
    const page = pages[n - 1]
    if (page) page.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActivePage(n)
    if (section) onSectionChange(section)
  }

  return (
    <div
      ref={stripRef}
      className="no-print"
      style={{
        width: 110, flexShrink: 0, background: 'white',
        borderLeft: '1px solid #EDE9FE',
        overflowY: 'auto', overflowX: 'hidden',
        position: 'sticky', top: 68,
        height: 'calc(100vh - 68px)',
        padding: '12px 8px',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
    >
      {PAGINE.map(p => (
        <div
          key={p.n}
          data-page={p.n}
          onClick={() => scrollToPage(p.n, p.section)}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}
        >
          <div style={{
            width: 88, height: 124, borderRadius: 4, overflow: 'hidden',
            border: activePage === p.n ? '2px solid #7C3AED' : '1.5px solid #E5E7EB',
            boxShadow: activePage === p.n ? '0 0 0 2px rgba(124,58,237,0.2)' : 'none',
            background: '#FAFAFA',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color 0.15s',
          }}>
            <div style={{
              fontSize: 7, color: activePage === p.n ? '#5B21B6' : '#9CA3AF',
              textAlign: 'center', padding: '6px 4px', lineHeight: 1.4,
              fontWeight: activePage === p.n ? 700 : 400,
            }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: activePage === p.n ? '#7C3AED' : '#D1D5DB', marginBottom: 4 }}>{p.n}</div>
              {p.label}
            </div>
          </div>
          <span style={{
            fontSize: 10, fontWeight: activePage === p.n ? 700 : 400,
            color: activePage === p.n ? '#7C3AED' : '#9CA3AF',
          }}>{p.n}</span>
        </div>
      ))}
    </div>
  )
}

export default function App() {
  const [section, setSection] = useState<Section>("frontespizio")
  const leftPanelRef = React.useRef<HTMLDivElement>(null)

  function changeSection(s: Section) {
    setSection(s)
    // Reset scroll pannello sinistro in cima
    if (leftPanelRef.current) {
      leftPanelRef.current.scrollTop = 0
    }
  }
  const [pos, setPos] = useState<PosData>(initialPosData)
  const [appReady, setAppReady] = useState(false)
  const urlParams = useMemo(() => getUrlParams(), [])
  const draftKey = useMemo(() => getDraftKey(urlParams), [urlParams])
  const { loadPos, loadLocalPos, savePos, saveLocalPos, saveStatus } = usePosStorage()

  // All'avvio: carica da Supabase se c'è commessa_id, altrimenti pre-compila con URL params
  useEffect(() => {
    async function init() {
      try {
      await initSessionFromSuite()
      const { commessaId, numero, cliente } = urlParams

      if (commessaId) {
        let saved = null
        try { saved = await loadPos(commessaId) } catch(e) { console.warn('Supabase load failed:', e) }
        if (saved) {
          setPos(saved)
        } else {
          const localDraft = loadLocalPos(draftKey)
          if (localDraft) {
            setPos(localDraft)
          } else {
            // Nuovo POS: pre-compila commessa e committente dall'URL
            setPos(createInitialPos(numero, cliente))
          }
        }
      } else {
        const localDraft = loadLocalPos(draftKey)
        if (localDraft) {
          setPos(localDraft)
        } else if (numero || cliente) {
          // Parametri URL senza commessa_id (modalità standalone)
          setPos(createInitialPos(numero, cliente))
        } else {
          setPos(initialPosData)
        }
      }

      } catch(e) { console.error('Init error:', e) }
      setAppReady(true)
    }
    init()
  }, [draftKey, loadLocalPos, loadPos, urlParams])

  // Autosave disabilitato in modalità demo

  function handleSave() {
    if (urlParams.commessaId) {
      void savePos(pos, urlParams.commessaId)
    } else {
      saveLocalPos(pos, draftKey)
    }
  }

  if (!appReady) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F5F3FF" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6, justifyContent: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 28, fontWeight: 900, color: "#3B0764", letterSpacing: -0.5 }}>CC</span>
            <span style={{ fontSize: 14, fontWeight: 400, color: "#8B5CF6" }}>SIDERIO</span>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 12 }}>Caricamento...</div>
        </div>
      </div>
    )
  }

  const hasCommessa = Boolean(urlParams.commessaId)

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
          <span style={{ fontSize: 20, fontWeight: 900, color: "#3B0764", letterSpacing: -0.5 }}>S</span>
          <span style={{ fontSize: 12, fontWeight: 400, color: "#8B5CF6" }}>SIDERIO</span>
        </div>


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

        <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 0 }}>
          {MENU.map(({ key, label }) => (
            <button key={key} onClick={() => changeSection(key as Section)} style={{
              padding: "14px 12px", border: "none", cursor: "pointer",
              fontSize: 13, fontWeight: section === key ? 700 : 500,
              background: "transparent",
              color: section === key ? "#7C3AED" : "#6B7280",
              borderBottom: section === key ? "2px solid #7C3AED" : "2px solid transparent",
              transition: "all 0.15s", whiteSpace: "nowrap",
            }}>{label}</button>
          ))}
        </div>
        <div style={{ flex: 1 }} />

        {hasCommessa && (
          <button onClick={() => { window.location.href = SUITE_URL }} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8,
            border: "1.5px solid #EDE9FE", background: "white",
            color: "#6B7280", fontWeight: 600, fontSize: 13, cursor: "pointer", marginRight: 8,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
            Suite
          </button>
        )}
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
          <button type="button" onClick={handleSave} disabled={saveStatus === 'saving'} title={hasCommessa ? "Salva la commessa" : "Salva una bozza in questo browser"} style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "7px 14px", borderRadius: 8,
            border: "1.5px solid #C4B5FD", background: "white",
            color: "#7C3AED", fontWeight: 600, fontSize: 13, cursor: saveStatus === 'saving' ? "wait" : "pointer",
            ...(saveStatus === 'saved' ? { background: "#EAF3DE", color: "#3B6D11", borderColor: "#97C459" } :
               saveStatus === 'error' ? { background: "#FCEBEB", color: "#A32D2D", borderColor: "#F09595" } : {}),
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
            {saveStatus === 'saving' ? 'Salvo...' : saveStatus === 'saved' ? '✓ Salvato' : saveStatus === 'error' ? '✗ Errore' : 'Salva'}
          </button>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: 24 }}>
        {section === "preview" ? (
          <div style={{ display: "flex", gap: 0 }}>
            {/* Documento + toolbar */}
            <div style={{ flex: 1 }}>
              <div className="no-print" style={{
                background: "white", borderRadius: 12, padding: 16,
                boxShadow: "0 2px 12px rgba(91,33,182,0.08)", maxWidth: 360, marginBottom: 20,
                borderLeft: "4px solid #7C3AED",
              }}>
                <p style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
                  Anteprima completa del documento.
                </p>
                <button type="button" onClick={() => window.print()} style={{
                  background: "#7C3AED", color: "white", border: "none", borderRadius: 10,
                  padding: "10px 20px", fontWeight: 700, fontSize: 14, cursor: "pointer", width: "100%",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                  Stampa / Salva PDF
                </button>

              </div>
              <div id="doc-scroll-area">
                <DocumentoCompleto pos={pos} />
              </div>
            </div>

            </div>
        ) : (
          <div style={{ maxWidth: 1400, margin: "0 auto", display: "grid", gridTemplateColumns: "400px 1fr 110px", gap: 0 }}>
            <div ref={leftPanelRef} className="no-print" style={{
              background: "white", borderRadius: 12,
              boxShadow: "0 2px 12px rgba(91,33,182,0.08)",
              position: "sticky", top: 68, maxHeight: "calc(100vh - 88px)",
              border: "1px solid #EDE9FE", display: "flex", flexDirection: "column",
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
              <div style={{ padding: "14px 18px", overflowY: "auto", flex: 1 }}>

              {section === "frontespizio" && <InfoBox>Il frontespizio non si compila direttamente. Riprende automaticamente i dati inseriti nelle sezioni successive.</InfoBox>}
              {section === "dichiarazioni" && <DichiarazioniPanel pos={pos} />}
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
              {section === "dichiarazioni" && <DichiarazioniPreview pos={pos} />}
            </div>
            {/* Colonna miniature — sempre visibile */}
            <ThumbnailStrip onSectionChange={changeSection} />
          </div>
        )}
      </div>
    </div>
  )
}
