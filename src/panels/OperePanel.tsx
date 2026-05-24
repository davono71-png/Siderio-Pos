import type { PosData } from "../types/pos"

import Input from "../components/form/Input"
import Textarea from "../components/form/Textarea"
import SectionTitle from "../components/form/SectionTitle"

type Props = {
  pos: PosData
  setPos: React.Dispatch<React.SetStateAction<PosData>>
}

export default function OperePanel({ pos, setPos }: Props) {
  function updateTempo(index: number, percentuale: number) {
    setPos({
      ...pos,
      tempiEsecuzione: pos.tempiEsecuzione.map((item, i) =>
        i === index ? { ...item, percentuale } : item
      ),
    })
  }

  function updateFase(
    index: number,
    field: "titolo" | "descrizione",
    value: string
  ) {
    setPos({
      ...pos,
      fasiOperative: pos.fasiOperative.map((fase, i) =>
        i === index ? { ...fase, [field]: value } : fase
      ),
    })
  }

  function addFase() {
    setPos({
      ...pos,
      fasiOperative: [
        ...pos.fasiOperative,
        {
          titolo: "",
          descrizione: "",
        },
      ],
    })
  }

  function removeFase(index: number) {
    setPos({
      ...pos,
      fasiOperative: pos.fasiOperative.filter((_, i) => i !== index),
    })
  }

  return (
    <>
      <SectionTitle>2.1 Tempi di esecuzione</SectionTitle>

      {pos.tempiEsecuzione.map((item, index) => (
        <Input
          key={item.attivita}
          label={`${item.attivita} (%)`}
          value={String(item.percentuale)}
          type="number"
          onChange={(v) => updateTempo(index, Number(v))}
        />
      ))}

      <SectionTitle>2.2 Operatività</SectionTitle>

      {pos.fasiOperative.map((fase, index) => (
        <div key={index} className="border rounded p-3 mb-4 bg-gray-50">
          <Input
            label={`Titolo fase ${index + 1}`}
            value={fase.titolo}
            onChange={(v) => updateFase(index, "titolo", v)}
          />

          <Textarea
            label={`Descrizione fase ${index + 1}`}
            value={fase.descrizione}
            onChange={(v) => updateFase(index, "descrizione", v)}
          />

          <button
            type="button"
            className="text-red-600 text-sm font-semibold"
            onClick={() => removeFase(index)}
          >
            Rimuovi fase
          </button>
        </div>
      ))}

      <button
        type="button"
        className="bg-slate-800 text-white px-4 py-2 rounded mb-8"
        onClick={addFase}
      >
        + Aggiungi fase
      </button>

      <SectionTitle>Analisi rischi specifici delle opere</SectionTitle>

      <Textarea
        label="Analisi rischi specifici"
        value={pos.analisiRischiSpecificiOpere}
        onChange={(v) =>
          setPos({
            ...pos,
            analisiRischiSpecificiOpere: v,
          })
        }
      />
    </>
  )
}