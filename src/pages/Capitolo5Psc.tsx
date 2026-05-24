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

function box(checked: boolean) { return checked ? "☒" : "☐" }

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ border:"1pt solid #000", padding:"1.5mm 2mm", textAlign:"center", fontWeight:"bold", textTransform:"uppercase", background:"#e5e7eb", fontSize:"10pt" }}>{children}</th>
}
function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ border:"1pt solid #000", padding:"1.5mm 2mm", verticalAlign:"top", fontSize:"10pt" }}>{children}</td>
}
function H1({ children }: { children: React.ReactNode }) {
  return <h1 style={{ fontSize:"13pt", fontWeight:"bold", marginBottom:"4mm" }}>{children}</h1>
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ fontSize:"11pt", fontWeight:"bold", marginBottom:"3mm", marginTop:"4mm" }}>{children}</h2>
}

export default function Capitolo5Psc({ pos, pageNumber }: Props) {
  const preposto = getPreposto(pos)
  const pn = pageNumber ?? 13

  return (
    <>
      {/* ── PAGINA 1: intro + 5.1 + 5.2 + 5.3 ── */}
      <Page pos={pos} pageNumber={pn}>
        <H1>5. COORDINAMENTO CON IL PSC</H1>

        <p style={{ fontSize:"10pt", marginBottom:"3mm" }}>
          PSC richiesto: Sì {box(pos.pscRichiesto)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!pos.pscRichiesto)}
        </p>
        <p style={{ fontSize:"10pt", lineHeight:"1.4", marginBottom:"5mm" }}>
          Le presenti misure di coordinamento sono adottate in conformità al Piano di Sicurezza e
          Coordinamento (PSC) redatto dal Coordinatore per la Sicurezza in fase di Progettazione
          (CSP) ove presente, e integrano le disposizioni del presente POS.
        </p>

        <H2>5.1 Accesso fornitori e mezzi al cantiere</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt", marginBottom:"5mm" }}>
          <thead><tr><Th>Disposizione</Th><Th>Modalità</Th></tr></thead>
          <tbody>
            <tr><Td>Accesso veicoli</Td><Td>Solo dal varco autorizzato indicato nel layout di cantiere. Obbligo di rispettare la segnaletica e i limiti di velocità.</Td></tr>
            <tr><Td>Accesso personale</Td><Td>Tutti i lavoratori devono essere in possesso di idonea tessera di riconoscimento. L'accesso è consentito previo accordo con il preposto.</Td></tr>
            <tr><Td>Fornitori e ditte esterne</Td><Td>Devono essere preventivamente informati delle norme di sicurezza in vigore nel cantiere e firmare il documento di presa visione.</Td></tr>
          </tbody>
        </table>

        <H2>5.2 Pulizia, ordine e gestione rifiuti</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt", marginBottom:"5mm" }}>
          <thead><tr><Th>Attività</Th><Th>Responsabilità</Th><Th>Frequenza</Th></tr></thead>
          <tbody>
            <tr><Td>Pulizia dell'area di lavoro</Td><Td>Ogni lavoratore</Td><Td>Fine giornata</Td></tr>
            <tr><Td>Raccolta e smaltimento rifiuti</Td><Td>Preposto</Td><Td>Periodica</Td></tr>
            <tr><Td>Ordine deposito materiali</Td><Td>Tutti i lavoratori</Td><Td>Continuativa</Td></tr>
          </tbody>
        </table>

        <H2>5.3 Distanze di sicurezza e utilizzo DPI</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt" }}>
          <thead><tr><Th>Situazione</Th><Th>Misura</Th></tr></thead>
          <tbody>
            <tr><Td>Distanza da scavi, buche, aperture</Td><Td>Minimo 1 metro dal bordo, delimitato con nastro o barriere fisiche</Td></tr>
            <tr><Td>Lavori in quota</Td><Td>Obbligatorio uso imbracatura anticaduta con doppio cordino</Td></tr>
            <tr><Td>Uso di utensili elettrici/meccanici</Td><Td>Occhiali protettivi, guanti antitaglio, scarpe antinfortunistiche</Td></tr>
            <tr><Td>Presenza di agenti chimici</Td><Td>Guanti nitrile, occhiali mascherina, facciale filtrante FFP2/P3</Td></tr>
            <tr><Td>Rumori superiori a 85 dB(A)</Td><Td>Cuffie antirumore o tappi auricolari</Td></tr>
          </tbody>
        </table>
      </Page>

      {/* ── PAGINA 2: 5.4 + 5.5 + 5.6 ── */}
      <Page pos={pos} pageNumber={pn + 1}>
        <H2>5.4 Sorveglianza sanitaria</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt", marginBottom:"5mm" }}>
          <thead><tr><Th>Voce</Th><Th>Dettaglio</Th></tr></thead>
          <tbody>
            <tr><Td>Medico Competente</Td><Td>{pos.nostraDitta.medicoLavoro || "—"}</Td></tr>
            <tr><Td>Lavoratori soggetti a sorveglianza</Td><Td>Tutti i lavoratori esposti a rischi specifici (rumore, vibrazioni, agenti chimici, lavoro in quota) come indicato nel DVR aziendale</Td></tr>
            <tr><Td>Periodicità visite</Td><Td>Annuale o secondo prescrizione del medico competente</Td></tr>
            <tr><Td>Idoneità</Td><Td>Tutti i lavoratori presenti in cantiere sono in possesso di giudizio di idoneità alla mansione specifica</Td></tr>
          </tbody>
        </table>

        <H2>5.5 Sospensione delle lavorazioni</H2>
        <p style={{ fontSize:"10pt", marginBottom:"2mm" }}>Le lavorazioni devono essere sospese nelle seguenti condizioni:</p>
        <ul style={{ fontSize:"10pt", lineHeight:"1.5", marginBottom:"5mm", paddingLeft:"6mm" }}>
          <li>Condizioni meteorologiche avverse che compromettono la sicurezza, in particolare per i lavori in quota.</li>
          <li>Presenza di rischi non preventivati o situazioni di pericolo imminente rilevate dal preposto.</li>
          <li>Richiesta del Coordinatore per la Sicurezza (CSE) o degli organi di vigilanza.</li>
          <li>Guasto o malfunzionamento di attrezzature essenziali per la sicurezza.</li>
        </ul>

        <H2>5.6 Ruoli e responsabilità</H2>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"10pt" }}>
          <thead><tr><Th>Ruolo</Th><Th>Nominativo</Th><Th>Responsabilità principali</Th></tr></thead>
          <tbody>
            <tr><Td>Datore di Lavoro</Td><Td>{pos.nostraDitta.datoreLavoro}</Td><Td>Responsabilità generale della sicurezza, emissione del POS, nomina delle figure aziendali</Td></tr>
            <tr><Td>RSPP</Td><Td>{pos.nostraDitta.rspp}</Td><Td>Supporto al datore di lavoro nella valutazione dei rischi e nell'elaborazione del DVR/POS</Td></tr>
            <tr><Td>RLS</Td><Td>{pos.nostraDitta.rls}</Td><Td>Rappresenta i lavoratori in materia di sicurezza</Td></tr>
            <tr><Td>Preposto</Td><Td>{preposto}</Td><Td>Sorveglia l'esecuzione dei lavori, interviene in caso di pericolo</Td></tr>
            <tr><Td>Medico Competente</Td><Td>{pos.nostraDitta.medicoLavoro}</Td><Td>Sorveglianza sanitaria dei lavoratori</Td></tr>
          </tbody>
        </table>
      </Page>
    </>
  )
}
