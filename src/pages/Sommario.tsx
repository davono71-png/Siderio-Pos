import Page from "../components/Page"
import type { PosData } from "../types/pos"

type Props = { pos: PosData; pageNumber?: number }

type SomItem = {
  num: string
  title: string
  page: number
  level: 0 | 1
}

const ITEMS: SomItem[] = [
  { num: "0.",   title: "IL CANTIERE",                                page: 3,  level: 0 },
  { num: "0.1",  title: "Dati emissione documento",                   page: 3,  level: 1 },
  { num: "0.2",  title: "Descrizione generale delle opere",           page: 3,  level: 1 },
  { num: "0.3",  title: "Note al Piano Operativo di sicurezza",       page: 3,  level: 1 },
  { num: "0.4",  title: "Committente",                                page: 3,  level: 1 },
  { num: "0.5",  title: "Appaltatrice",                               page: 4,  level: 1 },
  { num: "0.6",  title: "Subappaltatrice / Appaltatrice",             page: 4,  level: 1 },
  { num: "0.7",  title: "Numeri utili",                               page: 4,  level: 1 },
  { num: "0.8",  title: "Firme",                                      page: 5,  level: 1 },
  { num: "0.9",  title: "Durata del cantiere",                        page: 5,  level: 1 },
  { num: "1",    title: "PERSONALE IN CANTIERE",                      page: 6,  level: 0 },
  { num: "1.1",  title: "Addetti in cantiere",                        page: 6,  level: 1 },
  { num: "1.2",  title: "Addetti all'emergenza in cantiere",          page: 6,  level: 1 },
  { num: "1.3",  title: "Formazione del personale presente",          page: 7,  level: 1 },
  { num: "1.4",  title: "DPI in dotazione per il cantiere",           page: 7,  level: 1 },
  { num: "2.",   title: "OPERE",                                      page: 8,  level: 0 },
  { num: "2.1",  title: "Tempi di esecuzione",                        page: 8,  level: 1 },
  { num: "2.2",  title: "Operatività – fasi lavorative",              page: 8,  level: 1 },
  { num: "2.3",  title: "Analisi dei rischi specifici",               page: 9,  level: 1 },
  { num: "3",    title: "RISCHI SPECIFICI INTRODOTTI IN CANTIERE",    page: 10, level: 0 },
  { num: "3.1",  title: "Obblighi",                                   page: 10, level: 1 },
  { num: "3.2",  title: "Divieti",                                    page: 10, level: 1 },
  { num: "3.3",  title: "Rischio chimico",                            page: 11, level: 1 },
  { num: "3.4",  title: "Rischio incendio",                           page: 11, level: 1 },
  { num: "3.5",  title: "Rischio rumore",                             page: 11, level: 1 },
  { num: "3.6",  title: "Rischio vibrazioni mano-braccio",            page: 12, level: 1 },
  { num: "4.7",  title: "Rischio macchine ed attrezzature",           page: 12, level: 1 },
  { num: "4.8",  title: "Rischio movimentazione manuale dei carichi", page: 12, level: 1 },
  { num: "4.9",  title: "Rischio elettrico",                          page: 13, level: 1 },
  { num: "4.10", title: "Rischio cadute dall'alto",                   page: 13, level: 1 },
  { num: "5.",   title: "PROCEDURE IN CASO DI EMERGENZA",             page: 14, level: 0 },
  { num: "E01",  title: "Comunicazione dell'incendio",                page: 14, level: 1 },
  { num: "E02",  title: "Comportamento in caso di incendio",          page: 14, level: 1 },
  { num: "E03",  title: "Evacuazione del cantiere",                   page: 14, level: 1 },
  { num: "E04",  title: "Primo intervento antincendio",               page: 14, level: 1 },
  { num: "E05",  title: "Infortunio sul lavoro",                      page: 15, level: 1 },
  { num: "E06",  title: "Evacuazione a cura della squadra",           page: 15, level: 1 },
  { num: "E07",  title: "Chiamata ai soccorsi esterni",               page: 15, level: 1 },
  { num: "Tab.", title: "Addetti alle emergenze",                     page: 15, level: 1 },
  { num: "4",    title: "PROCEDURE RICHIESTE DA PSC",                 page: 16, level: 0 },
  { num: "5.1",  title: "Accesso fornitori e mezzi al cantiere",      page: 16, level: 1 },
  { num: "5.2",  title: "Pulizia, ordine e gestione rifiuti",         page: 16, level: 1 },
  { num: "5.3",  title: "Distanze di sicurezza e utilizzo DPI",       page: 16, level: 1 },
  { num: "5.4",  title: "Sorveglianza sanitaria",                     page: 17, level: 1 },
  { num: "5.5",  title: "Sospensione delle lavorazioni",              page: 17, level: 1 },
  { num: "5.6",  title: "Ruoli e responsabilità",                     page: 17, level: 1 },
]

const cellBase: React.CSSProperties = {
  paddingTop: "2px",
  paddingBottom: "2px",
  verticalAlign: "bottom",
}

export default function Sommario({ pos, pageNumber }: Props) {
  return (
    <Page pos={pos} pageNumber={pageNumber}>
      <h1 style={{ fontSize: "14pt", fontWeight: "bold", textAlign: "center", marginBottom: "8mm" }}>
        SOMMARIO
      </h1>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "10pt", tableLayout: "fixed" }}>
        {/* colonne: num | titolo | puntini | pagina */}
        <colgroup>
          <col style={{ width: "14mm" }} />
          <col />                          {/* titolo: prende tutto lo spazio */}
          <col style={{ width: "50%" }} /> {/* puntini */}
          <col style={{ width: "10mm" }} />
        </colgroup>
        <tbody>
          {ITEMS.map((item) => {
            const isChapter = item.level === 0
            const numStyle: React.CSSProperties = {
              ...cellBase,
              paddingLeft: item.level === 1 ? "6mm" : "0",
              paddingRight: "2mm",
              fontWeight: isChapter ? "bold" : "normal",
              color: isChapter ? "#000" : "#333",
              whiteSpace: "nowrap",
              paddingTop: isChapter ? "5px" : "2px",
              paddingBottom: isChapter ? "5px" : "2px",
            }
            const titleStyle: React.CSSProperties = {
              ...cellBase,
              fontWeight: isChapter ? "bold" : "normal",
              color: isChapter ? "#000" : "#333",
              whiteSpace: "nowrap",   // ← no a-capo inutile
              overflow: "hidden",
              textOverflow: "ellipsis",
              paddingTop: isChapter ? "5px" : "2px",
              paddingBottom: isChapter ? "5px" : "2px",
            }
            const dotsStyle: React.CSSProperties = {
              ...cellBase,
              paddingLeft: "3mm",
              paddingRight: "3mm",
              paddingTop: isChapter ? "5px" : "2px",
              paddingBottom: isChapter ? "5px" : "2px",
            }
            const pageStyle: React.CSSProperties = {
              ...cellBase,
              fontWeight: isChapter ? "bold" : "normal",
              color: isChapter ? "#000" : "#333",
              textAlign: "right",
              whiteSpace: "nowrap",
              paddingTop: isChapter ? "5px" : "2px",
              paddingBottom: isChapter ? "5px" : "2px",
            }
            return (
              <tr key={`${item.num}-${item.title}`}>
                <td style={numStyle}>{item.num}</td>
                <td style={titleStyle}>{item.title}</td>
                <td style={dotsStyle}>
                  <div style={{ borderBottom: "1px dotted #999", marginBottom: "3px" }} />
                </td>
                <td style={pageStyle}>{item.page}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Page>
  )
}
