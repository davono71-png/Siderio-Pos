import Page from "../components/Page"
import type { PosData } from "../types/pos"
import type { FormazioneFlags } from "../data/personale"
import { persone } from "../data/personale"

type Props = { pos: PosData; pageNumber?: number }

const formazioneCampi: { key: keyof FormazioneFlags; label: string }[] = [
  { key: "rsppDatoreLavoro",              label: "RSPP DATORE DI LAVORO" },
  { key: "altoRischioGenerale",           label: "ALTO RISCHIO GENERALE" },
  { key: "specificaLavoratoriAltoRischio",label: "SPECIFICA LAVORATORI ALTO RISCHIO" },
  { key: "dpiTerzaCategoria",             label: "DPI III CAT." },
  { key: "abilitazionePle",               label: "ABILITAZIONE PLE" },
  { key: "primoSoccorso",                 label: "ADDETTO PRIMO SOCCORSO" },
  { key: "antincendioRischioMedio",       label: "ADDETTO ANTINCENDIO RISCHIO MEDIO" },
  { key: "preposto",                      label: "PREPOSTO" },
]

export default function Capitolo1Personale({ pos, pageNumber }: Props) {
  return (
    <Page pos={pos} pageNumber={pageNumber}>
      <h1 className="text-xl font-bold mb-5">1. PERSONALE IN CANTIERE</h1>

      <h2 className="font-bold mb-2">1.1 Addetti in cantiere</h2>
      <table className="w-full border border-black text-[12px] mb-8">
        <thead>
          <tr>
            <Th>Nome e cognome</Th>
            <Th>Funzione</Th>
            <Th>Ruolo</Th>
            <Th>Qualifica / mansione</Th>
          </tr>
        </thead>
        <tbody>
          {pos.personaleCantiere.map((row, i) => {
            const p = persone.find((p) => p.id === row.personaId)
            return (
              <tr key={i}>
                <Td>{p?.nome || ""}</Td>
                <Td>{p?.funzione || ""}</Td>
                <Td>{row.ruolo}</Td>
                <Td>{p?.qualificaMansione || ""}</Td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <h2 className="font-bold mb-2">1.2 Addetti all'emergenza in cantiere</h2>
      <table className="w-full border border-black text-[12px] mb-8">
        <thead>
          <tr>
            <Th>Nome e cognome</Th>
            <Th>Funzione</Th>
            <Th>Ruolo emergenza</Th>
          </tr>
        </thead>
        <tbody>
          {pos.addettiEmergenza.map((row, i) => {
            const p = persone.find((p) => p.id === row.personaId)
            return (
              <tr key={i}>
                <Td>{p?.nome || ""}</Td>
                <Td>{p?.funzione || ""}</Td>
                <Td>{row.ruoloEmergenza}</Td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <h2 className="font-bold mb-2">1.3 Formazione del personale presente</h2>
      <table className="w-full border border-black text-[10px] mb-8">
        <thead>
          <tr>
            <Th>NOME E COGNOME</Th>
            {formazioneCampi.map((c) => <Th key={c.key}>{c.label}</Th>)}
          </tr>
        </thead>
        <tbody>
          {pos.personaleCantiere.map((row, i) => {
            const p = persone.find((p) => p.id === row.personaId)
            const f = pos.formazionePersonale[row.personaId]
            if (!p || !f) return null
            return (
              <tr key={`${row.personaId}-${i}`}>
                <Td>{p.nome}</Td>
                {formazioneCampi.map((c) => (
                  <TdCenter key={c.key}>{f[c.key] ? "X" : ""}</TdCenter>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      <h2 className="font-bold mb-2">1.4 DPI in dotazione per il cantiere</h2>
      <table className="w-full border border-black text-[12px]">
        <thead>
          <tr>
            <Th>Presenza in cantiere</Th>
            <Th>Sì</Th>
            <Th>No</Th>
          </tr>
        </thead>
        <tbody>
          {pos.dpiCantiere.map((dpi) => (
            <tr key={dpi.id}>
              <Td>{dpi.nome}</Td>
              <TdCenter>{dpi.presente ? "X" : ""}</TdCenter>
              <TdCenter>{!dpi.presente ? "X" : ""}</TdCenter>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="border border-black p-1 text-left align-top font-bold">{children}</th>
}
function Td({ children }: { children: React.ReactNode }) {
  return <td className="border border-black p-1 align-top">{children}</td>
}
function TdCenter({ children }: { children: React.ReactNode }) {
  return <td className="border border-black p-1 text-center align-middle">{children}</td>
}
