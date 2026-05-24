import Page from "../components/Page"
import type { PosData } from "../types/pos"

type Props = {
  pos: PosData
}

export default function Frontespizio({ pos, pageNumber }: Props) {
  return (
    <Page pos={pos} pageNumber={pageNumber}>
      <div className="pt-10">
        <h1 className="text-center text-4xl font-bold mb-3">
          PIANO OPERATIVO DI SICUREZZA
        </h1>

        <p className="text-center text-lg mb-16">
          D.Lgs. 9 aprile 2008 n°81
        </p>

        <DocRow label="COMMITTENTE" value={pos.committente.nomeDitta} />

        {pos.esisteAppaltatrice && (
          <DocRow label="CLIENTE" value={pos.appaltatrice.nomeDitta} />
        )}

        <DocRow label="CANTIERE" value={pos.committente.indirizzoCantiere} />

        <DocRow
          label="COMMESSA"
          value={pos.commessa ? `N° ${pos.commessa}` : ""}
        />

        <div className="mt-12">
          <div className="font-bold text-xl mb-2">LAVORI</div>

          <div className="text-2xl font-bold whitespace-pre-line">
            {pos.lavori || "..."}
          </div>
        </div>

        <div className="mt-28 text-right">
          <p>
            Rev. {pos.revisione} del {formatDate(pos.dataRevisione)}
          </p>
        </div>
      </div>
    </Page>
  )
}

function DocRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-10">
      <div className="font-bold text-xl">{label}</div>
      <div className="text-2xl font-bold whitespace-pre-line">
        {value || "..."}
      </div>
    </div>
  )
}

function formatDate(date: string) {
  if (!date) return "-"
  const [year, month, day] = date.split("-")
  return `${day}/${month}/${year}`
}
