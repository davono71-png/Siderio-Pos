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

export default function Capitolo0Cantiere({ pos, pageNumber }: Props) {
  const titoloNostraDitta = pos.esisteAppaltatrice ? "0.6 Subappaltatrice" : "0.6 Appaltatrice"
  const preposto = getPreposto(pos)

  return (
    <Page pos={pos} pageNumber={pageNumber}>
      <h1 className="text-xl font-bold mb-5">0. IL CANTIERE</h1>

      <h2 className="font-bold mb-2">0.1 Dati emissione documento</h2>
      <table className="w-full border border-black mb-6 text-sm">
        <thead>
          <tr>
            <th className="border border-black p-2 text-left">Data</th>
            <th className="border border-black p-2 text-left">Revisione nr</th>
            <th className="border border-black p-2 text-left">Note di revisione</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black p-2">{formatDate(pos.dataRevisione)}</td>
            <td className="border border-black p-2">{pos.revisione}</td>
            <td className="border border-black p-2">{pos.descrizioneRevisione}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="font-bold mb-2">0.2 Descrizione generale delle opere</h2>
      <p className="mb-2 text-sm">
        {checked(pos.lavorazioniInterno)} INSTALLAZIONE – MONTAGGIO PER INTERNI –{" "}
        <strong>{pos.lavorazioniInterno ? pos.lavori || "..." : ""}</strong>
      </p>
      <p className="mb-6 text-sm">
        {checked(pos.lavorazioniEsterno)} INSTALLAZIONE – MONTAGGIO PER ESTERNI –{" "}
        <strong>{pos.lavorazioniEsterno ? pos.lavori || "..." : ""}</strong>
      </p>

      <h2 className="font-bold mb-2">0.3 Note al Piano Operativo di sicurezza</h2>
      <p className="mb-6 text-sm">
        Il presente documento è stato redatto sulla base delle indicazioni dell'appaltatore pertanto
        potrebbe subire modifiche e variazioni finalizzate al miglioramento dello stesso e della
        sicurezza delle persone che saranno presenti nei luoghi di lavoro indicati nelle sezioni successive.
      </p>

      <h2 className="font-bold mb-2">0.4 Committente</h2>
      <CompanyTable rows={[
        ["Nome ditta", pos.committente.nomeDitta],
        ["Responsabile dei Lavori", pos.committente.responsabileLavori],
        ["Indirizzo di cantiere", pos.committente.indirizzoCantiere],
        ["Referente", pos.committente.referente],
        ["Direttore Lavori", pos.committente.direttoreLavori],
        ["Coordinatore della sicurezza", pos.committente.coordinatoreSicurezza],
        ["PSC", pos.committente.psc ? "Sì ☒   No ☐" : "Sì ☐   No ☒"],
      ]} />

      {pos.esisteAppaltatrice && (
        <>
          <h2 className="font-bold mb-2 mt-6">0.5 Appaltatrice</h2>
          <CompanyTable rows={[
            ["Nome ditta", pos.appaltatrice.nomeDitta],
            ["Indirizzo Sede Legale", pos.appaltatrice.sedeLegale],
            ["Indirizzo Sede Operativa", pos.appaltatrice.sedeOperativa],
            ["Datore di lavoro", pos.appaltatrice.datoreLavoro],
            ["Referente aziendale d'appalto", pos.appaltatrice.referenteAppalto],
            ["RSPP", pos.appaltatrice.rspp],
            ["Medico del lavoro", pos.appaltatrice.medicoLavoro],
            ["RLS", pos.appaltatrice.rls],
          ]} />
        </>
      )}

      <h2 className="font-bold mb-2 mt-6">{titoloNostraDitta}</h2>
      <CompanyTable rows={[
        ["Nome ditta", pos.nostraDitta.nomeDitta],
        ["Indirizzo Sede Legale", pos.nostraDitta.sedeLegale],
        ["Indirizzo Sede Operativa", pos.nostraDitta.sedeOperativa],
        ["Datore di lavoro", pos.nostraDitta.datoreLavoro],
        ["Referente aziendale d'appalto o preposto", preposto],
        ["RSPP", pos.nostraDitta.rspp],
        ["Medico del lavoro", pos.nostraDitta.medicoLavoro],
        ["RLS", pos.nostraDitta.rls],
      ]} />

      <h2 className="font-bold mb-2 mt-6">0.7 Numeri utili</h2>
      <table className="w-full border border-black text-sm mb-6">
        <thead>
          <tr>
            <th className="border border-black p-2 text-left">Nominativo</th>
            <th className="border border-black p-2 text-left">Telefono</th>
            <th className="border border-black p-2 text-left">Cellulare</th>
          </tr>
        </thead>
        <tbody>
          {pos.numeriUtili.map((item, i) => (
            <tr key={i}>
              <td className="border border-black p-2">{item.nominativo}</td>
              <td className="border border-black p-2">{item.telefono}</td>
              <td className="border border-black p-2">{item.cellulare}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="font-bold mb-2">0.8 Firme</h2>
      <table className="w-full border border-black text-sm mb-6">
        <tbody>
          <tr>
            <td className="border border-black p-2 font-semibold w-1/3">Ditta</td>
            <td className="border border-black p-2">{pos.firme.ditta}</td>
          </tr>
          <tr>
            <td className="border border-black p-2 font-semibold">Firmatario</td>
            <td className="border border-black p-2">{pos.firme.firmatario}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="font-bold mb-2">0.9 Durata del cantiere</h2>
      <table className="w-full border border-black text-sm">
        <tbody>
          <TR label="Periodo" value={`${formatDate(pos.durataCantiere.periodoDa)} – ${formatDate(pos.durataCantiere.periodoA)}`} />
          <TR label="Mattino" value={`${pos.durataCantiere.mattinoDa} – ${pos.durataCantiere.mattinoA}`} />
          <TR label="Pomeriggio" value={`${pos.durataCantiere.pomeriggioDa} – ${pos.durataCantiere.pomeriggioA}`} />
          <TR label="Orario continuato" value={pos.durataCantiere.orarioContinuato ? "Sì" : "No"} />
          <TR label="Note" value={pos.durataCantiere.note} />
        </tbody>
      </table>
    </Page>
  )
}

function CompanyTable({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full border border-black text-sm mb-4">
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}>
            <td className="border border-black p-2 font-semibold w-1/3">{label}</td>
            <td className="border border-black p-2">{value || " "}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function TR({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td className="border border-black p-2 font-semibold w-1/3">{label}</td>
      <td className="border border-black p-2">{value}</td>
    </tr>
  )
}

function checked(v: boolean) { return v ? "☒" : "☐" }

function formatDate(date: string) {
  if (!date) return "—"
  const [y, m, d] = date.split("-")
  return `${d}/${m}/${y}`
}
