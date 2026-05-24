import { useState } from "react"
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

const PRIMARY = "#1d75bb"

type Section =
  | "frontespizio"
  | "cantiere"
  | "personale"
  | "opere"
  | "rischi"
  | "emergenze"
  | "preview"

const MENU: { key: Section; label: string }[] = [
  { key: "frontespizio", label: "Frontespizio" },
  { key: "cantiere",     label: "Il Cantiere" },
  { key: "personale",    label: "Personale" },
  { key: "opere",        label: "Le Opere" },
  { key: "rischi",       label: "Rischi Specifici" },
  { key: "emergenze",    label: "Emergenze & PSC" },
  { key: "preview",      label: "Preview / PDF" },
]

export default function App() {
  const [section, setSection] = useState<Section>("frontespizio")
  const [pos, setPos] = useState<PosData>(initialPosData)

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* ── TOPBAR ── */}
      <div
        className="no-print"
        style={{
          background: PRIMARY,
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          gap: 0,
          position: "sticky",
          top: 0,
          zIndex: 50,
          boxShadow: "0 2px 8px rgba(29,117,187,0.18)",
          minHeight: 52,
        }}
      >
        {/* Logo */}
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "white", color: PRIMARY,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, fontSize: 16, marginRight: 12, flexShrink: 0,
        }}>S</div>
        <span style={{ color: "white", fontWeight: 900, fontSize: 14, letterSpacing: 2, marginRight: 24, flexShrink: 0 }}>
          SIDERIO POS
        </span>

        {/* Nav */}
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {MENU.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              style={{
                padding: "6px 14px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 600,
                transition: "background 0.15s, color 0.15s",
                background: section === key ? "white" : "rgba(255,255,255,0.12)",
                color: section === key ? PRIMARY : "white",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ padding: 24 }}>
        {section === "preview" ? (
          /* Preview: pannello stretto + documento */
          <div>
            <div
              className="no-print"
              style={{
                background: "white", borderRadius: 12, padding: 20,
                boxShadow: "0 2px 12px rgba(29,117,187,0.08)",
                maxWidth: 360, marginBottom: 24,
                borderLeft: `4px solid ${PRIMARY}`,
              }}
            >
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 12 }}>
                Anteprima completa del documento. Usa il pulsante per stampare o salvare in PDF.
              </p>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  background: PRIMARY, color: "white",
                  border: "none", borderRadius: 10,
                  padding: "10px 20px", fontWeight: 700,
                  fontSize: 14, cursor: "pointer",
                }}
              >
                🖨 Stampa / Salva PDF
              </button>
            </div>
            <DocumentoCompleto pos={pos} />
          </div>
        ) : (
          /* Editing: pannello sx + pagina dx */
          <div style={{
            maxWidth: 1400, margin: "0 auto",
            display: "grid", gridTemplateColumns: "400px 1fr", gap: 24,
          }}>
            {/* Pannello compilazione */}
            <div
              className="no-print"
              style={{
                background: "white", borderRadius: 12, padding: 20,
                boxShadow: "0 2px 12px rgba(29,117,187,0.08)",
                position: "sticky", top: 68,
                maxHeight: "calc(100vh - 88px)", overflowY: "auto",
                borderTop: `3px solid ${PRIMARY}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: PRIMARY, color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 900, fontSize: 13,
                }}>S</div>
                <h1 style={{ fontSize: 17, fontWeight: 800, color: PRIMARY, margin: 0 }}>
                  Compilazione POS
                </h1>
              </div>

              {section === "frontespizio" && (
                <InfoBox>
                  Il frontespizio non si compila direttamente. Riprende automaticamente i dati inseriti nelle sezioni successive.
                </InfoBox>
              )}
              {section === "cantiere"   && <CantierePanel pos={pos} setPos={setPos} />}
              {section === "personale"  && <PersonalePanel pos={pos} setPos={setPos} />}
              {section === "opere"      && <OperePanel pos={pos} setPos={setPos} />}
              {section === "rischi"     && <RischiPanel pos={pos} setPos={setPos} />}
              {section === "emergenze"  && <EmergenzePscPanel pos={pos} setPos={setPos} />}
            </div>

            {/* Pagina documento */}
            <div>
              {section === "frontespizio" && <Frontespizio pos={pos} />}
              {section === "cantiere"     && <Capitolo0Cantiere pos={pos} />}
              {section === "personale"    && <Capitolo1Personale pos={pos} />}
              {section === "opere"        && <Capitolo2Opere pos={pos} />}
              {section === "rischi"       && <Capitolo3Rischi pos={pos} />}
              {section === "emergenze"    && (
                <>
                  <Capitolo4Emergenze pos={pos} />
                  <Capitolo5Psc pos={pos} />
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
