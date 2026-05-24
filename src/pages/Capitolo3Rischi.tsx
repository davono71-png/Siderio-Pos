import Page from "../components/Page"
import type { PosData } from "../types/pos"

type Props = {
  pos: PosData
}

export default function Capitolo3Rischi({ pos }: Props) {
  const rischioChimico = pos.rischioChimico ?? {
    presente: false,
    possibiliInterferenze: false,
    sostanzeChimiche: true,
    polveri: true,
    fumi: false,
    sostanze: [],
    probabilita: 1,
    danno: 1,
  }

  const risultato = rischioChimico.probabilita * rischioChimico.danno

  let livello = "RISCHIO BASSO"
  if (risultato >= 4 && risultato <= 8) livello = "RISCHIO MEDIO"
  if (risultato >= 9) livello = "RISCHIO ALTO"

  return (
    <Page>
      <Header />

      <h1 className="text-xl font-bold mb-5">
        3. RISCHI SPECIFICI INTRODOTTI IN CANTIERE
      </h1>

      <p className="text-[12px] leading-relaxed mb-4">
        La valutazione del rischio è eseguita applicando la matrice PxD sulla
        base dei valori che vanno da 1 a 4 sia per la matrice P, sia per la
        matrice D ove i valori sono crescenti in base al rischio presente e
        individuabile.
      </p>

      <p className="text-[12px] leading-relaxed mb-4">
        Valori con risultante da 1 a 3 sono considerati RISCHIO BASSO.
        Valori con risultante da 4 a 8 sono considerati RISCHIO MEDIO.
        Valori con risultante da 9 a 12 sono considerati RISCHIO ALTO.
      </p>

      <p className="text-[12px] leading-relaxed mb-6">
        In tutti i casi sono implementate azioni di prevenzione e protezione.
        Per altre valutazioni i riferimenti sono determinati dalle valutazioni
        specifiche presenti nel DVR aziendale.
      </p>

      <h2 className="font-bold mb-2">3.1 Obblighi</h2>

      <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-5">
        <li>Utilizzare solo ed esclusivamente le attrezzature della ditta.</li>
        <li>
          Comunicare ogni carenza per quanto riguarda le misure di protezione e
          cooperare al miglioramento del livello di sicurezza del cantiere.
        </li>
        <li>Attenersi esclusivamente ai compiti impartiti dal coordinamento.</li>
        <li>Indossare i Dispositivi di protezione individuale in dotazione.</li>
        <li>
          Depositare materiali e attrezzature nelle aree individuate e/o
          opportunamente delimitate.
        </li>
        <li>Verificare integrità delle segnalazioni e protezioni installate.</li>
      </ul>

      <h2 className="font-bold mb-2">3.2 Divieti</h2>

      <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-6">
        <li>
          Utilizzare attrezzature ed utensili della ditta committente se non
          previa autorizzazione.
        </li>
        <li>Operare senza i dispositivi di protezione individuale forniti.</li>
        <li>Manomettere eventuali protezioni installate.</li>
        <li>Consumare cibo in cantiere.</li>
        <li>
          Utilizzare dispositivi personali durante lavorazioni in quota o in
          aree di pericolo.
        </li>
      </ul>

      <h2 className="font-bold mb-3">3.3 Rischio chimico</h2>

      <p className="text-[12px] mb-3">
        Sì {box(rischioChimico.presente)} &nbsp;&nbsp;&nbsp;&nbsp; No{" "}
        {box(!rischioChimico.presente)}
      </p>

      {rischioChimico.presente && (
        <>
          <table className="w-full text-[12px] mb-5">
            <tbody>
              <SourceRow
                label="Possibili interferenze"
                value={rischioChimico.possibiliInterferenze}
                note="per la presenza di altre attività, se indicate nel PSC"
              />

              <SourceRow
                label="Sostanze chimiche"
                value={rischioChimico.sostanzeChimiche}
                note="l’uso di prodotti per l’esecuzione dell’appalto"
              />

              <SourceRow
                label="Polveri"
                value={rischioChimico.polveri}
                note="durante il taglio dei manufatti o la foratura di opere murarie"
              />

              <SourceRow
                label="Fumi"
                value={rischioChimico.fumi}
                note="processi di saldatura ove necessari"
              />
            </tbody>
          </table>

          <h3 className="font-bold mb-2">Elenco delle sostanze chimiche</h3>

          <table className="w-full border border-black text-[10px] mb-6">
            <thead>
              <tr className="bg-gray-300">
                <Th>Presenza</Th>
                <Th>Sostanza o miscela</Th>
                <Th>Utilizzo</Th>
                <Th>Scheda sicurezza prodotto allegata</Th>
              </tr>
            </thead>

            <tbody>
              {rischioChimico.sostanze.map((sostanza) => (
                <tr key={sostanza.id}>
                  <TdCenter>{box(sostanza.presente)}</TdCenter>
                  <Td>{sostanza.nome}</Td>
                  <Td>{sostanza.utilizzo}</Td>
                  <TdCenter>
                    Sì {box(sostanza.presente)}
                    &nbsp;&nbsp;&nbsp; No {box(!sostanza.presente)}
                  </TdCenter>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="font-bold mb-2">
            Livello di esposizione per i lavoratori
          </h3>

          <table className="w-full border border-black text-[12px] mb-4">
            <tbody>
              <Row label="Probabilità (P)" value={String(rischioChimico.probabilita)} />
              <Row label="Danno (D)" value={String(rischioChimico.danno)} />
              <Row label="P x D" value={String(risultato)} />
            </tbody>
          </table>

          <table className="w-full border border-black text-[13px]">
            <tbody>
              <tr>
                <td className="border border-black p-3 font-bold text-center">
                  RISULTATO VALUTAZIONE: {livello}
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
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

function SourceRow({
  label,
  value,
  note,
}: {
  label: string
  value: boolean
  note: string
}) {
  return (
    <tr>
      <td className="pr-4">{label}</td>
      <td className="pr-2">Sì {box(value)}</td>
      <td className="pr-2">No {box(!value)}</td>
      <td>{note}</td>
    </tr>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <Td>{label}</Td>
      <Td>{value}</Td>
    </tr>
  )
}

function Th({ children }: { children: React.ReactNode }) {
  return (
    <th className="border border-black p-2 text-center align-middle font-bold uppercase">
      {children}
    </th>
  )
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="border border-black p-2 align-top">{children}</td>
}

function TdCenter({ children }: { children: React.ReactNode }) {
  return (
    <td className="border border-black p-2 text-center align-middle">
      {children}
    </td>
  )
}

function box(checked: boolean) {
  return checked ? "☒" : "☐"
}