import type { PosData } from "../types/pos"
import type { FormazioneFlags } from "../data/personale"

import Input from "../components/form/Input"
import Select from "../components/form/Select"
import Checkbox from "../components/form/Checkbox"
import SectionTitle from "../components/form/SectionTitle"

import { persone, ruoliEmergenza } from "../data/personale"

type Props = {
  pos: PosData
  setPos: React.Dispatch<React.SetStateAction<PosData>>
}

const personeEmergenza = persone.filter((persona) =>
  ["fabio-andreatta", "tommaso-onofri", "fabrizio-delbarba"].includes(
    persona.id
  )
)

const formazioneCampi: {
  key: keyof FormazioneFlags
  label: string
}[] = [
  { key: "rsppDatoreLavoro", label: "RSPP datore di lavoro" },
  { key: "altoRischioGenerale", label: "Alto rischio generale" },
  {
    key: "specificaLavoratoriAltoRischio",
    label: "Specifica lavoratori alto rischio",
  },
  { key: "dpiTerzaCategoria", label: "DPI III cat." },
  { key: "abilitazionePle", label: "Abilitazione PLE" },
  { key: "primoSoccorso", label: "Addetto primo soccorso" },
  { key: "antincendioRischioMedio", label: "Addetto antincendio rischio medio" },
  { key: "preposto", label: "Preposto" },
]

