import Page from "../components/Page"
import type { PosData } from "../types/pos"

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

function box(checked: boolean) {
  return checked ? "☒" : "☐"
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <Td>{label}</Td>
      <Td>{value}</Td>
    </tr>
  )
}

function SourceRow({ label, value, note }: { label: string; value: boolean; note: string }) {
  return (
    <tr>
      <td className="pr-4">{label}</td>
      <td className="pr-2">Sì {box(value)}</td>
      <td className="pr-2">No {box(!value)}</td>
      <td>{note}</td>
    </tr>
  )
}

function livelloPxD(p: number, d: number): string {
  const r = p * d
  if (r >= 9) return "RISCHIO ALTO"
  if (r >= 4) return "RISCHIO MEDIO"
  return "RISCHIO BASSO"
}

function RischioBox({ livello }: { livello: string }) {
  return (
    <table className="w-full border border-black text-[13px] mt-2">
      <tbody>
        <tr>
          <td className="border border-black p-3 font-bold text-center">
            RISULTATO VALUTAZIONE: {livello}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default function Capitolo3Rischi({ pos }: Props) {
  const rc = pos.rischioChimico
  const ri = pos.rischioIncendio
  const rr = pos.rischioRumore
  const rv = pos.rischioVibrazioni
  const rm = pos.rischioMacchine
  const rmmc = pos.rischioMMC
  const re = pos.rischioElettrico
  const ra = pos.rischioAltura

  const livelloRumore = {
    INFERIORE_80: "RISCHIO BASSO — Esposizione < 80 dB(A)",
    TRA_80_85: "RISCHIO MEDIO — Esposizione 80–85 dB(A)",
    SUPERIORE_85: "RISCHIO ALTO — Esposizione > 85 dB(A)",
  }[rr.livello]

  const livelloVibrazioni = {
    INFERIORE_2_5: "RISCHIO BASSO — < 2,5 m/s²",
    TRA_2_5_5: "RISCHIO MEDIO — 2,5–5 m/s²",
    SUPERIORE_5: "RISCHIO ALTO — > 5 m/s²",
  }[rv.livello]

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
        Valori con risultante da 9 a 16 sono considerati RISCHIO ALTO.
      </p>
      <p className="text-[12px] leading-relaxed mb-6">
        In tutti i casi sono implementate azioni di prevenzione e protezione.
        Per altre valutazioni i riferimenti sono determinati dalle valutazioni
        specifiche presenti nel DVR aziendale.
      </p>

      <h2 className="font-bold mb-2">3.1 Obblighi</h2>
      <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-5">
        <li>Utilizzare solo ed esclusivamente le attrezzature della ditta.</li>
        <li>Comunicare ogni carenza per quanto riguarda le misure di protezione e cooperare al miglioramento del livello di sicurezza del cantiere.</li>
        <li>Attenersi esclusivamente ai compiti impartiti dal coordinamento.</li>
        <li>Indossare i Dispositivi di protezione individuale in dotazione.</li>
        <li>Depositare materiali e attrezzature nelle aree individuate e/o opportunamente delimitate.</li>
        <li>Verificare integrità delle segnalazioni e protezioni installate.</li>
      </ul>

      <h2 className="font-bold mb-2">3.2 Divieti</h2>
      <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-6">
        <li>Utilizzare attrezzature ed utensili della ditta committente se non previa autorizzazione.</li>
        <li>Operare senza i dispositivi di protezione individuale forniti.</li>
        <li>Manomettere eventuali protezioni installate.</li>
        <li>Consumare cibo in cantiere.</li>
        <li>Utilizzare dispositivi personali durante lavorazioni in quota o in aree di pericolo.</li>
      </ul>

      {/* §3.3 RISCHIO CHIMICO */}
      <h2 className="font-bold mb-3">3.3 Rischio chimico</h2>
      <p className="text-[12px] mb-3">Sì {box(rc.presente)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!rc.presente)}</p>
      {rc.presente && (
        <>
          <table className="w-full text-[12px] mb-5">
            <tbody>
              <SourceRow label="Possibili interferenze" value={rc.possibiliInterferenze} note="per la presenza di altre attività, se indicate nel PSC" />
              <SourceRow label="Sostanze chimiche" value={rc.sostanzeChimiche} note="l'uso di prodotti per l'esecuzione dell'appalto" />
              <SourceRow label="Polveri" value={rc.polveri} note="durante il taglio dei manufatti o la foratura di opere murarie" />
              <SourceRow label="Fumi" value={rc.fumi} note="processi di saldatura ove necessari" />
            </tbody>
          </table>
          <p className="text-[12px] font-semibold mb-1">Misure di prevenzione e protezione:</p>
          <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-4">
            <li>Uso dei DPI previsti (guanti, occhiali, maschere filtranti).</li>
            <li>Conservare i prodotti nei contenitori originali con etichetta leggibile.</li>
            <li>Garantire adeguata ventilazione nelle aree di utilizzo.</li>
            <li>Consultare e rispettare le schede di sicurezza dei prodotti.</li>
          </ul>
          <h3 className="font-bold mb-2">Elenco delle sostanze chimiche</h3>
          <table className="w-full border border-black text-[10px] mb-6">
            <thead>
              <tr className="bg-gray-300">
                <Th>Presenza</Th>
                <Th>Sostanza o miscela</Th>
                <Th>Utilizzo</Th>
                <Th>Scheda sicurezza allegata</Th>
              </tr>
            </thead>
            <tbody>
              {rc.sostanze.map((s) => (
                <tr key={s.id}>
                  <TdCenter>{box(s.presente)}</TdCenter>
                  <Td>{s.nome}</Td>
                  <Td>{s.utilizzo}</Td>
                  <TdCenter>Sì {box(s.schedaSicurezzaAllegata)} &nbsp; No {box(!s.schedaSicurezzaAllegata)}</TdCenter>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full border border-black text-[12px] mb-2">
            <tbody>
              <Row label="Probabilità (P)" value={String(rc.probabilita)} />
              <Row label="Danno (D)" value={String(rc.danno)} />
              <Row label="P x D" value={String(rc.probabilita * rc.danno)} />
            </tbody>
          </table>
          <RischioBox livello={livelloPxD(rc.probabilita, rc.danno)} />
        </>
      )}

      {/* §3.4 RISCHIO INCENDIO */}
      <h2 className="font-bold mt-6 mb-3">3.4 Rischio incendio</h2>
      <p className="text-[12px] mb-3">Sì {box(ri.presente)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!ri.presente)}</p>
      {ri.presente && (
        <>
          <table className="w-full text-[12px] mb-5">
            <tbody>
              <SourceRow label="Materiale combustibile" value={ri.materialeCombustibile} note="presenza di materiali infiammabili o combustibili in cantiere" />
              <SourceRow label="Sostanze infiammabili" value={ri.sostanzeInfiammabili} note="uso di solventi, vernici, gas infiammabili" />
              <SourceRow label="Impianti elettrico/termico" value={ri.impiantiElettricoTermico} note="presenza di impianti elettrici o termici nelle vicinanze" />
            </tbody>
          </table>
          <p className="text-[12px] font-semibold mb-1">Misure di prevenzione e protezione:</p>
          <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-4">
            <li>Tenere in cantiere estintori portatili verificati e accessibili.</li>
            <li>Vietare l'uso di fiamme libere in prossimità di materiali infiammabili.</li>
            <li>Smaltire correttamente i rifiuti combustibili a fine giornata.</li>
            <li>Il personale addetto antincendio è indicato nella sezione emergenze.</li>
          </ul>
          <table className="w-full border border-black text-[12px] mb-2">
            <tbody>
              <Row label="Probabilità (P)" value={String(ri.probabilita)} />
              <Row label="Danno (D)" value={String(ri.danno)} />
              <Row label="P x D" value={String(ri.probabilita * ri.danno)} />
            </tbody>
          </table>
          <RischioBox livello={livelloPxD(ri.probabilita, ri.danno)} />
        </>
      )}

      {/* §3.5 RISCHIO RUMORE */}
      <h2 className="font-bold mt-6 mb-3">3.5 Rischio rumore</h2>
      <p className="text-[12px] mb-3">Sì {box(rr.presente)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!rr.presente)}</p>
      {rr.presente && (
        <>
          <table className="w-full text-[12px] mb-5">
            <tbody>
              <SourceRow label="Attrezzature rumorose" value={rr.attrezzatureRumorose} note="uso di smerigliatrici, trapani, avvitatori" />
              <SourceRow label="Lavorazioni meccaniche" value={rr.lavorazioniMeccaniche} note="taglio, foratura, fresatura di materiali" />
            </tbody>
          </table>
          <p className="text-[12px] font-semibold mb-1">Misure di prevenzione e protezione:</p>
          <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-4">
            <li>Uso obbligatorio di otoprotettori (cuffie o tappi) durante le lavorazioni rumorose.</li>
            <li>Limitare i tempi di esposizione al rumore.</li>
            <li>Privilegiare attrezzature a bassa emissione acustica.</li>
            <li>Sorveglianza sanitaria per i lavoratori esposti sopra 85 dB(A).</li>
          </ul>
          <RischioBox livello={livelloRumore} />
        </>
      )}

      {/* §3.6 RISCHIO VIBRAZIONI */}
      <h2 className="font-bold mt-6 mb-3">3.6 Rischio vibrazioni</h2>
      <p className="text-[12px] mb-3">Sì {box(rv.presente)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!rv.presente)}</p>
      {rv.presente && (
        <>
          <table className="w-full text-[12px] mb-5">
            <tbody>
              <SourceRow label="Uso attrezzature manuali vibranti" value={rv.usoAttrezzatureManuali} note="smerigliatrici, martelli, avvitatori a impulso" />
              <SourceRow label="Guida mezzi da cantiere" value={rv.guidaMezziCantiere} note="autocarri, piattaforme elevabili su terreno irregolare" />
            </tbody>
          </table>
          <p className="text-[12px] font-semibold mb-1">Misure di prevenzione e protezione:</p>
          <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-4">
            <li>Limitare i tempi di utilizzo continuativo delle attrezzature vibranti.</li>
            <li>Utilizzare guanti antivibranti certificati.</li>
            <li>Privilegiare attrezzature con bassa emissione di vibrazioni.</li>
            <li>Sorveglianza sanitaria per i lavoratori esposti sopra i valori d'azione.</li>
          </ul>
          <RischioBox livello={livelloVibrazioni} />
        </>
      )}

      {/* §4.7 RISCHIO MACCHINE E ATTREZZATURE */}
      <h2 className="font-bold mt-6 mb-3">4.7 Rischio macchine e attrezzature</h2>
      <p className="text-[12px] mb-3">Sì {box(rm.presente)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!rm.presente)}</p>
      {rm.presente && (
        <>
          <table className="w-full text-[12px] mb-5">
            <tbody>
              <SourceRow label="Organi in movimento" value={rm.organiInMovimento} note="parti rotanti, lame, mole" />
              <SourceRow label="Proiezione di materiali" value={rm.proiezioneMaterie} note="schegge, trucioli, polveri" />
              <SourceRow label="Superfici taglienti" value={rm.superficiTaglienti} note="bordi affilati di lamiere, vetri, profili" />
            </tbody>
          </table>
          <p className="text-[12px] font-semibold mb-1">Misure di prevenzione e protezione:</p>
          <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-4">
            <li>Utilizzare esclusivamente attrezzature conformi alle norme CE con libro macchina aggiornato.</li>
            <li>Eseguire verifiche periodiche prima dell'uso.</li>
            <li>Indossare DPI adeguati: guanti, occhiali, schermo facciale.</li>
            <li>Non rimuovere le protezioni delle macchine.</li>
          </ul>
          <h3 className="font-bold mb-2">Elenco attrezzature</h3>
          <table className="w-full border border-black text-[11px] mb-6">
            <thead>
              <tr className="bg-gray-300">
                <Th>Tipologia attrezzatura</Th>
                <Th>Fase lavorativa</Th>
                <Th>Libro macchina</Th>
              </tr>
            </thead>
            <tbody>
              {rm.attrezzature.map((a) => (
                <tr key={a.id}>
                  <Td>{a.tipologia}</Td>
                  <Td>{a.fase}</Td>
                  <TdCenter>Sì {box(a.libroMacchina)} &nbsp; No {box(!a.libroMacchina)}</TdCenter>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-full border border-black text-[12px] mb-2">
            <tbody>
              <Row label="Probabilità (P)" value={String(rm.probabilita)} />
              <Row label="Danno (D)" value={String(rm.danno)} />
              <Row label="P x D" value={String(rm.probabilita * rm.danno)} />
            </tbody>
          </table>
          <RischioBox livello={livelloPxD(rm.probabilita, rm.danno)} />
        </>
      )}

      {/* §4.8 RISCHIO MMC */}
      <h2 className="font-bold mt-6 mb-3">4.8 Rischio movimentazione manuale dei carichi (MMC)</h2>
      <p className="text-[12px] mb-3">Sì {box(rmmc.presente)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!rmmc.presente)}</p>
      {rmmc.presente && (
        <>
          <table className="w-full text-[12px] mb-5">
            <tbody>
              <SourceRow label="Movimentazione manuale di carichi" value={rmmc.movimentazioneManuale} note="sollevamento, trasporto, spinta di materiali pesanti" />
              <SourceRow label="Posture incongrue" value={rmmc.postureIncongrue} note="lavoro in posizioni non ergonomiche" />
              <SourceRow label="Movimenti ripetitivi" value={rmmc.movimentiRepetitivi} note="operazioni ripetute per lunghi periodi" />
            </tbody>
          </table>
          <p className="text-[12px] font-semibold mb-1">Misure di prevenzione e protezione:</p>
          <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-4">
            <li>Limitare il peso massimo movimentabile manualmente a 25 kg per persona.</li>
            <li>Utilizzare ausili meccanici (carrelli, transpallet) ove possibile.</li>
            <li>Formare i lavoratori sulle corrette tecniche di sollevamento.</li>
            <li>Alternare le mansioni per ridurre l'esposizione continuativa.</li>
          </ul>
          <table className="w-full border border-black text-[12px] mb-2">
            <tbody>
              <Row label="Probabilità (P)" value={String(rmmc.probabilita)} />
              <Row label="Danno (D)" value={String(rmmc.danno)} />
              <Row label="P x D" value={String(rmmc.probabilita * rmmc.danno)} />
            </tbody>
          </table>
          <RischioBox livello={livelloPxD(rmmc.probabilita, rmmc.danno)} />
        </>
      )}

      {/* §4.9 RISCHIO ELETTRICO */}
      <h2 className="font-bold mt-6 mb-3">4.9 Rischio elettrico</h2>
      <p className="text-[12px] mb-3">Sì {box(re.presente)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!re.presente)}</p>
      {re.presente && (
        <>
          <table className="w-full text-[12px] mb-5">
            <tbody>
              <SourceRow label="Contatto diretto" value={re.contattoDiretto} note="contatto con parti in tensione scoperte" />
              <SourceRow label="Contatto indiretto" value={re.contattoIndiretto} note="contatto con masse metalliche in tensione per guasto" />
              <SourceRow label="Uso attrezzature elettriche" value={re.usoAttrezzatureElettriche} note="utensili elettrici portatili, prolunghe, quadri" />
            </tbody>
          </table>
          <p className="text-[12px] font-semibold mb-1">Misure di prevenzione e protezione:</p>
          <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-4">
            <li>Verificare l'integrità di cavi, spine e utensili prima dell'uso.</li>
            <li>Non utilizzare attrezzature elettriche danneggiate o con protezioni rimosse.</li>
            <li>Garantire la presenza di interruttori differenziali sul quadro cantiere.</li>
            <li>Non effettuare interventi su impianti elettrici senza autorizzazione.</li>
          </ul>
          <table className="w-full border border-black text-[12px] mb-2">
            <tbody>
              <Row label="Probabilità (P)" value={String(re.probabilita)} />
              <Row label="Danno (D)" value={String(re.danno)} />
              <Row label="P x D" value={String(re.probabilita * re.danno)} />
            </tbody>
          </table>
          <RischioBox livello={livelloPxD(re.probabilita, re.danno)} />
        </>
      )}

      {/* §4.10 RISCHIO CADUTE DALL'ALTO */}
      <h2 className="font-bold mt-6 mb-3">4.10 Rischio cadute dall'alto</h2>
      <p className="text-[12px] mb-3">Sì {box(ra.presente)} &nbsp;&nbsp;&nbsp;&nbsp; No {box(!ra.presente)}</p>
      {ra.presente && (
        <>
          <table className="w-full text-[12px] mb-5">
            <tbody>
              <SourceRow label="Lavoro in quota (> 2 m)" value={ra.lavoroInQuota} note="lavorazioni su scale, ponteggi, strutture elevate" />
              <SourceRow label="Uso PLE / Piattaforme elevabili" value={ra.usoPle} note="cestelli, piattaforme semoventi" />
              <SourceRow label="Uso impalcature/ponteggi" value={ra.usoImpalcature} note="ponteggi fissi o mobili" />
            </tbody>
          </table>
          <p className="text-[12px] font-semibold mb-1">Misure di prevenzione e protezione:</p>
          <ul className="list-disc pl-5 text-[12px] leading-relaxed mb-4">
            <li>Uso obbligatorio di imbracatura di sicurezza con doppio cordino anticaduta durante lavori in quota.</li>
            <li>Verificare la stabilità di scale, ponteggi e piattaforme prima dell'uso.</li>
            <li>Solo personale abilitato può operare su PLE (abilitazione specifica richiesta).</li>
            <li>Delimitare l'area sottostante ai lavori in quota per impedire accessi.</li>
            <li>Non sovraccaricare le piattaforme oltre la portata nominale.</li>
          </ul>
          <table className="w-full border border-black text-[12px] mb-2">
            <tbody>
              <Row label="Probabilità (P)" value={String(ra.probabilita)} />
              <Row label="Danno (D)" value={String(ra.danno)} />
              <Row label="P x D" value={String(ra.probabilita * ra.danno)} />
            </tbody>
          </table>
          <RischioBox livello={livelloPxD(ra.probabilita, ra.danno)} />
        </>
      )}
    </Page>
  )
}
