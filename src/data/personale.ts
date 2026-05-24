export type FormazioneFlags = {
  rsppDatoreLavoro: boolean
  altoRischioGenerale: boolean
  specificaLavoratoriAltoRischio: boolean
  dpiTerzaCategoria: boolean
  abilitazionePle: boolean
  primoSoccorso: boolean
  antincendioRischioMedio: boolean
  preposto: boolean
}

export type Persona = {
  id: string
  nome: string          // "COGNOME NOME" — formato maiuscolo per tabelle
  cognome: string       // solo cognome maiuscolo
  nomeCompleto: string  // "Nome Cognome" — formato leggibile per testo
  funzione: string
  ruoliPossibili: string[]
  qualificaMansione: string
  formazioneDefault: FormazioneFlags
}

const noFormazione: FormazioneFlags = {
  rsppDatoreLavoro: false,
  altoRischioGenerale: false,
  specificaLavoratoriAltoRischio: false,
  dpiTerzaCategoria: false,
  abilitazionePle: false,
  primoSoccorso: false,
  antincendioRischioMedio: false,
  preposto: false,
}

export const persone: Persona[] = [
  {
    id: "davide-onofri",
    nome: "ONOFRI DAVIDE",
    cognome: "ONOFRI",
    nomeCompleto: "Davide Onofri",
    funzione: "DATORE DI LAVORO",
    ruoliPossibili: ["DATORE DI LAVORO"],
    qualificaMansione: "DATORE DI LAVORO",
    formazioneDefault: {
      ...noFormazione,
      rsppDatoreLavoro: true,
      primoSoccorso: true,
    },
  },
  {
    id: "tommaso-onofri",
    nome: "ONOFRI TOMMASO",
    cognome: "ONOFRI",
    nomeCompleto: "Tommaso Onofri",
    funzione: "DIPENDENTE",
    ruoliPossibili: ["LAVORATORE", "PREPOSTO"],
    qualificaMansione: "ADDETTO CARPENTIERE",
    formazioneDefault: {
      ...noFormazione,
      altoRischioGenerale: true,
      specificaLavoratoriAltoRischio: true,
      dpiTerzaCategoria: true,
      abilitazionePle: true,
    },
  },
  {
    id: "fabio-andreatta",
    nome: "ANDREATTA FABIO",
    cognome: "ANDREATTA",
    nomeCompleto: "Fabio Andreatta",
    funzione: "DIPENDENTE",
    ruoliPossibili: ["LAVORATORE", "PREPOSTO"],
    qualificaMansione: "ADDETTO CARPENTIERE",
    formazioneDefault: {
      ...noFormazione,
      altoRischioGenerale: true,
      specificaLavoratoriAltoRischio: true,
      dpiTerzaCategoria: true,
      abilitazionePle: true,
      primoSoccorso: true,
      antincendioRischioMedio: true,
      preposto: true,
    },
  },
  {
    id: "fabrizio-delbarba",
    nome: "DELBARBA FABRIZIO",
    cognome: "DELBARBA",
    nomeCompleto: "Fabrizio Delbarba",
    funzione: "DIPENDENTE",
    ruoliPossibili: ["LAVORATORE"],
    qualificaMansione: "ADDETTO CARPENTIERE",
    formazioneDefault: {
      ...noFormazione,
      altoRischioGenerale: true,
      specificaLavoratoriAltoRischio: true,
      dpiTerzaCategoria: true,
      abilitazionePle: true,
    },
  },
  {
    id: "alessio-elia",
    nome: "ELIA ALESSIO",
    cognome: "ELIA",
    nomeCompleto: "Alessio Elia",
    funzione: "DIPENDENTE",
    ruoliPossibili: ["LAVORATORE"],
    qualificaMansione: "ADDETTO CARPENTIERE",
    formazioneDefault: {
      ...noFormazione,
      altoRischioGenerale: true,
      specificaLavoratoriAltoRischio: true,
      dpiTerzaCategoria: true,
    },
  },
  {
    id: "gianfranco-delbarba",
    nome: "DELBARBA GIANFRANCO",
    cognome: "DELBARBA",
    nomeCompleto: "Gianfranco Delbarba",
    funzione: "LEGALE RAPPRESENTANTE",
    ruoliPossibili: ["LAVORATORE"],
    qualificaMansione: "ADDETTO CARPENTIERE",
    formazioneDefault: {
      ...noFormazione,
      altoRischioGenerale: true,
      specificaLavoratoriAltoRischio: true,
      dpiTerzaCategoria: true,
    },
  },
  {
    id: "mattia-delbarba",
    nome: "DELBARBA MATTIA",
    cognome: "DELBARBA",
    nomeCompleto: "Mattia Delbarba",
    funzione: "LEGALE RAPPRESENTANTE",
    ruoliPossibili: ["LAVORATORE"],
    qualificaMansione: "ADDETTO CARPENTIERE",
    formazioneDefault: {
      ...noFormazione,
      altoRischioGenerale: true,
      specificaLavoratoriAltoRischio: true,
      dpiTerzaCategoria: true,
    },
  },
]

export const ruoliEmergenza = [
  "ADDETTO I SOCCORSO",
  "ADDETTO ANTINCENDIO",
]
