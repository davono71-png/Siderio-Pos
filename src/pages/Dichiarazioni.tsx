import React, { useState } from 'react'
import type { PosData } from '../types/pos'
import { persone } from '../data/personale'

// Helper: trova nome persona da id
function getNome(id: string): string {
  const p = persone.find(x => x.id === id)
  return p ? p.nome : id.toUpperCase()
}

// Helper: formatta data ISO in italiano
function formatData(iso: string): string {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

// ─── DATI FISSI ARCHE' ITALIA ─────────────────────────────────────────────────
const ARCHE = {
  ragioneSociale: "ARCHE'ITALIA SRL UNIPERSONALE",
  sede: "Via Guido Rossa 30, 25060 Cellatica (BS)",
  via: "GUIDO ROSSA 30",
  citta: "CELLATICA (BS)",
  cap: "25060",
  piva: "03091380984",
  tel: "0302772818",
  fax: "0302770790",
  email: "info@archeitalia.com",
  legaleRappresentante: "DELBARBA GIANFRANCO",
  datoreLavoro: "ONOFRI DAVIDE",
  datoreLavoroNato: "BRESCIA",
  datoreLavoroDataNascita: "23/08/71",
  datoreLavoroResidenza: "CELLATICA (BS), via DONATORI DI SANGUE",
  rspp: "ONOFRI DAVIDE",
  medicoCompetente: "DOTTORESSA MARCHETTI SERENA",
  rls: "TOMMASO ONOFRI",
  preposto: "ONOFRI DAVIDE",
  prepostoSostituto: "ANDREATTA FABIO",
  primoSoccorso: "Fabio Andreatta",
  prevInc: "Fabio Andreatta",
  inps: "1517534914",
  inail: "21712288 92",
  organico: "10",
  organicoCantiere: "2",
  ccnl: "Piccola Media Industria",
}

const DOCS = [
  { id: 1, nome: "Dichiarazione applicazione contrattuale e organico medio annuo" },
  { id: 2, nome: "Dichiarazione d'ingresso" },
  { id: 3, nome: "Dichiarazione adempienza D.Lgs. 81/2008" },
  { id: 4, nome: "Accettazione PSC e Fascicolo dell'Opera" },
  { id: 5, nome: "Dichiarazione sostitutiva atto di notorietà" },
  { id: 6, nome: "Dichiarazione conformità macchine e attrezzature" },
  { id: 7, nome: "Dichiarazione non essere oggetto di provvedimenti di sospensione" },
  { id: 8, nome: "Autocertificazione valutazione dei rischi" },
  { id: 9, nome: "Nominativi figure addetti alla sicurezza" },
  { id: 10, nome: "Dichiarazione cumulativa + Art. 97" },
  { id: 11, nome: "Manifestazione consenso trattamento dati personali" },
  { id: 12, nome: "Comunicazione nominativi soggetti impresa affidataria (Art. 97)" },
]

function oggi(): string {
  const d = new Date()
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`
}

function slug(nome: string): string {
  return nome.replace(/[^a-zA-Z0-9]/g, '_').replace(/__+/g,'_').slice(0,40)
}

// ─── STILI DOCUMENTO ────────────────────────────────────────────────────────
const pageStyle: React.CSSProperties = {
  background: 'white', width: '210mm', minHeight: '297mm',
  padding: '18mm 20mm', fontFamily: 'Times New Roman, serif',
  fontSize: '10pt', lineHeight: 1.6, color: '#1E1B2E',
  boxSizing: 'border-box', position: 'relative',
}
const headerStyle: React.CSSProperties = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
  borderBottom: '1px solid #9CA3AF', paddingBottom: 10, marginBottom: 20,
}
const titleStyle: React.CSSProperties = {
  fontWeight: 700, textAlign: 'center', textTransform: 'uppercase',
  fontSize: '11pt', marginBottom: 4, letterSpacing: 0.3,
}
const destStyle: React.CSSProperties = { marginBottom: 16, fontSize: '10pt' }
const bodyStyle: React.CSSProperties = { marginBottom: 10, textAlign: 'justify' as const, fontSize: '10pt' }
const firmaStyle: React.CSSProperties = {
  marginTop: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
}

function DocHeader() {
  return (
    <div style={headerStyle}>
      <div style={{ fontSize: '9pt' }}>
        <div style={{ fontWeight: 700, fontSize: '10pt' }}>{ARCHE.ragioneSociale}</div>
        <div>{ARCHE.sede}</div>
        <div>P.Iva {ARCHE.piva}</div>
        <div>Tel. {ARCHE.tel} — {ARCHE.email}</div>
      </div>
      <div style={{ textAlign: 'right', fontSize: '8pt' }}>
        <div style={{ fontWeight: 700, color: '#7C3AED', letterSpacing: 1 }}>S SIDERIO</div>
        <div style={{ color: '#9CA3AF' }}>Piano Operativo di Sicurezza</div>
      </div>
    </div>
  )
}

function Firma({ luogo = 'Cellatica', label = 'Il legale rappresentante' }: { luogo?: string, label?: string }) {
  return (
    <div style={firmaStyle}>
      <div>{luogo}, {oggi()}</div>
      <div style={{ textAlign: 'right' }}>
        {label}<br />
        <div style={{ borderTop: '1px solid #9CA3AF', marginTop: 28, paddingTop: 4, fontSize: '8pt', color: '#6B7280' }}>
          Timbro e firma &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    </div>
  )
}

// ─── TEMPLATE 1 ────────────────────────────────────────────────────────────
function Doc1({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Dichiarazione applicazione contrattuale e contributiva</div>
      <div style={{ ...titleStyle, fontSize: '10pt', marginBottom: 20 }}>Dichiarazione organico medio annuo</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C.</div>
        <div>Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}><strong>Oggetto:</strong> dichiarazione applicazione contrattuale e contributiva, anche ai sensi dell'art. 90 comma 9 del D.Lgs. 81/2008 e disposizioni integrative e correttive del D.Lgs 106/09</p>
      <p style={bodyStyle}><strong>NOTA:</strong> la presente dichiarazione è da intendersi integrativa rispetto ai prescritti del DL 10.9.2003 n. 276 art.86 (ex art. 3, comma 8, del decreto legislativo 14.8.1996, n.494).</p>
      <p style={bodyStyle}>La scrivente società <strong>{ARCHE.ragioneSociale}</strong>, con sede in <strong>{ARCHE.citta}</strong>, Via <strong>{ARCHE.via}</strong>, Tel: <strong>{ARCHE.tel}</strong></p>
      <p style={bodyStyle}>nella persona del suo legale rappresentante sig. <strong>{ARCHE.legaleRappresentante}</strong></p>
      <p style={bodyStyle}>in merito a quanto richiesto, anche in riferimento all'art. 90 comma 9 del D.Lgs. 81/2008 (ex art. 3 comma 8 del D. Lgs. n. 494/96), per il cantiere di <strong>{pos.committente.indirizzoCantiere}</strong></p>
      <p style={bodyStyle}><strong>DICHIARA</strong></p>
      <p style={bodyStyle}>che il Contratto Collettivo Nazionale di lavoro applicato è quello del settore {ARCHE.ccnl}</p>
      <p style={bodyStyle}><strong>DICHIARA INOLTRE</strong></p>
      <p style={bodyStyle}>Che l'organico medio annuo è <strong>{ARCHE.organico}</strong> — L'organico previsto per il cantiere <strong>{ARCHE.organicoCantiere}</strong><br />(riferito all'anno precedente al rilascio della dichiarazione)</p>
      <p style={bodyStyle}><strong>DICHIARA INOLTRE</strong></p>
      <p style={bodyStyle}>Di ottemperare agli obblighi contributivi e previdenziali previsti dalle leggi e contratti in vigore alla data della presente e in particolare nei confronti di:</p>
      <p style={bodyStyle}>INPS sede provinciale di Brescia posizione n° {ARCHE.inps}<br />INAIL sede provinciale di BRESCIA posizione n° {ARCHE.inail}</p>
      <p style={bodyStyle}>Ove non già rilasciato allega inoltre certificato in originale di iscrizione alla C.C.I.A.A.</p>
      <Firma />
    </div>
  )
}

// ─── TEMPLATE 2 ────────────────────────────────────────────────────────────
function Doc2({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Dichiarazione d'ingresso</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C.</div>
        <div>Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}><strong>Cantiere di:</strong> {pos.committente.indirizzoCantiere}</p>
      <p style={bodyStyle}>Il sottoscritto <strong>{ARCHE.datoreLavoro}</strong>, nato a <strong>{ARCHE.datoreLavoroNato}</strong> il <strong>{ARCHE.datoreLavoroDataNascita}</strong><br />
      residente a {ARCHE.datoreLavoroResidenza}<br />
      in qualità di legale rappresentante della Ditta: <strong>{ARCHE.ragioneSociale}</strong><br />
      ed in riferimento ai lavori da eseguire presso <strong>{pos.committente.nomeDitta}</strong><br />
      {pos.committente.indirizzoCantiere}<br />
      della durata dal <strong>{formatData(pos.durataCantiere.periodoDa)}</strong> al <strong>{formatData(pos.durataCantiere.periodoA)}</strong></p>
      <p style={bodyStyle}><strong>DICHIARA</strong></p>
      {(() => {
        const datore = pos.personaleCantiere.find(p => p.ruolo === 'DATORE DI LAVORO')
        const preposto = datore ? getNome(datore.personaId) : ARCHE.preposto
        const altri = pos.personaleCantiere.filter(p => p.ruolo !== 'DATORE DI LAVORO')
        const sostituto = altri.length > 0 ? getNome(altri[0].personaId) : ARCHE.prepostoSostituto
        return (
          <p style={bodyStyle}>che il preposto di cantiere è il sig. <strong>{preposto}</strong> (che agisce anche in qualità di DATORE di LAVORO), in assenza, il sig. <strong>{sostituto}</strong> gestisce le disposizioni in materia di salute e sicurezza del cantiere</p>
        )
      })()}
      <p style={bodyStyle}>e hanno ricevuto dal Coordinatore per la Sicurezza le informazioni sulla natura dei luoghi in cui saranno eseguiti i lavori in appalto, sulle condizioni ambientali, sui rischi specifici derivanti dallo stato dell'area e/o zona di realizzazione del lavoro e che gli stessi e tutti i lavoratori sotto indicati hanno ricevuto un'adeguata formazione ed informazione sui rischi specifici propri della loro attività, nonché delle misure di prevenzione e protezione da adottare in materia di sicurezza sul lavoro e di tutela dell'ambiente.</p>
      <p style={bodyStyle}>In relazione a tutto quanto sopra dichiarato l'impresa si impegna a comunicare tempestivamente ogni ulteriore variazione.</p>
      <Firma />
    </div>
  )
}

// ─── TEMPLATE 3 ────────────────────────────────────────────────────────────
function Doc3({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Dichiarazione di adempienza agli obblighi D.Lgs. 81/2008 e s.m.i.</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}><strong>Cantiere di:</strong> {pos.committente.indirizzoCantiere}</p>
      <p style={bodyStyle}><strong>Lavori di:</strong> {pos.lavori}</p>
      <p style={bodyStyle}>Il sottoscritto <strong>{ARCHE.datoreLavoro}</strong><br />
      Titolare e legale rappresentante dell'impresa <strong>{ARCHE.ragioneSociale}</strong><br />
      con sede in via <strong>{ARCHE.via}</strong> — {ARCHE.citta} {ARCHE.cap}</p>
      <p style={bodyStyle}><strong>DICHIARA</strong></p>
      <p style={bodyStyle}><strong>Sotto la propria responsabilità di essere in regola con quanto richiesto dal D.lgs 81/08 e s.m.i. e che l'organizzazione della Sicurezza all'interno della propria Azienda prevede le seguenti figure professionali:</strong></p>
      <ul style={{ ...bodyStyle, paddingLeft: 20 }}>
        <li><strong>Responsabile del Servizio di Prevenzione e Protezione</strong> nella persona di <strong>{ARCHE.rspp}</strong></li>
        <li><strong>Medico Competente</strong> nella persona di <strong>{ARCHE.medicoCompetente}</strong></li>
        <li><strong>Rappresentante dei Lavoratori per la sicurezza</strong> nella persona di <strong>{ARCHE.rls}</strong></li>
      </ul>
      {(() => {
        const datore = pos.personaleCantiere.find(p => p.ruolo === 'DATORE DI LAVORO')
        const preposto = datore ? getNome(datore.personaId) : ARCHE.preposto
        const altri = pos.personaleCantiere.filter(p => p.ruolo !== 'DATORE DI LAVORO')
        const sostituto = altri.length > 0 ? getNome(altri[0].personaId) : ARCHE.prepostoSostituto
        const primoSoccorso = pos.addettiEmergenza.find(e => e.ruoloEmergenza === 'ADDETTO I SOCCORSO')
        const antincendio = pos.addettiEmergenza.find(e => e.ruoloEmergenza === 'ADDETTO ANTINCENDIO')
        return (
          <>
            <p style={bodyStyle}>La figura del <strong>preposto</strong> sarà svolta da <strong>{preposto}</strong> e in sua assenza <strong>{sostituto}</strong></p>
            <p style={bodyStyle}>E quella degli <strong>addetti alle emergenze</strong>:<br />
            <strong>primo soccorso</strong> {primoSoccorso ? getNome(primoSoccorso.personaId) : ARCHE.primoSoccorso}<br />
            <strong>prevenzione incendi</strong> {antincendio ? getNome(antincendio.personaId) : ARCHE.prevInc}</p>
          </>
        )
      })()}
      <p style={bodyStyle}>Si allegano alla dichiarazione copie degli attestati dei corsi e nomina dei responsabili.</p>
      <Firma />
    </div>
  )
}

// ─── TEMPLATE 4 ────────────────────────────────────────────────────────────
function Doc4({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Accettazione Piano di Sicurezza e Coordinamento</div>
      <div style={{ ...titleStyle, fontSize: '10pt', marginBottom: 20 }}>e Fascicolo dell'Opera</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}><strong>Oggetto:</strong> accettazione del "Piano di Sicurezza e Coordinamento"</p>
      <p style={bodyStyle}><strong>Cantiere di:</strong> {pos.committente.indirizzoCantiere}</p>
      <p style={bodyStyle}><strong>Lavori di:</strong> {pos.lavori}</p>
      <p style={bodyStyle}>Il sottoscritto <strong>{ARCHE.datoreLavoro}</strong> in qualità di DATORE di LAVORO dell'impresa <strong>{ARCHE.ragioneSociale}</strong> aggiudicataria dei lavori di cui all'oggetto, con la presente Le comunica l'accettazione del Piano di Sicurezza e Coordinamento (ricevuto in data antecedente rispetto alla gara d'appalto) e l'esplicito ed incondizionato impegno per il rispetto dei suoi contenuti secondo allegato XV D.Lgs. 81/08 e s.m.i.</p>
      <p style={bodyStyle}>Distinti saluti.</p>
      <Firma label="Il Dichiarante" />
    </div>
  )
}

// ─── TEMPLATE 5 ────────────────────────────────────────────────────────────
function Doc5({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Dichiarazione sostitutiva dell'atto di notorietà</div>
      <div style={{ textAlign: 'center', fontSize: '9pt', marginBottom: 20 }}>(D.P.R. 28 dicembre 2000, n. 445)</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}>Il sottoscritto <strong>{ARCHE.datoreLavoro}</strong> nato a <strong>{ARCHE.datoreLavoroNato}</strong> il <strong>{ARCHE.datoreLavoroDataNascita}</strong> domiciliato per l'occorrenza in {ARCHE.datoreLavoroResidenza}, Tel {ARCHE.tel} - e-mail {ARCHE.email}, in qualità di datore di lavoro dell'impresa <strong>{ARCHE.ragioneSociale}</strong> a conoscenza delle sanzioni previste dall'art. 26 della legge n. 15/1968 e dal comma 3 dell'art. 11 del D.P.R. n. 403/1998 in caso di dichiarazioni false e mendaci, Visto il secondo periodo del comma 9, lettera a), e b), art. 90 del D.Lgs. n. 81/2008</p>
      <p style={bodyStyle}><strong>DICHIARA</strong></p>
      <ul style={{ ...bodyStyle, paddingLeft: 20 }}>
        <li>Di essere in possesso dei requisiti previsti dall'allegato XVII art. 90, D.Lgs. n. 81/2008;</li>
        <li>Che il contratto Collettivo Nazionale Applicato (CCNL) è del comparto METALMECCANICO {ARCHE.ccnl}</li>
      </ul>
      <p style={bodyStyle}>Che i dati riportati sono veritieri e comunque si impegna a fornire su richiesta copia dei documenti comprovanti le indicazioni contenute nella presente dichiarazione.</p>
      <p style={bodyStyle}><strong>Si autorizza al trattamento dei dati ai sensi del D.Lgs. n. 196/2003.</strong></p>
      <Firma label="Timbro e firma" />
    </div>
  )
}

// ─── TEMPLATE 6 ────────────────────────────────────────────────────────────
function Doc6({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Dichiarazione sostitutiva di conformità di macchine, attrezzature e opere provvisionali</div>
      <div style={{ textAlign: 'center', fontSize: '9pt', marginBottom: 20 }}>(Allegato XVII, punto 1, lettera c), D.Lgs. n. 81/2008)</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}>Il sottoscritto <strong>{ARCHE.datoreLavoro}</strong> nato a <strong>{ARCHE.datoreLavoroNato}</strong> il <strong>{ARCHE.datoreLavoroDataNascita}</strong> domiciliato per l'occorrenza in {ARCHE.datoreLavoroResidenza}, Tel {ARCHE.tel} - e-mail {ARCHE.email}, in qualità di datore di lavoro dell'impresa <strong>{ARCHE.ragioneSociale}</strong><br />vista la lettera c), Allegato XVII al D.Lgs. n. 81/2008, Testo unico sicurezza</p>
      <p style={bodyStyle}><strong>D I C H I A R A</strong></p>
      <p style={bodyStyle}><strong>che le macchine, le attrezzature e le opere provvisionali sono conformi a quanto previsto dal D.Lgs. n. 81/2008, Testo unico sicurezza, dalla direttiva macchine D.P.R. n. 459/1996 e che le attrezzature, le macchine e le opere provvisionali sono sottoposte a manutenzione periodica da personale competente.</strong></p>
      <Firma label="Timbro e firma" />
    </div>
  )
}

// ─── TEMPLATE 7 ────────────────────────────────────────────────────────────
function Doc7({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Dichiarazione di non essere oggetto di provvedimenti di sospensione</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}><strong>Cantiere di:</strong> {pos.committente.indirizzoCantiere}</p>
      <p style={bodyStyle}><strong>Lavori di:</strong> {pos.lavori}</p>
      <p style={bodyStyle}>Il sottoscritto <strong>{ARCHE.datoreLavoro}</strong>, in qualità di datore di lavoro dell'impresa <strong>{ARCHE.ragioneSociale}</strong>, con sede in <strong>{ARCHE.sede}</strong></p>
      <p style={bodyStyle}><strong>DICHIARA</strong></p>
      <p style={bodyStyle}>sotto la propria responsabilità, ai sensi dell'art. 14 del D.Lgs. 81/2008 e s.m.i., che l'impresa non è oggetto di provvedimenti di sospensione dell'attività imprenditoriale adottati ai sensi del comma 1 del medesimo articolo.</p>
      <p style={bodyStyle}>Dichiara altresì che nei confronti dell'impresa non sono stati adottati provvedimenti di sospensione relativi a violazioni in materia di lavoro e legislazione sociale.</p>
      <p style={bodyStyle}><strong>Si autorizza al trattamento dei dati ai sensi del D.Lgs. n. 196/2003.</strong></p>
      <Firma />
    </div>
  )
}

// ─── TEMPLATE 8 ────────────────────────────────────────────────────────────
function Doc8({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Autocertificazione di avere provveduto alla valutazione dei rischi</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}><strong>Cantiere di:</strong> {pos.committente.indirizzoCantiere}</p>
      <p style={bodyStyle}>Il sottoscritto <strong>{ARCHE.datoreLavoro}</strong>, in qualità di datore di lavoro dell'impresa <strong>{ARCHE.ragioneSociale}</strong></p>
      <p style={bodyStyle}><strong>AUTOCERTIFICA</strong></p>
      <p style={bodyStyle}>ai sensi e per gli effetti dell'art. 29 comma 5 del D.Lgs. 81/2008 e s.m.i., di avere effettuato la valutazione dei rischi per la sicurezza e la salute durante il lavoro ai sensi del D.Lgs. 81/08 e s.m.i. e di avere predisposto il relativo documento di valutazione dei rischi.</p>
      <p style={bodyStyle}>Dichiara altresì che il documento di valutazione dei rischi è custodito presso la sede aziendale ed è disponibile per la consultazione da parte degli organi di vigilanza.</p>
      <p style={bodyStyle}><strong>Si autorizza al trattamento dei dati ai sensi del D.Lgs. n. 196/2003.</strong></p>
      <Firma />
    </div>
  )
}

// ─── TEMPLATE 9 ────────────────────────────────────────────────────────────
function Doc9({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Nominativi delle figure addette alla sicurezza all'interno dell'azienda</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}><strong>Cantiere di:</strong> {pos.committente.indirizzoCantiere}</p>
      <p style={bodyStyle}>L'impresa <strong>{ARCHE.ragioneSociale}</strong> comunica i nominativi delle figure addette alla sicurezza:</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 14, fontSize: '9.5pt' }}>
        <tbody>
          {(() => {
            const datore = pos.personaleCantiere.find(p => p.ruolo === 'DATORE DI LAVORO')
            const preposto = datore ? getNome(datore.personaId) : ARCHE.preposto
            const altri = pos.personaleCantiere.filter(p => p.ruolo !== 'DATORE DI LAVORO')
            const sostituto = altri.length > 0 ? getNome(altri[0].personaId) : ARCHE.prepostoSostituto
            const primoSoccorso = pos.addettiEmergenza.find(e => e.ruoloEmergenza === 'ADDETTO I SOCCORSO')
            const antincendio = pos.addettiEmergenza.find(e => e.ruoloEmergenza === 'ADDETTO ANTINCENDIO')
            return [
              ['Datore di Lavoro', pos.nostraDitta.datoreLavoro || ARCHE.datoreLavoro],
              ['RSPP', pos.nostraDitta.rspp || ARCHE.rspp],
              ['Medico Competente', pos.nostraDitta.medicoLavoro || ARCHE.medicoCompetente],
              ['RLS', pos.nostraDitta.rls || ARCHE.rls],
              ['Preposto', preposto],
              ['Preposto sostituto', sostituto],
              ['Addetto primo soccorso', primoSoccorso ? getNome(primoSoccorso.personaId) : ARCHE.primoSoccorso],
              ['Addetto prevenzione incendi', antincendio ? getNome(antincendio.personaId) : ARCHE.prevInc],
            ]
          })().map(([ruolo, nome]) => (
            <tr key={ruolo}>
              <td style={{ border: '0.5pt solid #D1D5DB', padding: '5px 8px', background: '#FAFAFA', width: '55%', fontWeight: 500 }}>{ruolo}</td>
              <td style={{ border: '0.5pt solid #D1D5DB', padding: '5px 8px' }}>{nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Firma />
    </div>
  )
}

// ─── TEMPLATE 10 ────────────────────────────────────────────────────────────
function Doc10({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Dichiarazione cumulativa</div>
      <div style={{ ...titleStyle, fontSize: '9pt', marginBottom: 20 }}>Comunicazione dei nominativi dei soggetti dell'impresa affidataria incaricati per l'assolvimento dei compiti dell'art. 97 del D.Lgs. 81/08 e s.m.i.</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}>Con riferimento ai lavori in appalto consistenti nello svolgimento delle seguenti attività: <strong>{pos.lavori}</strong></p>
      <p style={bodyStyle}>presso il cantiere di: <strong>{pos.committente.indirizzoCantiere}</strong></p>
      <p style={bodyStyle}>L'impresa <strong>{ARCHE.ragioneSociale}</strong>, nella persona del suo legale rappresentante <strong>{ARCHE.legaleRappresentante}</strong></p>
      <p style={bodyStyle}><strong>DICHIARA</strong></p>
      <p style={bodyStyle}>che i soggetti incaricati per l'assolvimento dei compiti di cui all'art. 97 del D.Lgs. 81/08 sono:</p>
      <p style={bodyStyle}><strong>{ARCHE.datoreLavoro}</strong> — Datore di Lavoro / Preposto<br />
      <strong>{ARCHE.prepostoSostituto}</strong> — Preposto sostituto</p>
      <Firma />
    </div>
  )
}

// ─── TEMPLATE 11 ────────────────────────────────────────────────────────────
function Doc11({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Manifestazione di consenso al trattamento dei dati personali</div>
      <div style={{ textAlign: 'center', fontSize: '9pt', marginBottom: 20 }}>(ai sensi del D.Lgs. 196/2003 e del Regolamento UE 2016/679 — GDPR)</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}><strong>Cantiere di:</strong> {pos.committente.indirizzoCantiere}</p>
      <p style={bodyStyle}>Il sottoscritto <strong>{ARCHE.datoreLavoro}</strong>, in qualità di legale rappresentante dell'impresa <strong>{ARCHE.ragioneSociale}</strong></p>
      <p style={bodyStyle}><strong>DICHIARA</strong></p>
      <p style={bodyStyle}>di aver preso visione dell'informativa sul trattamento dei dati personali ai sensi dell'art. 13 del D.Lgs. 196/2003 e dell'art. 13 del Regolamento UE 2016/679 (GDPR) e</p>
      <p style={bodyStyle}><strong>MANIFESTA IL PROPRIO CONSENSO</strong></p>
      <p style={bodyStyle}>al trattamento dei dati personali propri e dei propri dipendenti per le finalità connesse all'esecuzione dei lavori presso il cantiere sopra indicato, nel rispetto delle normative vigenti in materia di privacy e protezione dei dati personali.</p>
      <Firma />
    </div>
  )
}

// ─── TEMPLATE 12 ────────────────────────────────────────────────────────────
function Doc12({ pos }: { pos: PosData }) {
  return (
    <div style={pageStyle}>
      <DocHeader />
      <div style={titleStyle}>Comunicazione dei nominativi dei soggetti dell'impresa affidataria</div>
      <div style={{ ...titleStyle, fontSize: '9pt', marginBottom: 20 }}>incaricati per l'assolvimento dei compiti dell'art. 97 del D.Lgs. 81/08 e s.m.i.</div>
      <div style={destStyle}>
        <div><strong>Al Committente</strong></div>
        <div><strong>{pos.committente.nomeDitta}</strong></div>
        <br />
        <div>E P.C. Responsabile dei Lavori</div>
        <div>Al Coordinatore in sede di esecuzione dei lavori</div>
      </div>
      <p style={bodyStyle}>Con riferimento ai lavori in appalto: <strong>{pos.lavori}</strong></p>
      <p style={bodyStyle}>Cantiere: <strong>{pos.committente.indirizzoCantiere}</strong></p>
      <p style={bodyStyle}>Si comunica che i soggetti dell'impresa <strong>{ARCHE.ragioneSociale}</strong> incaricati per l'assolvimento dei compiti di cui all'art. 97 del D.Lgs. 81/08 e s.m.i. sono i seguenti:</p>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 14, fontSize: '9.5pt' }}>
        <tbody>
          {[
            ['Datore di Lavoro', ARCHE.datoreLavoro],
            ['Preposto', ARCHE.preposto],
            ['Preposto sostituto', ARCHE.prepostoSostituto],
            ['RSPP', ARCHE.rspp],
          ].map(([ruolo, nome]) => (
            <tr key={ruolo}>
              <td style={{ border: '0.5pt solid #D1D5DB', padding: '5px 8px', background: '#FAFAFA', width: '45%', fontWeight: 500 }}>{ruolo}</td>
              <td style={{ border: '0.5pt solid #D1D5DB', padding: '5px 8px' }}>{nome}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Firma />
    </div>
  )
}

// ─── COMPONENTI RENDER PER EXPORT ───────────────────────────────────────────
const DOC_COMPONENTS = [Doc1, Doc2, Doc3, Doc4, Doc5, Doc6, Doc7, Doc8, Doc9, Doc10, Doc11, Doc12]

// ─── PANNELLO DICHIARAZIONI (sostituisce InfoBox nel frontespizio) ────────────
export default function DichiarazioniPanel({ pos }: { pos: PosData }) {
  const [selected, setSelected] = useState<Record<number, boolean>>(
    Object.fromEntries(DOCS.map(d => [d.id, true]))
  )
  const [preview, setPreview] = useState<number | null>(null)
  const [exporting, setExporting] = useState(false)

  function toggleDoc(id: number) {
    setSelected(prev => ({ ...prev, [id]: !prev[id] }))
  }

  async function esportaZip() {
    setExporting(true)
    try {
      const [{ default: jsPDF }, { default: html2canvas }, { default: JSZip }] =
        await Promise.all([import('jspdf'), import('html2canvas'), import('jszip')])

      const zip = new JSZip()
      const committente = pos.committente.nomeDitta.replace(/[^a-zA-Z0-9]/g, '_').slice(0,20)
      const docsToExport = DOCS.filter(d => selected[d.id])

      for (const doc of docsToExport) {
        const DocComp = DOC_COMPONENTS[doc.id - 1]

        // Render temporaneo
        const container = document.createElement('div')
        container.style.cssText = 'position:fixed;left:-9999px;top:0;width:794px;background:white;'
        document.body.appendChild(container)

        const { createRoot } = await import('react-dom/client')
        const root = createRoot(container)
        root.render(React.createElement(DocComp, { pos }))
        await new Promise(r => setTimeout(r, 200))

        // Converti in canvas → PDF
        const canvas = await html2canvas(container, {
          scale: 2, useCORS: true, logging: false,
          width: 794, windowWidth: 794,
        })
        const imgData = canvas.toDataURL('image/jpeg', 0.95)
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
        const pdfW = pdf.internal.pageSize.getWidth()
        const pdfH = (canvas.height * pdfW) / canvas.width
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH)

        const filename = `${String(doc.id).padStart(2,'0')}_${slug(doc.nome)}_${committente}.pdf`
        zip.file(filename, pdf.output('arraybuffer'))

        root.unmount()
        document.body.removeChild(container)
      }

      const blob = await zip.generateAsync({ type: 'blob' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Dichiarazioni_${committente}_${oggi().replace(/\//g,'-')}.zip`
      a.click()
      setTimeout(() => URL.revokeObjectURL(url), 2000)
    } catch(e) {
      console.error('Export error:', e)
      alert('Errore durante l\'esportazione. Riprova.')
    }
    setExporting(false)
  }

  const selectedCount = Object.values(selected).filter(Boolean).length

  return (
    <div>
      {/* Lista documenti */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 14 }}>
        {DOCS.map(doc => (
          <div key={doc.id}
            onClick={() => toggleDoc(doc.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 9,
              padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
              border: `1px solid ${selected[doc.id] ? '#C4B5FD' : '#E5E7EB'}`,
              background: selected[doc.id] ? '#F5F3FF' : 'white',
              transition: 'all 0.12s',
            }}>
            <input type="checkbox" checked={selected[doc.id]}
              onChange={() => toggleDoc(doc.id)}
              onClick={e => e.stopPropagation()}
              style={{ width: 14, height: 14, accentColor: '#7C3AED', cursor: 'pointer', flexShrink: 0 }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#8B5CF6', minWidth: 16 }}>{doc.id}</span>
            <span style={{ fontSize: 11, color: selected[doc.id] ? '#3B0764' : '#6B7280', flex: 1, lineHeight: 1.3 }}>{doc.nome}</span>
            <button
              onClick={e => { e.stopPropagation(); setPreview(preview === doc.id ? null : doc.id) }}
              style={{ fontSize: 9, padding: '2px 7px', borderRadius: 6, border: '1px solid #C4B5FD',
                background: preview === doc.id ? '#7C3AED' : 'white',
                color: preview === doc.id ? 'white' : '#7C3AED', cursor: 'pointer', flexShrink: 0 }}>
              {preview === doc.id ? '▲' : '▼'}
            </button>
          </div>
        ))}
      </div>

      {/* Preview inline */}
      {preview !== null && (() => {
        const DocComp = DOC_COMPONENTS[preview - 1]
        return (
          <div style={{ border: '1px solid #C4B5FD', borderRadius: 8, overflow: 'hidden', marginBottom: 14 }}>
            <div style={{ background: '#EDE9FE', padding: '6px 12px', fontSize: 11, fontWeight: 700, color: '#5B21B6' }}>
              Anteprima — {DOCS[preview-1].nome}
            </div>
            <div style={{ transform: 'scale(0.55)', transformOrigin: 'top left', width: '182%', pointerEvents: 'none' }}>
              <DocComp pos={pos} />
            </div>
          </div>
        )
      })()}

      {/* Bottone export */}
      <button onClick={esportaZip} disabled={exporting || selectedCount === 0}
        style={{
          width: '100%', padding: '10px 0', borderRadius: 8,
          border: 'none', background: selectedCount > 0 ? '#7C3AED' : '#E5E7EB',
          color: selectedCount > 0 ? 'white' : '#9CA3AF',
          fontWeight: 700, fontSize: 13, cursor: selectedCount > 0 ? 'pointer' : 'default',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        {exporting ? 'Preparazione ZIP...' : `Scarica ZIP (${selectedCount} documenti)`}
      </button>
      <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 6, textAlign: 'center' }}>
        File nominati singolarmente — pronti per l'invio
      </div>
    </div>
  )
}


