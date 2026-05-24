import Page from "../components/Page"
import type { PosData } from "../types/pos"
import type { FormazioneFlags } from "../data/personale"
import { persone } from "../data/personale"

type Props = { pos: PosData; pageNumber?: number }

const formazioneCampi: { key: keyof FormazioneFlags; label: string }[] = [
  { key: "rsppDatoreLavoro",              label: "RSPP DL" },
  { key: "altoRischioGenerale",           label: "ALTO RISCHIO" },
  { key: "specificaLavoratoriAltoRischio",label: "SPECIFICA AR" },
  { key: "dpiTerzaCategoria",             label: "DPI III CAT" },
  { key: "abilitazionePle",               label: "PLE" },
  { key: "primoSoccorso",                 label: "PRIMO SOCC." },
  { key: "antincendioRischioMedio",       label: "ANTINC." },
  { key: "preposto",                      label: "PREPOSTO" },
]

function H1({ children }: { children: React.ReactNode }) {
  return <h1 style={{ fontSize:"13pt", fontWeight:"bold", marginBottom:"4mm" }}>{children}</h1>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize:"11pt", fontWeight:"bold", marginBottom:"3mm", marginTop:"4mm" }}>{children}</h2>
}

export default function Capitolo1Personale({ pos, pageNumber }: Props) {
  const pn = pageNumber ?? 6

  return (
    <>
      {/* ── PAGINA 6: 1.1 + 1.2 + 1.3 ── */}
      <Page pos={pos} pageNumber={pn}>
        <H1>1. PERSONALE IN CANTIERE</H1>

        <H2>1.1 Addetti in cantiere</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt", marginBottom:"5mm" }}>
          <thead>
            <tr>
              {["Nome e cognome","Funzione","Ruolo","Qualifica / mansione"].map((h) => (
                <th key={h} style={{ border:"1pt solid #000", padding:"1.5mm 2mm", background:"#e5e7eb", textAlign:"left", fontWeight:"bold", fontSize:"9pt" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pos.personaleCantiere.map((row, i) => {
              const p = persone.find((p) => p.id === row.personaId)
              return (
                <tr key={i}>
                  <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{p?.nome || ""}</td>
                  <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{p?.funzione || ""}</td>
                  <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{row.ruolo}</td>
                  <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{p?.qualificaMansione || ""}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <H2>1.2 Addetti all'emergenza in cantiere</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt", marginBottom:"5mm" }}>
          <thead>
            <tr>
              {["Nome e cognome","Funzione","Ruolo emergenza"].map((h) => (
                <th key={h} style={{ border:"1pt solid #000", padding:"1.5mm 2mm", background:"#e5e7eb", textAlign:"left", fontWeight:"bold" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pos.addettiEmergenza.map((row, i) => {
              const p = persone.find((p) => p.id === row.personaId)
              return (
                <tr key={i}>
                  <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{p?.nome || ""}</td>
                  <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{p?.funzione || ""}</td>
                  <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{row.ruoloEmergenza}</td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <H2>1.3 Formazione del personale presente</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"8pt", marginBottom:"5mm" }}>
          <thead>
            <tr>
              <th style={{ border:"1pt solid #000", padding:"1mm 2mm", background:"#e5e7eb", textAlign:"left", fontWeight:"bold" }}>NOME E COGNOME</th>
              {formazioneCampi.map((c) => (
                <th key={c.key} style={{ border:"1pt solid #000", padding:"1mm 2mm", background:"#e5e7eb", textAlign:"center", fontWeight:"bold", fontSize:"7pt" }}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pos.personaleCantiere.map((row, i) => {
              const p = persone.find((p) => p.id === row.personaId)
              const f = pos.formazionePersonale[row.personaId]
              if (!p || !f) return null
              return (
                <tr key={i}>
                  <td style={{ border:"1pt solid #000", padding:"1mm 2mm" }}>{p.nome}</td>
                  {formazioneCampi.map((c) => (
                    <td key={c.key} style={{ border:"1pt solid #000", padding:"1mm 2mm", textAlign:"center" }}>{f[c.key] ? "X" : ""}</td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </Page>

      {/* ── PAGINA 7: 1.4 DPI ── */}
      <Page pos={pos} pageNumber={pn + 1}>
        <H2>1.4 DPI in dotazione per il cantiere</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt" }}>
          <thead>
            <tr>
              <th style={{ border:"1pt solid #000", padding:"1.5mm 2mm", background:"#e5e7eb", textAlign:"left", fontWeight:"bold" }}>Presenza in cantiere</th>
              <th style={{ border:"1pt solid #000", padding:"1.5mm 2mm", background:"#e5e7eb", textAlign:"center", fontWeight:"bold", width:"15mm" }}>Sì</th>
              <th style={{ border:"1pt solid #000", padding:"1.5mm 2mm", background:"#e5e7eb", textAlign:"center", fontWeight:"bold", width:"15mm" }}>No</th>
            </tr>
          </thead>
          <tbody>
            {pos.dpiCantiere.map((dpi) => (
              <tr key={dpi.id}>
                <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{dpi.nome}</td>
                <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm", textAlign:"center" }}>{dpi.presente ? "X" : ""}</td>
                <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm", textAlign:"center" }}>{!dpi.presente ? "X" : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </>
  )
}
