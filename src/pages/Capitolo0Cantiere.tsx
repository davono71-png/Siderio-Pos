import Page from "../components/Page"
import type { PosData } from "../types/pos"
import { persone } from "../data/personale"

type Props = { pos: PosData; pageNumber?: number }

function getPreposto(pos: PosData): string {
  const row = pos.personaleCantiere.find((r) => r.ruolo === "PREPOSTO")
  if (!row) return pos.nostraDitta.referenteAppalto || "Da definire"
  const p = persone.find((p) => p.id === row.personaId)
  return p?.nomeCompleto || pos.nostraDitta.referenteAppalto || "Da definire"
}

function formatDate(date: string) {
  if (!date) return "—"
  const [y, m, d] = date.split("-")
  return `${d}/${m}/${y}`
}

function checked(v: boolean) { return v ? "☒" : "☐" }

function CompanyTable({ rows }: { rows: [string, string][] }) {
  return (
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt", marginBottom:"5mm" }}>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm", fontWeight:"600", width:"45%", verticalAlign:"top" }}>{label}</td>
            <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm", verticalAlign:"top" }}>{value || " "}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function SmallTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt", marginBottom:"5mm" }}>
      <thead>
        <tr>
          {headers.map((h) => (
            <th key={h} style={{ border:"1pt solid #000", padding:"1.5mm 2mm", background:"#e5e7eb", textAlign:"left", fontWeight:"bold" }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function H1({ children }: { children: React.ReactNode }) {
  return <h1 style={{ fontSize:"13pt", fontWeight:"bold", marginBottom:"4mm" }}>{children}</h1>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize:"11pt", fontWeight:"bold", marginBottom:"3mm", marginTop:"4mm" }}>{children}</h2>
}
function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize:"10pt", marginBottom:"3mm", lineHeight:"1.4" }}>{children}</p>
}

export default function Capitolo0Cantiere({ pos, pageNumber }: Props) {
  const titoloNostraDitta = pos.esisteAppaltatrice ? "0.6 Subappaltatrice" : "0.6 Appaltatrice"
  const preposto = getPreposto(pos)
  const pn = pageNumber ?? 3

  return (
    <>
      {/* ── PAGINA 3: 0.1 → 0.4 ── */}
      <Page pos={pos} pageNumber={pn}>
        <H1>0. IL CANTIERE</H1>

        <H2>0.1 Dati emissione documento</H2>
        <SmallTable
          headers={["Data", "Revisione nr", "Note di revisione"]}
          rows={[[formatDate(pos.dataRevisione), pos.revisione, pos.descrizioneRevisione]]}
        />

        <H2>0.2 Descrizione generale delle opere</H2>
        <P>{checked(pos.lavorazioniInterno)} INSTALLAZIONE – MONTAGGIO PER INTERNI – <strong>{pos.lavorazioniInterno ? pos.lavori || "..." : ""}</strong></P>
        <P>{checked(pos.lavorazioniEsterno)} INSTALLAZIONE – MONTAGGIO PER ESTERNI – <strong>{pos.lavorazioniEsterno ? pos.lavori || "..." : ""}</strong></P>

        <H2>0.3 Note al Piano Operativo di sicurezza</H2>
        <P>Il presente documento è stato redatto sulla base delle indicazioni dell'appaltatore pertanto potrebbe subire modifiche e variazioni finalizzate al miglioramento dello stesso e della sicurezza delle persone che saranno presenti nei luoghi di lavoro indicati nelle sezioni successive.</P>

        <H2>0.4 Committente</H2>
        <CompanyTable rows={[
          ["Nome ditta", pos.committente.nomeDitta],
          ["Responsabile dei Lavori", pos.committente.responsabileLavori],
          ["Indirizzo di cantiere", pos.committente.indirizzoCantiere],
          ["Referente", pos.committente.referente],
          ["Direttore Lavori", pos.committente.direttoreLavori],
          ["Coordinatore della sicurezza", pos.committente.coordinatoreSicurezza],
          ["PSC", pos.committente.psc ? "Sì ☒   No ☐" : "Sì ☐   No ☒"],
        ]} />
      </Page>

      {/* ── PAGINA 4: 0.5 → 0.6 ── */}
      <Page pos={pos} pageNumber={pn + 1}>
        {pos.esisteAppaltatrice && (
          <>
            <H2>0.5 Appaltatrice</H2>
            <CompanyTable rows={[
              ["Nome ditta", pos.appaltatrice.nomeDitta],
              ["Indirizzo Sede Legale", pos.appaltatrice.sedeLegale],
              ["Indirizzo Sede Operativa", pos.appaltatrice.sedeOperativa],
              ["Datore di lavoro", pos.appaltatrice.datoreLavoro],
              ["Referente aziendale d'appalto", pos.appaltatrice.referenteAppalto],
              ["Responsabile del servizio di prevenzione e protezione", pos.appaltatrice.rspp],
              ["Medico del lavoro", pos.appaltatrice.medicoLavoro],
              ["Rappresentante dei Lavoratori per la sicurezza", pos.appaltatrice.rls],
            ]} />
          </>
        )}

        <H2>{titoloNostraDitta}</H2>
        <CompanyTable rows={[
          ["Nome ditta", pos.nostraDitta.nomeDitta],
          ["Indirizzo Sede Legale", pos.nostraDitta.sedeLegale],
          ["Indirizzo Sede Operativa", pos.nostraDitta.sedeOperativa],
          ["Datore di lavoro", pos.nostraDitta.datoreLavoro],
          ["Referente aziendale d'appalto o preposto", preposto],
          ["Responsabile del servizio di prevenzione e protezione", pos.nostraDitta.rspp],
          ["Medico del lavoro", pos.nostraDitta.medicoLavoro],
          ["Rappresentante dei Lavoratori per la sicurezza", pos.nostraDitta.rls],
        ]} />
      </Page>

      {/* ── PAGINA 5: 0.7 → 0.9 ── */}
      <Page pos={pos} pageNumber={pn + 2}>
        <H2>0.7 Numeri utili</H2>
        <SmallTable
          headers={["Nominativo", "Telefono", "Cellulare"]}
          rows={pos.numeriUtili.map((n) => [n.nominativo, n.telefono, n.cellulare])}
        />

        <H2>0.8 Firme</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt", marginBottom:"5mm" }}>
          <tbody>
            <tr>
              <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm", fontWeight:"600", width:"40%" }}>Ditta</td>
              <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{pos.firme.ditta}</td>
            </tr>
            <tr>
              <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm", fontWeight:"600" }}>Firmatario</td>
              <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{pos.firme.firmatario}</td>
            </tr>
          </tbody>
        </table>

        <H2>0.9 Durata del cantiere</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt" }}>
          <tbody>
            {[
              ["Periodo", `${formatDate(pos.durataCantiere.periodoDa)} – ${formatDate(pos.durataCantiere.periodoA)}`],
              ["Mattino", `${pos.durataCantiere.mattinoDa} – ${pos.durataCantiere.mattinoA}`],
              ["Pomeriggio", `${pos.durataCantiere.pomeriggioDa} – ${pos.durataCantiere.pomeriggioA}`],
              ["Orario continuato", pos.durataCantiere.orarioContinuato ? "Sì" : "No"],
              ["Note", pos.durataCantiere.note],
            ].map(([label, value]) => (
              <tr key={label}>
                <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm", fontWeight:"600", width:"35%" }}>{label}</td>
                <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm" }}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Page>
    </>
  )
}
