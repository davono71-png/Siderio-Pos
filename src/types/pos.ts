import type { FormazioneFlags } from "../data/personale"

export type PersonaleRow = {
  personaId: string
  ruolo: string
}

export type EmergenzaRow = {
  personaId: string
  ruoloEmergenza: string
}

export type DpiItem = {
  id: string
  nome: string
  presente: boolean
}

export type PosData = {
  revisione: string
  dataRevisione: string
  descrizioneRevisione: string

  commessa: string
  lavori: string

  lavorazioniInterno: boolean
  lavorazioniEsterno: boolean

  committente: {
    nomeDitta: string
    responsabileLavori: string
    indirizzoCantiere: string
    referente: string
    direttoreLavori: string
    coordinatoreSicurezza: string
    psc: boolean
  }

  esisteAppaltatrice: boolean

  appaltatrice: {
    nomeDitta: string
    sedeLegale: string
    sedeOperativa: string
    datoreLavoro: string
    referenteAppalto: string
    rspp: string
    medicoLavoro: string
    rls: string
  }

  nostraDitta: {
    nomeDitta: string
    sedeLegale: string
    sedeOperativa: string
    datoreLavoro: string
    referenteAppalto: string
    rspp: string
    medicoLavoro: string
    rls: string
  }

  numeriUtili: {
    nominativo: string
    telefono: string
    cellulare: string
  }[]

  firme: {
    ditta: string
    firmatario: string
  }

  durataCantiere: {
    periodoDa: string
    periodoA: string
    mattinoDa: string
    mattinoA: string
    pomeriggioDa: string
    pomeriggioA: string
    orarioContinuato: boolean
    note: string
  }

  personaleCantiere: PersonaleRow[]
  addettiEmergenza: EmergenzaRow[]

  formazionePersonale: Record<string, FormazioneFlags>
  dpiCantiere: DpiItem[]
  tempiEsecuzione: {
  attivita: string
  percentuale: number
}[]

fasiOperative: {
  titolo: string
  descrizione: string
}[]

analisiRischiSpecificiOpere: string
}