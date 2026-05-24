import Page from "../components/Page"
import type { PosData } from "../types/pos"
import { persone } from "../data/personale"

type Props = {
  pos: PosData
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
    <th className="border border-black p-2 text-center align-middle font-bold uppercase bg-gray-300">
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="border border-black p-2 align-top text-[12px]">{children}</td>
}

const procedure = [
  {
    codice: "E01",
    titolo: "Comunicazione dell'incendio",
    testo: "Chi scopre un incendio deve immediatamente dare l'allarme urlando \"FUOCO\" e/o azionando il segnale di allarme. Deve quindi avvertire l'addetto antincendio e il responsabile di cantiere.",
  },
  {
    codice: "E02",
    titolo: "Comportamento in caso di incendio",
    testo: "Mantenere la calma. Non creare panico. Allontanarsi dall'area interessata seguendo le vie di esodo. Non usare gli ascensori. Aiutare eventuali persone in difficoltà senza mettere a rischio la propria incolumità.",
  },
  {
    codice: "E03",
    titolo: "Evacuazione del cantiere",
    testo: "Al segnale di evacuazione, tutti i lavoratori devono interrompere immediatamente le attività, mettere in sicurezza le attrezzature e raggiungere il punto di raccolta prestabilito. L'elenco dei presenti sarà verificato dal preposto.",
  },
  {
    codice: "E04",
    titolo: "Primo intervento antincendio",
    testo: "L'addetto antincendio, se in sicurezza, può tentare di spegnere l'incendio nelle fasi iniziali utilizzando l'estintore portatile. L'intervento è consentito solo se il fuoco è di piccole dimensioni e non mette a rischio il lavoratore. In caso contrario attendere i soccorsi.",
  },
  {
    codice: "E05",
    titolo: "Infortunio sul lavoro",
    testo: "In caso di infortunio, l'addetto al primo soccorso deve intervenire tempestivamente. Non spostare il ferito se non strettamente necessario. Valutare le condizioni e chiamare il 118 se necessario. Compilare il registro infortuni e avvisare il datore di lavoro.",
  },
  {
    codice: "E06",
    titolo: "Evacuazione a cura della squadra di emergenza",
    testo: "La squadra di emergenza coordina l'evacuazione verificando che tutti i lavoratori abbiano abbandonato l'area. Effettua il censimento al punto di raccolta e comunica al responsabile l'esito dell'evacuazione.",
  },
  {
    codice: "E07",
    titolo: "Chiamata ai soccorsi esterni",
    testo: "Chiamare il numero unico di emergenza 112 indicando: il tipo di emergenza, l'indirizzo preciso del cantiere, il numero di persone coinvolte, le proprie generalità. Rimanere in linea fino all'arrivo dei soccorsi e mantenere libero l'accesso al cantiere.",
  },
]

export default function Capitolo4Emergenze({ pos, pageNumber }: Props) {
  return (
    <Page pos={pos} pageNumber={pageNumber}>
      <Header />

      <h1 className="text-xl font-bold mb-5">4. GESTIONE DELLE EMERGENZE</h1>

      <p className="text-[12px] leading-relaxed mb-6">
        Di seguito sono riportate le procedure operative da seguire in caso di emergenza nel cantiere.
        Tutti i lavoratori sono tenuti a conoscere e rispettare le presenti procedure.
      </p>

      {/* Procedure E01-E07 */}
      {procedure.map((p) => (
        <div key={p.codice} className="mb-5">
          <h2 className="font-bold text-[13px] mb-1">
            {p.codice} – {p.titolo}
          </h2>
          <p className="text-[12px] leading-relaxed pl-4 border-l-2 border-gray-400">
            {p.testo}
          </p>
        </div>
      ))}

      {/* Tabella addetti emergenza */}
      <h2 className="font-bold mt-6 mb-3">Addetti alle emergenze</h2>

      <table className="w-full border border-black text-[12px]">
        <thead>
          <tr>
            <Th>Nominativo</Th>
            <Th>Qualifica/Mansione</Th>
            <Th>Ruolo emergenza</Th>
          </tr>
        </thead>
        <tbody>
          {pos.addettiEmergenza.map((addetto, i) => {
            const persona = persone.find((p) => p.id === addetto.personaId)
            return (
              <tr key={i}>
                <Td>{persona?.nomeCompleto ?? addetto.personaId}</Td>
                <Td>{persona?.qualificaMansione ?? ""}</Td>
                <Td>{addetto.ruoloEmergenza}</Td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Page>
  )
}
