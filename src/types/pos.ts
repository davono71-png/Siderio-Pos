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

export type SostanzaChimica = {
  id: string
  presente: boolean
  nome: string
  utilizzo: string
  schedaSicurezzaAllegata: boolean
}

export type RischioChimico = {
  presente: boolean
  possibiliInterferenze: boolean
  sostanzeChimiche: boolean
  polveri: boolean
  fumi: boolean
  sostanze: SostanzaChimica[]
  probabilita: number
  danno: number
}

export type RischioIncendio = {
  presente: boolean
  materialeCombustibile: boolean
  sostanzeInfiammabili: boolean
  impiantiElettricoTermico: boolean
  probabilita: number
  danno: number
}

export type RischioRumore = {
  presente: boolean
  attrezzatureRumorose: boolean
  lavorazioniMeccaniche: boolean
  livello: "INFERIORE_80" | "TRA_80_85" | "SUPERIORE_85"
}

export type RischioVibrazioni = {
  presente: boolean
  usoAttrezzatureManuali: boolean
  guidaMezziCantiere: boolean
  livello: "INFERIORE_2_5" | "TRA_2_5_5" | "SUPERIORE_5"
}

export type Attrezzatura = {
  id: string
  tipologia: string
  fase: string
  libroMacchina: boolean
}

export type RischioMacchine = {
  presente: boolean
  organiInMovimento: boolean
  proiezioneMaterie: boolean
  superficiTaglienti: boolean
  attrezzature: Attrezzatura[]
  probabilita: number
  danno: number
}

export type RischioMMC = {
  presente: boolean
  movimentazioneManuale: boolean
  postureIncongrue: boolean
  movimentiRepetitivi: boolean
  probabilita: number
  danno: number
}

export type RischioElettrico = {
  presente: boolean
  contattoDiretto: boolean
  contattoIndiretto: boolean
  usoAttrezzatureElettriche: boolean
  probabilita: number
  danno: number
}

export type RischioAltura = {
  presente: boolean
  lavoroInQuota: boolean
  usoPle: boolean
  usoImpalcature: boolean
  probabilita: number
  danno: number
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

  rischioChimico: RischioChimico
  rischioIncendio: RischioIncendio
  rischioRumore: RischioRumore
  rischioVibrazioni: RischioVibrazioni
  rischioMacchine: RischioMacchine
  rischioMMC: RischioMMC
  rischioElettrico: RischioElettrico
  rischioAltura: RischioAltura

  pscRichiesto: boolean
}

