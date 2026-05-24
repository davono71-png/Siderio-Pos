import Page from "../components/Page"
import type { PosData } from "../types/pos"

type Props = { pos: PosData; pageNumber?: number }

export default function Sommario({ pos, pageNumber }: Props) {
  return (
    <Page pos={pos} pageNumber={pageNumber}>
      <h1 className="text-2xl font-bold text-center mb-10">SOMMARIO</h1>

      <div className="space-y-1 text-[12px]">
        <SomRow title="0. IL CANTIERE" page="3" />
        <SomRow title="  Tab. 0.1 – Dati emissione documento" page="3" indent />
        <SomRow title="  Tab. 0.2 – Descrizione generale delle opere" page="3" indent />
        <SomRow title="  Tab. 0.3 – Note al POS" page="3" indent />
        <SomRow title="  Tab. 0.4 – Committente" page="4" indent />
        <SomRow title="  Tab. 0.5 – Appaltatrice" page="4" indent />
        <SomRow title="  Tab. 0.6 – Nostra ditta (subappaltatrice)" page="5" indent />
        <SomRow title="  Tab. 0.7 – Numeri utili" page="5" indent />
        <SomRow title="  Tab. 0.8 – Firme" page="5" indent />
        <SomRow title="  Tab. 0.9 – Durata del cantiere" page="6" indent />

        <div className="mt-3" />
        <SomRow title="1. PERSONALE IN CANTIERE" page="8" />
        <SomRow title="  Tab. 1.1 – Personale e ruoli" page="8" indent />
        <SomRow title="  Tab. 1.2 – Formazione del personale" page="9" indent />
        <SomRow title="  Tab. 1.3 – DPI in dotazione" page="10" indent />

        <div className="mt-3" />
        <SomRow title="2. LE OPERE" page="12" />
        <SomRow title="  Tab. 2.1 – Tempi di esecuzione" page="12" indent />
        <SomRow title="  Tab. 2.2 – Fasi operative" page="13" indent />
        <SomRow title="  Tab. 2.3 – Analisi rischi specifici" page="14" indent />

        <div className="mt-3" />
        <SomRow title="3. RISCHI SPECIFICI INTRODOTTI IN CANTIERE" page="18" />
        <SomRow title="  § 3.1 – Obblighi" page="18" indent />
        <SomRow title="  § 3.2 – Divieti" page="18" indent />
        <SomRow title="  § 3.3 – Rischio chimico" page="19" indent />
        <SomRow title="  § 3.4 – Rischio incendio" page="20" indent />
        <SomRow title="  § 3.5 – Rischio rumore" page="20" indent />
        <SomRow title="  § 3.6 – Rischio vibrazioni" page="21" indent />
        <SomRow title="  § 4.7 – Rischio macchine e attrezzature" page="21" indent />
        <SomRow title="  § 4.8 – Movimentazione manuale carichi (MMC)" page="22" indent />
        <SomRow title="  § 4.9 – Rischio elettrico" page="22" indent />
        <SomRow title="  § 4.10 – Rischio cadute dall'alto" page="23" indent />

        <div className="mt-3" />
        <SomRow title="4. GESTIONE DELLE EMERGENZE" page="24" />
        <SomRow title="  E01 – Comunicazione dell'incendio" page="24" indent />
        <SomRow title="  E02 – Comportamento in caso di incendio" page="24" indent />
        <SomRow title="  E03 – Evacuazione del cantiere" page="24" indent />
        <SomRow title="  E04 – Primo intervento antincendio" page="25" indent />
        <SomRow title="  E05 – Infortunio sul lavoro" page="25" indent />
        <SomRow title="  E06 – Evacuazione a cura della squadra" page="25" indent />
        <SomRow title="  E07 – Chiamata ai soccorsi esterni" page="25" indent />
        <SomRow title="  Tab. 4.1 – Addetti alle emergenze" page="26" indent />

        <div className="mt-3" />
        <SomRow title="5. COORDINAMENTO CON IL PSC" page="27" />
        <SomRow title="  Tab. 5.1 – Accesso fornitori e mezzi" page="27" indent />
        <SomRow title="  Tab. 5.2 – Pulizia, ordine e gestione rifiuti" page="27" indent />
        <SomRow title="  Tab. 5.3 – Distanze di sicurezza e DPI" page="28" indent />
        <SomRow title="  Tab. 5.4 – Sorveglianza sanitaria" page="28" indent />
        <SomRow title="  § 5.5 – Sospensione delle lavorazioni" page="29" indent />
        <SomRow title="  Tab. 5.6 – Ruoli e responsabilità" page="29" indent />
      </div>
    </Page>
  )
}

function SomRow({ title, page, indent }: { title: string; page: string; indent?: boolean }) {
  return (
    <div className={`flex items-end gap-1 ${indent ? "pl-4 text-[11px] text-gray-600" : "font-semibold"}`}>
      <span className="whitespace-nowrap">{title}</span>
      <div className="flex-1 border-b border-dotted border-gray-400 mb-[3px] min-w-[10px]" />
      <span className="whitespace-nowrap">{page}</span>
    </div>
  )
}