export default function PersonalePanel({ pos, setPos }: Props) {
  function addPersonaleRow() {
    const persona = persone[0]

    setPos({
      ...pos,
      personaleCantiere: [
        ...pos.personaleCantiere,
        {
          personaId: persona.id,
          ruolo: persona.ruoliPossibili[0],
        },
      ],
    })
  }

  function updatePersonaleRow(
    index: number,
    field: "personaId" | "ruolo",
    value: string
  ) {
    const rows = [...pos.personaleCantiere]
    const current = rows[index]

    if (field === "personaId") {
      const persona = persone.find((p) => p.id === value)

      rows[index] = {
        personaId: value,
        ruolo: persona?.ruoliPossibili[0] || "",
      }
    } else {
      rows[index] = {
        ...current,
        ruolo: value,
      }
    }

    setPos({
      ...pos,
      personaleCantiere: rows,
    })
  }

  function removePersonaleRow(index: number) {
    setPos({
      ...pos,
      personaleCantiere: pos.personaleCantiere.filter((_, i) => i !== index),
    })
  }

  function addEmergenzaRow() {
    const persona = personeEmergenza[0]

    setPos({
      ...pos,
      addettiEmergenza: [
        ...pos.addettiEmergenza,
        {
          personaId: persona.id,
          ruoloEmergenza: ruoliEmergenza[0],
        },
      ],
    })
  }

  function updateEmergenzaRow(
    index: number,
    field: "personaId" | "ruoloEmergenza",
    value: string
  ) {
    const rows = [...pos.addettiEmergenza]

    rows[index] = {
      ...rows[index],
      [field]: value,
    }

    setPos({
      ...pos,
      addettiEmergenza: rows,
    })
  }

  function removeEmergenzaRow(index: number) {
    setPos({
      ...pos,
      addettiEmergenza: pos.addettiEmergenza.filter((_, i) => i !== index),
    })
  }

  function updateFormazione(
    personaId: string,
    field: keyof FormazioneFlags,
    value: boolean
  ) {
    const current =
      pos.formazionePersonale[personaId] ||
      persone.find((p) => p.id === personaId)?.formazioneDefault

    if (!current) return

    setPos({
      ...pos,
      formazionePersonale: {
        ...pos.formazionePersonale,
        [personaId]: {
          ...current,
          [field]: value,
        },
      },
    })
  }

  function updateDpi(id: string, value: boolean) {
    setPos({
      ...pos,
      dpiCantiere: pos.dpiCantiere.map((dpi) =>
        dpi.id === id ? { ...dpi, presente: value } : dpi
      ),
    })
  }

  return (
    <>
      <SectionTitle>1.1 Addetti in cantiere</SectionTitle>

      {pos.personaleCantiere.map((row, index) => {
        const persona = persone.find((p) => p.id === row.personaId)

        return (
          <div key={index} className="border rounded p-3 mb-4 bg-gray-50">
            <Select
              label="Nome e cognome"
              value={row.personaId}
              onChange={(v) => updatePersonaleRow(index, "personaId", v)}
              options={persone.map((p) => ({
                value: p.id,
                label: p.nome,
              }))}
            />

            <Input
              label="Funzione"
              value={persona?.funzione || ""}
              onChange={() => {}}
              disabled
            />

            <Select
              label="Ruolo"
              value={row.ruolo}
              onChange={(v) => updatePersonaleRow(index, "ruolo", v)}
              options={(persona?.ruoliPossibili || []).map((r) => ({
                value: r,
                label: r,
              }))}
            />

            <Input
              label="Qualifica / mansione"
              value={persona?.qualificaMansione || ""}
              onChange={() => {}}
              disabled
            />

            <button
              type="button"
              className="text-red-600 text-sm font-semibold"
              onClick={() => removePersonaleRow(index)}
            >
              Rimuovi riga
            </button>
          </div>
        )
      })}

      <button
        type="button"
        className="bg-slate-800 text-white px-4 py-2 rounded mb-8"
        onClick={addPersonaleRow}
      >
        + Aggiungi addetto
      </button>

      <SectionTitle>1.2 Addetti all’emergenza in cantiere</SectionTitle>

      {pos.addettiEmergenza.map((row, index) => {
        const persona = persone.find((p) => p.id === row.personaId)

        return (
          <div key={index} className="border rounded p-3 mb-4 bg-gray-50">
            <Select
              label="Nome e cognome"
              value={row.personaId}
              onChange={(v) => updateEmergenzaRow(index, "personaId", v)}
              options={personeEmergenza.map((p) => ({
                value: p.id,
                label: p.nome,
              }))}
            />

            <Input
              label="Funzione"
              value={persona?.funzione || ""}
              onChange={() => {}}
              disabled
            />

            <Select
              label="Ruolo emergenza"
              value={row.ruoloEmergenza}
              onChange={(v) => updateEmergenzaRow(index, "ruoloEmergenza", v)}
              options={ruoliEmergenza.map((r) => ({
                value: r,
                label: r,
              }))}
            />

            <button
              type="button"
              className="text-red-600 text-sm font-semibold"
              onClick={() => removeEmergenzaRow(index)}
            >
              Rimuovi riga
            </button>
          </div>
        )
      })}

      <button
        type="button"
        className="bg-slate-800 text-white px-4 py-2 rounded mb-8"
        onClick={addEmergenzaRow}
      >
        + Aggiungi addetto emergenza
      </button>

      <SectionTitle>1.3 Formazione del personale presente</SectionTitle>

      {pos.personaleCantiere.map((row) => {
        const persona = persone.find((p) => p.id === row.personaId)
        const formazione = pos.formazionePersonale[row.personaId]

        if (!persona || !formazione) return null

        return (
          <div key={row.personaId} className="border rounded p-3 mb-4 bg-gray-50">
            <h3 className="font-bold mb-3">{persona.nome}</h3>

            {formazioneCampi.map((campo) => (
              <Checkbox
                key={campo.key}
                label={campo.label}
                checked={formazione[campo.key]}
                onChange={(v) => updateFormazione(row.personaId, campo.key, v)}
              />
            ))}
          </div>
        )
      })}

      <SectionTitle>1.4 DPI in dotazione per il cantiere</SectionTitle>

      {pos.dpiCantiere.map((dpi) => (
        <Checkbox
          key={dpi.id}
          label={dpi.nome}
          checked={dpi.presente}
          onChange={(v) => updateDpi(dpi.id, v)}
        />
      ))}
    </>
  )
}