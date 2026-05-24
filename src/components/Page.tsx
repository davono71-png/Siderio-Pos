import type { PosData } from "../types/pos"

type Props = {
  children: React.ReactNode
  pos?: PosData
  pageNumber?: number
}

function formatDate(date: string) {
  if (!date) return "—"
  const [y, m, d] = date.split("-")
  return `${d}/${m}/${y}`
}

export default function Page({ children, pos, pageNumber }: Props) {
  const commessa = pos?.commessa ? `Commessa N. ${pos.commessa}` : ""
  const rev = pos ? `Rev. ${pos.revisione} del ${formatDate(pos.dataRevisione)}` : ""

  return (
    <section className="page-a4">
      {/* ── HEADER ── */}
      <div className="page-header">
        <span className="page-header-left">Piano Operativo di Sicurezza</span>
        {commessa && (
          <span className="page-header-right">{commessa}</span>
        )}
      </div>

      {/* ── CONTENT ── */}
      <div className="page-content">
        {children}
      </div>

      {/* ── FOOTER ── */}
      <div className="page-footer">
        <span className="page-footer-left">Arché Italia Srl Unipersonale</span>
        <span className="page-footer-center">{rev}</span>
        <span className="page-footer-right">
          {pageNumber != null ? `Pag. ${pageNumber}` : ""}
        </span>
      </div>
    </section>
  )
}
