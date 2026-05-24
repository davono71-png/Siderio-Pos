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
  return <th className="border border-black p-2 text-center align-middle font-bold uppercase bg-gray-300 text-[12px]">{children}</th>
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="border border-black p-2 align-top text-[12px]">{children}</td>
}

export default function Capitolo5Psc({ pos, pageNumber }: Props) {
  const preposto = getPreposto(pos)

  return (
    <Page pos={pos} pageNumber={pageNumber}>
      <h1 className="text-xl font-bold mb-3">5. COORDINAMENTO CON IL PSC</h1>

      <p className="text-[12px] mb-4">
        PSC richiesto: Sì {box(pos.pscRichiesto)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!pos.pscRichiesto)}
      </p>
      <p className="text-[12px] leading-relaxed mb-6">
        Le presenti misure di coordinamento sono adottate in conformità al Piano di Sicurezza e
        Coordinamento (PSC) redatto dal Coordinatore per la Sicurezza in fase di Progettazione
        (CSP) ove presente, e integrano le disposizioni del presente POS.
      </p>

      <h2 className="font-bold mb-2 text-[13px]">5.1 Accesso fornitori e mezzi al cantiere</h2>
      <table className="w-full border border-black text-[12px] mb-6">
        <thead><tr><Th>Disposizione</Th><Th>Modalità</Th></tr></thead>
        <tbody>
          <tr><Td>Accesso veicoli</Td><Td>Solo dal varco autorizzato indicato nel layout di cantiere. Obbligo di rispettare la segnaletica e i limiti di velocità.</Td></tr>
          <tr><Td>Accesso personale</Td><Td>Tutti i lavoratori devono essere in possesso di idonea tessera di riconoscimento. L'accesso è consentito previo accordo con il preposto.</Td></tr>
          <tr><Td>Fornitori e ditte esterne</Td><Td>Devono essere preventivamente informati delle norme di sicurezza in vigore nel cantiere e firmare il documento di presa visione.</Td></tr>
        </tbody>
      </table>

      <h2 className="font-bold mb-2 text-[13px]">5.2 Pulizia, ordine e gestione rifiuti</h2>
      <table className="w-full border border-black text-[12px] mb-6">
        <thead><tr><Th>Attività</Th><Th>Responsabilità</Th><Th>Frequenza</Th></tr></thead>
        <tbody>
          <tr><Td>Pulizia dell'area di lavoro</Td><Td>Ogni lavoratore è responsabile della propria area di lavoro</Td><Td>Al termine di ogni giornata lavorativa</Td></tr>
          <tr><Td>Raccolta e smaltimento rifiuti</Td><Td>Preposto</Td><Td>Periodica, secondo necessità</Td></tr>
          <tr><Td>Ordine deposito materiali</Td><Td>Tutti i lavoratori</Td><Td>Continuativa</Td></tr>
        </tbody>
      </table>

      <h2 className="font-bold mb-2 text-[13px]">5.3 Distanze di sicurezza e utilizzo DPI</h2>
      <table className="w-full border border-black text-[12px] mb-6">
        <thead><tr><Th>Situazione</Th><Th>Misura</Th></tr></thead>
        <tbody>
          <tr><Td>Distanza di sicurezza da scavi, buche, aperture</Td><Td>Minimo 1 metro dal bordo, delimitato con nastro o barriere fisiche</Td></tr>
          <tr><Td>Lavori in quota</Td><Td>Obbligatorio uso imbracatura anticaduta con doppio cordino</Td></tr>
          <tr><Td>Uso di utensili elettrici/meccanici</Td><Td>Occhiali protettivi, guanti antitaglio, scarpe antinfortunistiche</Td></tr>
          <tr><Td>Presenza di agenti chimici</Td><Td>Guanti in nitrile, occhiali a mascherina, facciale filtrante FFP2/P3</Td></tr>
          <tr><Td>Rumori superiori a 85 dB(A)</Td><Td>Cuffie antirumore o tappi auricolari</Td></tr>
        </tbody>
      </table>

      <h2 className="font-bold mb-2 text-[13px]">5.4 Sorveglianza sanitaria</h2>
      <table className="w-full border border-black text-[12px] mb-6">
        <thead><tr><Th>Voce</Th><Th>Dettaglio</Th></tr></thead>
        <tbody>
          <tr><Td>Medico Competente</Td><Td>{pos.nostraDitta.medicoLavoro || "—"}</Td></tr>
          <tr><Td>Lavoratori soggetti a sorveglianza</Td><Td>Tutti i lavoratori esposti a rischi specifici (rumore, vibrazioni, agenti chimici, lavoro in quota) come indicato nel DVR aziendale</Td></tr>
          <tr><Td>Periodicità visite</Td><Td>Annuale o secondo prescrizione del medico competente</Td></tr>
          <tr><Td>Idoneità</Td><Td>Tutti i lavoratori presenti in cantiere sono in possesso di giudizio di idoneità alla mansione specifica</Td></tr>
        </tbody>
      </table>

      <h2 className="font-bold mb-2 text-[13px]">5.5 Sospensione delle lavorazioni</h2>
      <p className="text-[12px] leading-relaxed mb-2">Le lavorazioni devono essere sospese nelle seguenti condizioni:</p>
      <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-6">
        <li>Condizioni meteorologiche avverse (vento forte, pioggia intensa, neve, ghiaccio) che compromettono la sicurezza, in particolare per i lavori in quota.</li>
        <li>Presenza di rischi non preventivati o situazioni di pericolo imminente rilevate dal preposto o dai lavoratori.</li>
        <li>Richiesta del Coordinatore per la Sicurezza in fase di Esecuzione (CSE) o degli organi di vigilanza.</li>
        <li>Guasto o malfunzionamento di attrezzature essenziali per la sicurezza.</li>
      </ul>

      <h2 className="font-bold mb-2 text-[13px]">5.6 Ruoli e responsabilità</h2>
      <table className="w-full border border-black text-[12px] mb-4">
        <thead><tr><Th>Ruolo</Th><Th>Nominativo</Th><Th>Responsabilità principali</Th></tr></thead>
        <tbody>
          <tr><Td>Datore di Lavoro</Td><Td>{pos.nostraDitta.datoreLavoro}</Td><Td>Responsabilità generale della sicurezza, emissione del POS, nomina delle figure aziendali</Td></tr>
          <tr><Td>RSPP</Td><Td>{pos.nostraDitta.rspp}</Td><Td>Supporto al datore di lavoro nella valutazione dei rischi e nell'elaborazione del DVR/POS</Td></tr>
          <tr><Td>RLS</Td><Td>{pos.nostraDitta.rls}</Td><Td>Rappresenta i lavoratori in materia di sicurezza, consultato per le valutazioni dei rischi</Td></tr>
          <tr><Td>Preposto</Td><Td>{preposto}</Td><Td>Sorveglia l'esecuzione dei lavori in conformità alle istruzioni ricevute, interviene in caso di pericolo</Td></tr>
          <tr><Td>Medico Competente</Td><Td>{pos.nostraDitta.medicoLavoro}</Td><Td>Sorveglianza sanitaria dei lavoratori, collaborazione alla valutazione dei rischi</Td></tr>
        </tbody>
      </table>
    </Page>
  )
}
