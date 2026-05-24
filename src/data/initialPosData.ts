import type { PosData } from "../types/pos"
import { persone } from "./personale"

function today() {
  return new Date().toISOString().slice(0, 10)
}

function defaultFormazione() {
  return Object.fromEntries(
    persone.map((persona) => [
      persona.id,
      persona.formazioneDefault,
    ])
  )
}

export const initialPosData: PosData = {
  revisione: "00",
  dataRevisione: today(),
  descrizioneRevisione: "EMISSIONE",

  commessa: "",
  lavori: "",

  lavorazioniInterno: false,
  lavorazioniEsterno: false,

  committente: {
    nomeDitta: "",
    responsabileLavori: "",
    indirizzoCantiere: "",
    referente: "",
    direttoreLavori: "",
    coordinatoreSicurezza: "",
    psc: false,
  },

  esisteAppaltatrice: true,

  appaltatrice: {
    nomeDitta: "",
    sedeLegale: "",
    sedeOperativa: "",
    datoreLavoro: "",
    referenteAppalto: "",
    rspp: "",
    medicoLavoro: "",
    rls: "",
  },

  nostraDitta: {
    nomeDitta: "Arché Italia SRL Unipersonale",
    sedeLegale: "Via Guido Rossa 30 – 25060 – Cellatica BS",
    sedeOperativa: "Via Guido Rossa 30 – 25060 – Cellatica BS",
    datoreLavoro: "Onofri Davide",
    referenteAppalto: "",
    rspp: "Onofri Davide",
    medicoLavoro: "Marchetti Dr.ssa Serena",
    rls: "Onofri Tommaso",
  },

  numeriUtili: [
    {
      nominativo: "Onofri Davide",
      telefono: "+39 030 2772818",
      cellulare: "+39 331 940 1110",
    },
    {
      nominativo: "Emergenza",
      telefono: "112",
      cellulare: "112",
    },
  ],

  firme: {
    ditta: "Arché Italia Srl Unipersonale",
    firmatario: "Onofri Davide",
  },

  durataCantiere: {
    periodoDa: "",
    periodoA: "",
    mattinoDa: "08:00",
    mattinoA: "12:00",
    pomeriggioDa: "13:00",
    pomeriggioA: "17:00",
    orarioContinuato: false,
    note: "L'orario è indicativo, in funzione delle condizioni atmosferiche e delle necessità di esecuzione dei lavori.",
  },

  personaleCantiere: [
    {
      personaId: "davide-onofri",
      ruolo: "DATORE DI LAVORO",
    },
  ],

  addettiEmergenza: [
    {
      personaId: "fabio-andreatta",
      ruoloEmergenza: "ADDETTO I SOCCORSO",
    },
    {
      personaId: "fabio-andreatta",
      ruoloEmergenza: "ADDETTO ANTINCENDIO",
    },
  ],

  formazionePersonale: defaultFormazione(),

  dpiCantiere: [
    { id: "abbigliamento", nome: "Abbigliamento da lavoro", presente: true },
    { id: "casco", nome: "Casco protettivo", presente: true },
    { id: "scarpe", nome: "Scarpe antinfortunistiche", presente: true },
    { id: "guanti", nome: "Guanti", presente: true },
    { id: "occhiali", nome: "Occhiali, maschere schermi", presente: true },
    { id: "otoprotettori", nome: "Otoprotettori (cuffie antirumore – tappi ecc.)", presente: true },
    { id: "facciali", nome: "Facciali filtranti o maschere con filtro", presente: true },
    { id: "cinture", nome: "Cinture di sicurezza – Guida Veicoli", presente: true },
    { id: "imbracature", nome: "Imbracature di sicurezza", presente: true },
    { id: "dpi-terza", nome: "DPI III Categoria", presente: true },
    { id: "alta-visibilita", nome: "Indumenti alta visibilità (Accesso al cantiere ove richiesto da PSC se presente)", presente: true },
  ],

  tempiEsecuzione: [
    { attivita: "ORGANIZZAZIONE", percentuale: 2 },
    { attivita: "PREPARAZIONE - SCARICO", percentuale: 10 },
    { attivita: "OPERE DI INSTALLAZIONE", percentuale: 83 },
    { attivita: "SMOBILITAZIONE - PULIZIA", percentuale: 5 },
  ],

  fasiOperative: [
    {
      titolo: "Scarico materiali ed attrezzature",
      descrizione: "",
    },
  ],

  analisiRischiSpecificiOpere: "",

  rischioChimico: {
    presente: false,
    possibiliInterferenze: false,
    sostanzeChimiche: true,
    polveri: true,
    fumi: false,
    sostanze: [
      { id: "fondo-speciale-solvente", presente: false, nome: "FONDO SPECIALE A SOLVENTE-J Color spa", utilizzo: "VERNICIATURA", schedaSicurezzaAllegata: false },
      { id: "smalto-alchidico", presente: false, nome: "SMALTO ALCHIDICO- JColor spa", utilizzo: "VERNICIATURA", schedaSicurezzaAllegata: false },
      { id: "diluente-nitro-antinebbia", presente: false, nome: "DILUENTE NITRO ANTINEBBIA- Coloritaliana spa", utilizzo: "VERNICIATURA", schedaSicurezzaAllegata: false },
      { id: "selemix-7320-opaco", presente: false, nome: "SELEMIX 7.320 - OPACO - Selemix", utilizzo: "VERNICIATURA", schedaSicurezzaAllegata: false },
      { id: "selemix-cellulosa-lucido", presente: false, nome: "SELEMIX CELLULOSA LUCIDO - Selemix", utilizzo: "VERNICIATURA", schedaSicurezzaAllegata: false },
      { id: "smalto-satinato", presente: false, nome: "SMALTO SATINATO - Bol 21HP", utilizzo: "VERNICIATURA", schedaSicurezzaAllegata: false },
      { id: "smalto-sintetico-trasparente", presente: false, nome: "SMALTO SINTETICO TRASPARENTE - Maurer Plus", utilizzo: "VERNICIATURA", schedaSicurezzaAllegata: false },
      { id: "silicone-neutro", presente: false, nome: "SILICONE NEUTRO – F.lli Zucchetti", utilizzo: "SIGILLATURA", schedaSicurezzaAllegata: false },
      { id: "silicone-acryl-dec", presente: false, nome: "SILICONE ACRYL DEC - G&b fissaggi", utilizzo: "SIGILLATURA", schedaSicurezzaAllegata: false },
      { id: "sigillante-acrilico-gebosil", presente: false, nome: "SIGILLANTE ACRILICO - GEBOSIL G&B Fissaggi", utilizzo: "SIGILLATURA", schedaSicurezzaAllegata: false },
      { id: "pro-attack-colla", presente: false, nome: "PRO ATTACK – COLLA – G&B Fissaggi", utilizzo: "SIGILLATURA", schedaSicurezzaAllegata: false },
      { id: "high-tack-colla", presente: false, nome: "HIGH TACK - COLLA - Posa Clima", utilizzo: "SIGILLATURA", schedaSicurezzaAllegata: false },
      { id: "super-hybrid-sh-pro", presente: true, nome: "SUPER HYBRID SH-PRO COMP A - ADESIVO - G&B Fissaggi", utilizzo: "SIGILLATURA", schedaSicurezzaAllegata: true },
      { id: "silicone-strutturale-nero-dowsil", presente: false, nome: "SILICONE STRUTTURALE NERO DOWSIL - Dow Italia", utilizzo: "SIGILLATURA", schedaSicurezzaAllegata: false },
      { id: "argon", presente: false, nome: "ARGON ------ Allegare SCHEDA", utilizzo: "SALDATURA", schedaSicurezzaAllegata: false },
    ],
    probabilita: 1,
    danno: 1,
  },

  rischioIncendio: {
    presente: true,
    materialeCombustibile: true,
    sostanzeInfiammabili: false,
    impiantiElettricoTermico: true,
    probabilita: 1,
    danno: 2,
  },

  rischioRumore: {
    presente: true,
    attrezzatureRumorose: true,
    lavorazioniMeccaniche: true,
    livello: "TRA_80_85",
  },

  rischioVibrazioni: {
    presente: true,
    usoAttrezzatureManuali: true,
    guidaMezziCantiere: false,
    livello: "INFERIORE_2_5",
  },

  rischioMacchine: {
    presente: true,
    organiInMovimento: true,
    proiezioneMaterie: true,
    superficiTaglienti: true,
    attrezzature: [
      { id: "attrezzatura-1", tipologia: "Trapano/Avvitatore", fase: "Installazione", libroMacchina: true },
      { id: "attrezzatura-2", tipologia: "Smerigliatrice angolare", fase: "Taglio", libroMacchina: true },
      { id: "attrezzatura-3", tipologia: "PLE / Piattaforma elevabile", fase: "Lavori in quota", libroMacchina: true },
    ],
    probabilita: 2,
    danno: 2,
  },

  rischioMMC: {
    presente: true,
    movimentazioneManuale: true,
    postureIncongrue: true,
    movimentiRepetitivi: false,
    probabilita: 1,
    danno: 2,
  },

  rischioElettrico: {
    presente: true,
    contattoDiretto: false,
    contattoIndiretto: true,
    usoAttrezzatureElettriche: true,
    probabilita: 1,
    danno: 3,
  },

  rischioAltura: {
    presente: true,
    lavoroInQuota: true,
    usoPle: true,
    usoImpalcature: false,
    probabilita: 2,
    danno: 3,
  },

  pscRichiesto: false,
}