// ─── EXPORT NAMED: preview colonna centrale ──────────────────────────────────
export function DichiarazioniPreview({ pos }: { pos: PosData }) {
  const [docAttivo, setDocAttivo] = React.useState(1)

  return (
    <div>
      {/* Selettore rapido documento */}
      <div className="no-print" style={{
        display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 16,
        background: 'white', borderRadius: 10, padding: '8px 12px',
        border: '1px solid #EDE9FE', boxShadow: '0 1px 4px rgba(91,33,182,0.06)',
      }}>
        {DOCS.map(doc => (
          <button key={doc.id} onClick={() => setDocAttivo(doc.id)} style={{
            fontSize: 10, fontWeight: docAttivo === doc.id ? 700 : 400,
            padding: '3px 10px', borderRadius: 20, cursor: 'pointer',
            border: `1px solid ${docAttivo === doc.id ? '#7C3AED' : '#E5E7EB'}`,
            background: docAttivo === doc.id ? '#EDE9FE' : 'transparent',
            color: docAttivo === doc.id ? '#5B21B6' : '#6B7280',
            whiteSpace: 'nowrap',
          }}>
            {doc.id}. {doc.nome.split(' ').slice(0,3).join(' ')}...
          </button>
        ))}
      </div>

      {/* Documento attivo */}
      {(() => {
        const DocComp = DOC_COMPONENTS[docAttivo - 1]
        return <DocComp pos={pos} />
      })()}
    </div>
  )
}
