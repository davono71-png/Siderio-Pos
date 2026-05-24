import React from "react"
import type { PosData } from "../types/pos"

import Checkbox from "../components/form/Checkbox"
import Input from "../components/form/Input"
import Select from "../components/form/Select"
import SectionTitle from "../components/form/SectionTitle"
import StaticText from "../components/form/StaticText"

type Props = {
  pos: PosData
  setPos: React.Dispatch<React.SetStateAction<PosData>>
}

export default function RischiPanel({ pos, setPos }: Props) {
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

  function update(field: string, value: boolean | number) {
    setPos({
      ...pos,
      rischioChimico: {
        ...rischioChimico,
        [field]: value,
      },
    })
  }

  function updateSostanza(
    index: number,
    field: "presente" | "nome" | "utilizzo",
    value: boolean | string
  ) {
    setPos({
      ...pos,
      rischioChimico: {
        ...rischioChimico,
        sostanze: rischioChimico.sostanze.map((s, i) =>
          i === index ? { ...s, [field]: value } : s
        ),
      },
    })
  }

  function addSostanza() {
    setPos({
      ...pos,
      rischioChimico: {
        ...rischioChimico,
        sostanze: [
          ...rischioChimico.sostanze,
          {
            id: `sostanza-${Date.now()}`,
            presente: false,
            nome: "",
            utilizzo: "",
            
          },
        ],
      },
    })
  }

  function removeSostanza(index: number) {
    setPos({
      ...pos,
      rischioChimico: {
        ...rischioChimico,
        sostanze: rischioChimico.sostanze.filter((_, i) => i !== index),
      },
    })
  }

  const risultato = rischioChimico.probabilita * rischioChimico.danno

  let livello = "RISCHIO BASSO"
  if (risultato >= 4 && risultato <= 8) livello = "RISCHIO MEDIO"
  if (risultato >= 9) livello = "RISCHIO ALTO"

  return (
    <>
      <SectionTitle>3.3 Rischio chimico</SectionTitle>
      <StaticText title="Testo standard POS">
  La valutazione del rischio è eseguita applicando la
  matrice PxD sulla base dei valori che vanno da 1 a 4
  sia per la matrice P, sia per la matrice D ove i valori
  sono crescenti in base al rischio presente e individuabile.

  Valori con risultante da 1 a 3 sono considerati RISCHIO BASSO.
  Valori con risultante da 4 a 8 sono considerati RISCHIO MEDIO.
  Valori con risultante da 9 a 12 sono considerati RISCHIO ALTO.

  In tutti i casi sono implementate azioni di prevenzione
  e protezione. Per altre valutazioni i riferimenti sono
  determinati dalle valutazioni specifiche presenti nel DVR aziendale.
</StaticText>

      <Checkbox
        label="Rischio chimico presente"
        checked={rischioChimico.presente}
        onChange={(v) => update("presente", v)}
      />

      {rischioChimico.presente && (
        <>
          <SectionTitle>Sorgenti del pericolo</SectionTitle>

          <Checkbox
            label="Possibili interferenze"
            checked={rischioChimico.possibiliInterferenze}
            onChange={(v) => update("possibiliInterferenze", v)}
          />

          <Checkbox
            label="Sostanze chimiche"
            checked={rischioChimico.sostanzeChimiche}
            onChange={(v) => update("sostanzeChimiche", v)}
          />

          <Checkbox
            label="Polveri"
            checked={rischioChimico.polveri}
            onChange={(v) => update("polveri", v)}
          />

          <Checkbox
            label="Fumi"
            checked={rischioChimico.fumi}
            onChange={(v) => update("fumi", v)}
          />

          <SectionTitle>Elenco sostanze chimiche</SectionTitle>

          {rischioChimico.sostanze.map((s, index) => (
            <div key={s.id} className="border rounded p-3 mb-4 bg-gray-50">
              <Checkbox
                label="Presenza"
                checked={s.presente}
                onChange={(v) => updateSostanza(index, "presente", v)}
              />

              <Input
                label="Sostanza o miscela"
                value={s.nome}
                onChange={(v) => updateSostanza(index, "nome", v)}
              />

              <Input
                label="Utilizzo"
                value={s.utilizzo}
                onChange={(v) => updateSostanza(index, "utilizzo", v)}
              />

              

              <button
                type="button"
                className="text-red-600 text-sm font-semibold"
                onClick={() => removeSostanza(index)}
              >
                Rimuovi sostanza
              </button>
            </div>
          ))}

          <button
            type="button"
            className="bg-slate-800 text-white px-4 py-2 rounded mb-8"
            onClick={addSostanza}
          >
            + Aggiungi sostanza
          </button>

          <SectionTitle>Valutazione matrice PxD</SectionTitle>

          <Select
            label="Probabilità (P)"
            value={String(rischioChimico.probabilita)}
            onChange={(v) => update("probabilita", Number(v))}
            options={[1, 2, 3, 4].map((n) => ({
              value: String(n),
              label: String(n),
            }))}
          />

          <Select
            label="Danno (D)"
            value={String(rischioChimico.danno)}
            onChange={(v) => update("danno", Number(v))}
            options={[1, 2, 3, 4].map((n) => ({
              value: String(n),
              label: String(n),
            }))}
          />

          <div className="border rounded p-4 bg-yellow-50 mt-4 font-bold">
            RISULTATO VALUTAZIONE: {livello} — P x D = {risultato}
          </div>
        </>
      )}
    </>
  )
}