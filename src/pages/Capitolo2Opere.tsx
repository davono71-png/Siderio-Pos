import Page from "../components/Page"
import type { PosData } from "../types/pos"

type Props = { pos: PosData; pageNumber?: number }

export default function Capitolo2Opere({ pos, pageNumber }: Props) {
  return (
    <Page pos={pos} pageNumber={pageNumber}>
      <Header />

      <h1 className="text-xl font-bold mb-5">2. OPERE</h1>

      <h2 className="font-bold mb-2">2.1 Tempi di esecuzione</h2>

      <table className="w-full border border-black text-[12px] mb-8">
        <thead>
          <tr>
            <Th>ATTIVITA’</Th>
            <Th>TEMPI %</Th>
          </tr>
        </thead>

        <tbody>
          {pos.tempiEsecuzione.map((item) => (
            <tr key={item.attivita}>
              <Td>{item.attivita}</Td>
              <Td>{item.percentuale}</Td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="font-bold mb-2">2.2 Operatività</h2>

      <p className="mb-4">
        Una volta libera da interferenze e delimitata la zona di lavoro, si
        procederà con l’esecuzione degli interventi previsti:
      </p>

      <p className="font-bold mb-3">Descrizione dettagliata fasi lavorative:</p>

      <div className="space-y-5 mb-8">
        {pos.fasiOperative.map((fase, index) => (
          <div key={index}>
            <p className="font-bold">
              {index + 1}. {fase.titolo || `Fase ${index + 1}`}
            </p>

            <p className="whitespace-pre-line">
              {fase.descrizione || ""}
            </p>
          </div>
        ))}
      </div>

      <h2 className="font-bold mb-2">Analisi dei Rischi Specifici</h2>

      <p className="whitespace-pre-line">
        {pos.analisiRischiSpecificiOpere || ""}
      </p>
    </Page>
  )
}

function Header() {
  return (
    <p className="text-xs mb-6">
      Arché Italia srl unipersonale – Via Guido Rossa 30 – 25060 Cellatica (BS)
    </p>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border border-black p-2 text-left align-top font-bold">
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="border border-black p-2 align-top">{children}</td>
}
