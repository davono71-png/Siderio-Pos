import React from "react"
import type { PosData } from "../types/pos"
import { persone, ruoliEmergenza } from "../data/personale"

import Checkbox from "../components/form/Checkbox"
import Select from "../components/form/Select"
import SectionTitle from "../components/form/SectionTitle"
import StaticText from "../components/form/StaticText"

type Props = {
  pos: PosData
  setPos: React.Dispatch<React.SetStateAction<PosData>>
}

export default function EmergenzePscPanel({ pos, setPos }: Props) {
  function addAddetto() {
    setPos({
      ...pos,
      addettiEmergenza: [
        ...pos.addettiEmergenza,
        { personaId: persone[0].id, ruoloEmergenza: ruoliEmergenza[0] },
      ],
    })
  }

  function removeAddetto(index: number) {
    setPos({
      ...pos,
      addettiEmergenza: pos.addettiEmergenza.filter((_, i) => i !== index),
    })
  }

  function updateAddetto(index: number, field: "personaId" | "ruoloEmergenza", value: string) {
    setPos({
      ...pos,
      addettiEmergenza: pos.addettiEmergenza.map((a, i) =>
        i === index ? { ...a, [field]: value } : a
      ),
    })
  }

  return (
    <>
      {/* PSC */}
      <SectionTitle>Coordinamento PSC</SectionTitle>
      <Checkbox
        label="PSC richiesto per questo cantiere"
        checked={pos.pscRichiesto}
        onChange={(v) => setPos({ ...pos, pscRichiesto: v })}
      />
      <StaticText title="Contenuto capitolo PSC">
        Il capitolo PSC contiene testo prevalentemente fisso con le disposizioni
        standard di coordinamento (accesso fornitori, pulizia, DPI, sorveglianza
        sanitaria, sospensione lavorazioni, ruoli). Verrà stampato automaticamente
        nel documento completo.
      </StaticText>

      {/* ADDETTI EMERGENZA */}
      <SectionTitle>Addetti alle emergenze</SectionTitle>
      <StaticText title="Procedure E01–E07">
        Le procedure di emergenza (E01 Comunicazione incendio, E02 Comportamento,
        E03 Evacuazione, E04 Primo intervento, E05 Infortunio, E06 Evacuazione
        squadra, E07 Chiamata soccorsi) sono testo fisso e vengono stampate
        automaticamente.
      </StaticText>

      {pos.addettiEmergenza.map((addetto, i) => (
        <div key={i} className="border rounded p-3 mb-3 bg-gray-50">
          <Select
            label="Nominativo"
            value={addetto.personaId}
            onChange={(v) => updateAddetto(i, "personaId", v)}
            options={persone.map((p) => ({ value: p.id, label: p.nomeCompleto }))}
          />
          <Select
            label="Ruolo emergenza"
            value={addetto.ruoloEmergenza}
            onChange={(v) => updateAddetto(i, "ruoloEmergenza", v)}
            options={ruoliEmergenza.map((r) => ({ value: r, label: r }))}
          />
          <button
            type="button"
            className="text-red-600 text-sm font-semibold mt-1"
            onClick={() => removeAddetto(i)}
          >
            Rimuovi
          </button>
        </div>
      ))}

      <button
        type="button"
        className="bg-slate-700 text-white px-3 py-1 rounded text-sm"
        onClick={addAddetto}
      >
        + Aggiungi addetto emergenza
      </button>
    </>
  )
}
