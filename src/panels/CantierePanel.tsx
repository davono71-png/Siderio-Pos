import type { PosData } from "../types/pos"

import Input from "../components/form/Input"
import Textarea from "../components/form/Textarea"
import Checkbox from "../components/form/Checkbox"
import SectionTitle from "../components/form/SectionTitle"

type Props = {
  pos: PosData
  setPos: React.Dispatch<React.SetStateAction<PosData>>
}

export default function CantierePanel({ pos, setPos }: Props) {
  function update<K extends keyof PosData>(field: K, value: PosData[K]) {
    setPos({ ...pos, [field]: value })
  }

  function updateCommittente(
    field: keyof PosData["committente"],
    value: string | boolean
  ) {
    setPos({
      ...pos,
      committente: {
        ...pos.committente,
        [field]: value,
      },
    })
  }

  function updateAppaltatrice(
    field: keyof PosData["appaltatrice"],
    value: string
  ) {
    setPos({
      ...pos,
      appaltatrice: {
        ...pos.appaltatrice,
        [field]: value,
      },
    })
  }

  function updateNostraDitta(
    field: keyof PosData["nostraDitta"],
    value: string
  ) {
    setPos({
      ...pos,
      nostraDitta: {
        ...pos.nostraDitta,
        [field]: value,
      },
    })
  }

  function updateDurata(
    field: keyof PosData["durataCantiere"],
    value: string | boolean
  ) {
    setPos({
      ...pos,
      durataCantiere: {
        ...pos.durataCantiere,
        [field]: value,
      },
    })
  }

  return (
    <>
      <SectionTitle>0.1 Dati documento</SectionTitle>

      <Input
        label="Commessa"
        value={pos.commessa}
        onChange={(v) => update("commessa", v)}
      />

      <Input
        label="Revisione"
        value={pos.revisione}
        onChange={(v) => update("revisione", v)}
      />

      <Input
        label="Data revisione"
        value={pos.dataRevisione}
        type="date"
        onChange={(v) => update("dataRevisione", v)}
      />

      <Input
        label="Descrizione revisione"
        value={pos.descrizioneRevisione}
        onChange={(v) => update("descrizioneRevisione", v)}
      />

      <SectionTitle>0.2 Descrizione opere</SectionTitle>

      <Checkbox
        label="Lavorazioni in interno"
        checked={pos.lavorazioniInterno}
        onChange={(v) => update("lavorazioniInterno", v)}
      />

      <Checkbox
        label="Lavorazioni in esterno"
        checked={pos.lavorazioniEsterno}
        onChange={(v) => update("lavorazioniEsterno", v)}
      />

      <Textarea
        label="Descrizione lavori"
        value={pos.lavori}
        onChange={(v) => update("lavori", v)}
      />

      <SectionTitle>0.4 Committente</SectionTitle>

      <Input
        label="Nome ditta"
        value={pos.committente.nomeDitta}
        onChange={(v) => updateCommittente("nomeDitta", v)}
      />

      <Input
        label="Responsabile dei Lavori"
        value={pos.committente.responsabileLavori}
        onChange={(v) => updateCommittente("responsabileLavori", v)}
      />

      <Textarea
        label="Indirizzo di cantiere"
        value={pos.committente.indirizzoCantiere}
        onChange={(v) => updateCommittente("indirizzoCantiere", v)}
      />

      <Input
        label="Referente"
        value={pos.committente.referente}
        onChange={(v) => updateCommittente("referente", v)}
      />

      <Input
        label="Direttore Lavori"
        value={pos.committente.direttoreLavori}
        onChange={(v) => updateCommittente("direttoreLavori", v)}
      />

      <Input
        label="Coordinatore della sicurezza"
        value={pos.committente.coordinatoreSicurezza}
        onChange={(v) => updateCommittente("coordinatoreSicurezza", v)}
      />

      <Checkbox
        label="PSC presente"
        checked={pos.committente.psc}
        onChange={(v) => updateCommittente("psc", v)}
      />

      <SectionTitle>0.5 Appaltatrice</SectionTitle>

      <Checkbox
        label="Esiste ditta appaltatrice"
        checked={pos.esisteAppaltatrice}
        onChange={(v) => update("esisteAppaltatrice", v)}
      />

      {pos.esisteAppaltatrice && (
        <>
          <Input
            label="Nome ditta appaltatrice"
            value={pos.appaltatrice.nomeDitta}
            onChange={(v) => updateAppaltatrice("nomeDitta", v)}
          />

          <Textarea
            label="Sede legale"
            value={pos.appaltatrice.sedeLegale}
            onChange={(v) => updateAppaltatrice("sedeLegale", v)}
          />

          <Textarea
            label="Sede operativa"
            value={pos.appaltatrice.sedeOperativa}
            onChange={(v) => updateAppaltatrice("sedeOperativa", v)}
          />

          <Input
            label="Datore di lavoro"
            value={pos.appaltatrice.datoreLavoro}
            onChange={(v) => updateAppaltatrice("datoreLavoro", v)}
          />

          <Input
            label="Referente aziendale d’appalto"
            value={pos.appaltatrice.referenteAppalto}
            onChange={(v) => updateAppaltatrice("referenteAppalto", v)}
          />

          <Input
            label="RSPP"
            value={pos.appaltatrice.rspp}
            onChange={(v) => updateAppaltatrice("rspp", v)}
          />

          <Input
            label="Medico del lavoro"
            value={pos.appaltatrice.medicoLavoro}
            onChange={(v) => updateAppaltatrice("medicoLavoro", v)}
          />

          <Textarea
            label="RLS"
            value={pos.appaltatrice.rls}
            onChange={(v) => updateAppaltatrice("rls", v)}
          />
        </>
      )}

      <SectionTitle>
        {pos.esisteAppaltatrice ? "0.6 Subappaltatrice" : "0.6 Appaltatrice"}
      </SectionTitle>

      <Input
        label="Nome ditta"
        value={pos.nostraDitta.nomeDitta}
        onChange={(v) => updateNostraDitta("nomeDitta", v)}
      />

      <Textarea
        label="Sede legale"
        value={pos.nostraDitta.sedeLegale}
        onChange={(v) => updateNostraDitta("sedeLegale", v)}
      />

      <Textarea
        label="Sede operativa"
        value={pos.nostraDitta.sedeOperativa}
        onChange={(v) => updateNostraDitta("sedeOperativa", v)}
      />

      <Input
        label="Datore di lavoro"
        value={pos.nostraDitta.datoreLavoro}
        onChange={(v) => updateNostraDitta("datoreLavoro", v)}
      />

      <Input
        label="Referente appalto / preposto"
        value={pos.nostraDitta.referenteAppalto}
        onChange={(v) => updateNostraDitta("referenteAppalto", v)}
      />

      <Input
        label="RSPP"
        value={pos.nostraDitta.rspp}
        onChange={(v) => updateNostraDitta("rspp", v)}
      />

      <Input
        label="Medico del lavoro"
        value={pos.nostraDitta.medicoLavoro}
        onChange={(v) => updateNostraDitta("medicoLavoro", v)}
      />

      <Textarea
        label="RLS"
        value={pos.nostraDitta.rls}
        onChange={(v) => updateNostraDitta("rls", v)}
      />

      <SectionTitle>0.9 Durata cantiere</SectionTitle>

      <Input
        label="Periodo da"
        value={pos.durataCantiere.periodoDa}
        type="date"
        onChange={(v) => updateDurata("periodoDa", v)}
      />

      <Input
        label="Periodo a"
        value={pos.durataCantiere.periodoA}
        type="date"
        onChange={(v) => updateDurata("periodoA", v)}
      />

      <Input
        label="Mattino da"
        value={pos.durataCantiere.mattinoDa}
        type="time"
        onChange={(v) => updateDurata("mattinoDa", v)}
      />

      <Input
        label="Mattino a"
        value={pos.durataCantiere.mattinoA}
        type="time"
        onChange={(v) => updateDurata("mattinoA", v)}
      />

      <Input
        label="Pomeriggio da"
        value={pos.durataCantiere.pomeriggioDa}
        type="time"
        onChange={(v) => updateDurata("pomeriggioDa", v)}
      />

      <Input
        label="Pomeriggio a"
        value={pos.durataCantiere.pomeriggioA}
        type="time"
        onChange={(v) => updateDurata("pomeriggioA", v)}
      />

      <Checkbox
        label="Orario continuato"
        checked={pos.durataCantiere.orarioContinuato}
        onChange={(v) => updateDurata("orarioContinuato", v)}
      />

      <Textarea
        label="Note orario"
        value={pos.durataCantiere.note}
        onChange={(v) => updateDurata("note", v)}
      />
    </>
  )
}