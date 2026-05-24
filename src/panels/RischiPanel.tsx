import React from "react"
import type { PosData } from "../types/pos"
import type { Attrezzatura } from "../types/pos"

import Checkbox from "../components/form/Checkbox"
import Input from "../components/form/Input"
import Select from "../components/form/Select"
import SectionTitle from "../components/form/SectionTitle"

type Props = {
  pos: PosData
  setPos: React.Dispatch<React.SetStateAction<PosData>>
}

const opzioniPxD = [1, 2, 3, 4].map((n) => ({ value: String(n), label: String(n) }))

function livelloPxD(p: number, d: number): string {
  const r = p * d
  if (r >= 9) return "RISCHIO ALTO"
  if (r >= 4) return "RISCHIO MEDIO"
  return "RISCHIO BASSO"
}

function RisultanteBox({ p, d }: { p: number; d: number }) {
  const livello = livelloPxD(p, d)
  const color = livello === "RISCHIO ALTO" ? "bg-red-100 border-red-400" : livello === "RISCHIO MEDIO" ? "bg-yellow-100 border-yellow-400" : "bg-green-100 border-green-400"
  return (
    <div className={`border rounded p-3 mt-3 font-bold text-sm ${color}`}>
      RISULTATO: {livello} — P({p}) × D({d}) = {p * d}
    </div>
  )
}

export default function RischiPanel({ pos, setPos }: Props) {
  // ── CHIMICO ──────────────────────────────────────────────
  const rc = pos.rischioChimico
  function updateChimico(field: string, value: boolean | number) {
    setPos({ ...pos, rischioChimico: { ...rc, [field]: value } })
  }
  function updateSostanza(index: number, field: string, value: boolean | string) {
    setPos({ ...pos, rischioChimico: { ...rc, sostanze: rc.sostanze.map((s, i) => i === index ? { ...s, [field]: value } : s) } })
  }
  function addSostanza() {
    setPos({ ...pos, rischioChimico: { ...rc, sostanze: [...rc.sostanze, { id: `sostanza-${Date.now()}`, presente: false, nome: "", utilizzo: "", schedaSicurezzaAllegata: false }] } })
  }
  function removeSostanza(index: number) {
    setPos({ ...pos, rischioChimico: { ...rc, sostanze: rc.sostanze.filter((_, i) => i !== index) } })
  }

  // ── INCENDIO ─────────────────────────────────────────────
  const ri = pos.rischioIncendio
  function updateIncendio(field: string, value: boolean | number) {
    setPos({ ...pos, rischioIncendio: { ...ri, [field]: value } })
  }

  // ── RUMORE ───────────────────────────────────────────────
  const rr = pos.rischioRumore
  function updateRumore(field: string, value: boolean | string) {
    setPos({ ...pos, rischioRumore: { ...rr, [field]: value } })
  }

  // ── VIBRAZIONI ───────────────────────────────────────────
  const rv = pos.rischioVibrazioni
  function updateVibrazioni(field: string, value: boolean | string) {
    setPos({ ...pos, rischioVibrazioni: { ...rv, [field]: value } })
  }

  // ── MACCHINE ─────────────────────────────────────────────
  const rm = pos.rischioMacchine
  function updateMacchine(field: string, value: boolean | number) {
    setPos({ ...pos, rischioMacchine: { ...rm, [field]: value } })
  }
  function updateAttrezzatura(index: number, field: keyof Attrezzatura, value: boolean | string) {
    setPos({ ...pos, rischioMacchine: { ...rm, attrezzature: rm.attrezzature.map((a, i) => i === index ? { ...a, [field]: value } : a) } })
  }
  function addAttrezzatura() {
    setPos({ ...pos, rischioMacchine: { ...rm, attrezzature: [...rm.attrezzature, { id: `attr-${Date.now()}`, tipologia: "", fase: "", libroMacchina: false }] } })
  }
  function removeAttrezzatura(index: number) {
    setPos({ ...pos, rischioMacchine: { ...rm, attrezzature: rm.attrezzature.filter((_, i) => i !== index) } })
  }

  // ── MMC ──────────────────────────────────────────────────
  const rmmc = pos.rischioMMC
  function updateMMC(field: string, value: boolean | number) {
    setPos({ ...pos, rischioMMC: { ...rmmc, [field]: value } })
  }

  // ── ELETTRICO ────────────────────────────────────────────
  const re = pos.rischioElettrico
  function updateElettrico(field: string, value: boolean | number) {
    setPos({ ...pos, rischioElettrico: { ...re, [field]: value } })
  }

  // ── ALTURA ───────────────────────────────────────────────
  const ra = pos.rischioAltura
  function updateAltura(field: string, value: boolean | number) {
    setPos({ ...pos, rischioAltura: { ...ra, [field]: value } })
  }

  return (
    <>
      {/* ── §3.3 CHIMICO ── */}
      <SectionTitle>3.3 Rischio chimico</SectionTitle>
      <Checkbox label="Rischio chimico presente" checked={rc.presente} onChange={(v) => updateChimico("presente", v)} />
      {rc.presente && (
        <>
          <SectionTitle>Sorgenti del pericolo</SectionTitle>
          <Checkbox label="Possibili interferenze" checked={rc.possibiliInterferenze} onChange={(v) => updateChimico("possibiliInterferenze", v)} />
          <Checkbox label="Sostanze chimiche" checked={rc.sostanzeChimiche} onChange={(v) => updateChimico("sostanzeChimiche", v)} />
          <Checkbox label="Polveri" checked={rc.polveri} onChange={(v) => updateChimico("polveri", v)} />
          <Checkbox label="Fumi" checked={rc.fumi} onChange={(v) => updateChimico("fumi", v)} />
          <SectionTitle>Sostanze chimiche</SectionTitle>
          {rc.sostanze.map((s, i) => (
            <div key={s.id} className="border rounded p-3 mb-3 bg-gray-50">
              <Checkbox label="Presente in cantiere" checked={s.presente} onChange={(v) => updateSostanza(i, "presente", v)} />
              <Input label="Sostanza / miscela" value={s.nome} onChange={(v) => updateSostanza(i, "nome", v)} />
              <Input label="Utilizzo" value={s.utilizzo} onChange={(v) => updateSostanza(i, "utilizzo", v)} />
              <Checkbox label="Scheda sicurezza allegata" checked={s.schedaSicurezzaAllegata} onChange={(v) => updateSostanza(i, "schedaSicurezzaAllegata", v)} />
              <button type="button" className="text-red-600 text-sm font-semibold mt-1" onClick={() => removeSostanza(i)}>Rimuovi</button>
            </div>
          ))}
          <button type="button" className="bg-slate-700 text-white px-3 py-1 rounded text-sm mb-4" onClick={addSostanza}>+ Aggiungi sostanza</button>
          <SectionTitle>Matrice PxD</SectionTitle>
          <Select label="Probabilità (P)" value={String(rc.probabilita)} onChange={(v) => updateChimico("probabilita", Number(v))} options={opzioniPxD} />
          <Select label="Danno (D)" value={String(rc.danno)} onChange={(v) => updateChimico("danno", Number(v))} options={opzioniPxD} />
          <RisultanteBox p={rc.probabilita} d={rc.danno} />
        </>
      )}

      {/* ── §3.4 INCENDIO ── */}
      <SectionTitle>3.4 Rischio incendio</SectionTitle>
      <Checkbox label="Rischio incendio presente" checked={ri.presente} onChange={(v) => updateIncendio("presente", v)} />
      {ri.presente && (
        <>
          <Checkbox label="Materiale combustibile" checked={ri.materialeCombustibile} onChange={(v) => updateIncendio("materialeCombustibile", v)} />
          <Checkbox label="Sostanze infiammabili" checked={ri.sostanzeInfiammabili} onChange={(v) => updateIncendio("sostanzeInfiammabili", v)} />
          <Checkbox label="Impianti elettrico/termico" checked={ri.impiantiElettricoTermico} onChange={(v) => updateIncendio("impiantiElettricoTermico", v)} />
          <SectionTitle>Matrice PxD</SectionTitle>
          <Select label="Probabilità (P)" value={String(ri.probabilita)} onChange={(v) => updateIncendio("probabilita", Number(v))} options={opzioniPxD} />
          <Select label="Danno (D)" value={String(ri.danno)} onChange={(v) => updateIncendio("danno", Number(v))} options={opzioniPxD} />
          <RisultanteBox p={ri.probabilita} d={ri.danno} />
        </>
      )}

      {/* ── §3.5 RUMORE ── */}
      <SectionTitle>3.5 Rischio rumore</SectionTitle>
      <Checkbox label="Rischio rumore presente" checked={rr.presente} onChange={(v) => updateRumore("presente", v)} />
      {rr.presente && (
        <>
          <Checkbox label="Attrezzature rumorose" checked={rr.attrezzatureRumorose} onChange={(v) => updateRumore("attrezzatureRumorose", v)} />
          <Checkbox label="Lavorazioni meccaniche" checked={rr.lavorazioniMeccaniche} onChange={(v) => updateRumore("lavorazioniMeccaniche", v)} />
          <Select
            label="Livello di esposizione"
            value={rr.livello}
            onChange={(v) => updateRumore("livello", v)}
            options={[
              { value: "INFERIORE_80", label: "< 80 dB(A) — Rischio basso" },
              { value: "TRA_80_85", label: "80–85 dB(A) — Rischio medio" },
              { value: "SUPERIORE_85", label: "> 85 dB(A) — Rischio alto" },
            ]}
          />
        </>
      )}

      {/* ── §3.6 VIBRAZIONI ── */}
      <SectionTitle>3.6 Rischio vibrazioni</SectionTitle>
      <Checkbox label="Rischio vibrazioni presente" checked={rv.presente} onChange={(v) => updateVibrazioni("presente", v)} />
      {rv.presente && (
        <>
          <Checkbox label="Uso attrezzature manuali vibranti" checked={rv.usoAttrezzatureManuali} onChange={(v) => updateVibrazioni("usoAttrezzatureManuali", v)} />
          <Checkbox label="Guida mezzi da cantiere" checked={rv.guidaMezziCantiere} onChange={(v) => updateVibrazioni("guidaMezziCantiere", v)} />
          <Select
            label="Livello di esposizione"
            value={rv.livello}
            onChange={(v) => updateVibrazioni("livello", v)}
            options={[
              { value: "INFERIORE_2_5", label: "< 2,5 m/s² — Rischio basso" },
              { value: "TRA_2_5_5", label: "2,5–5 m/s² — Rischio medio" },
              { value: "SUPERIORE_5", label: "> 5 m/s² — Rischio alto" },
            ]}
          />
        </>
      )}

      {/* ── §4.7 MACCHINE ── */}
      <SectionTitle>4.7 Rischio macchine e attrezzature</SectionTitle>
      <Checkbox label="Rischio macchine presente" checked={rm.presente} onChange={(v) => updateMacchine("presente", v)} />
      {rm.presente && (
        <>
          <Checkbox label="Organi in movimento" checked={rm.organiInMovimento} onChange={(v) => updateMacchine("organiInMovimento", v)} />
          <Checkbox label="Proiezione di materiali" checked={rm.proiezioneMaterie} onChange={(v) => updateMacchine("proiezioneMaterie", v)} />
          <Checkbox label="Superfici taglienti" checked={rm.superficiTaglienti} onChange={(v) => updateMacchine("superficiTaglienti", v)} />
          <SectionTitle>Attrezzature</SectionTitle>
          {rm.attrezzature.map((a, i) => (
            <div key={a.id} className="border rounded p-3 mb-3 bg-gray-50">
              <Input label="Tipologia" value={a.tipologia} onChange={(v) => updateAttrezzatura(i, "tipologia", v)} />
              <Input label="Fase lavorativa" value={a.fase} onChange={(v) => updateAttrezzatura(i, "fase", v)} />
              <Checkbox label="Libro macchina presente" checked={a.libroMacchina} onChange={(v) => updateAttrezzatura(i, "libroMacchina", v)} />
              <button type="button" className="text-red-600 text-sm font-semibold mt-1" onClick={() => removeAttrezzatura(i)}>Rimuovi</button>
            </div>
          ))}
          <button type="button" className="bg-slate-700 text-white px-3 py-1 rounded text-sm mb-4" onClick={addAttrezzatura}>+ Aggiungi attrezzatura</button>
          <SectionTitle>Matrice PxD</SectionTitle>
          <Select label="Probabilità (P)" value={String(rm.probabilita)} onChange={(v) => updateMacchine("probabilita", Number(v))} options={opzioniPxD} />
          <Select label="Danno (D)" value={String(rm.danno)} onChange={(v) => updateMacchine("danno", Number(v))} options={opzioniPxD} />
          <RisultanteBox p={rm.probabilita} d={rm.danno} />
        </>
      )}

      {/* ── §4.8 MMC ── */}
      <SectionTitle>4.8 Movimentazione manuale carichi (MMC)</SectionTitle>
      <Checkbox label="Rischio MMC presente" checked={rmmc.presente} onChange={(v) => updateMMC("presente", v)} />
      {rmmc.presente && (
        <>
          <Checkbox label="Movimentazione manuale carichi" checked={rmmc.movimentazioneManuale} onChange={(v) => updateMMC("movimentazioneManuale", v)} />
          <Checkbox label="Posture incongrue" checked={rmmc.postureIncongrue} onChange={(v) => updateMMC("postureIncongrue", v)} />
          <Checkbox label="Movimenti ripetitivi" checked={rmmc.movimentiRepetitivi} onChange={(v) => updateMMC("movimentiRepetitivi", v)} />
          <SectionTitle>Matrice PxD</SectionTitle>
          <Select label="Probabilità (P)" value={String(rmmc.probabilita)} onChange={(v) => updateMMC("probabilita", Number(v))} options={opzioniPxD} />
          <Select label="Danno (D)" value={String(rmmc.danno)} onChange={(v) => updateMMC("danno", Number(v))} options={opzioniPxD} />
          <RisultanteBox p={rmmc.probabilita} d={rmmc.danno} />
        </>
      )}

      {/* ── §4.9 ELETTRICO ── */}
      <SectionTitle>4.9 Rischio elettrico</SectionTitle>
      <Checkbox label="Rischio elettrico presente" checked={re.presente} onChange={(v) => updateElettrico("presente", v)} />
      {re.presente && (
        <>
          <Checkbox label="Contatto diretto" checked={re.contattoDiretto} onChange={(v) => updateElettrico("contattoDiretto", v)} />
          <Checkbox label="Contatto indiretto" checked={re.contattoIndiretto} onChange={(v) => updateElettrico("contattoIndiretto", v)} />
          <Checkbox label="Uso attrezzature elettriche" checked={re.usoAttrezzatureElettriche} onChange={(v) => updateElettrico("usoAttrezzatureElettriche", v)} />
          <SectionTitle>Matrice PxD</SectionTitle>
          <Select label="Probabilità (P)" value={String(re.probabilita)} onChange={(v) => updateElettrico("probabilita", Number(v))} options={opzioniPxD} />
          <Select label="Danno (D)" value={String(re.danno)} onChange={(v) => updateElettrico("danno", Number(v))} options={opzioniPxD} />
          <RisultanteBox p={re.probabilita} d={re.danno} />
        </>
      )}

      {/* ── §4.10 ALTURA ── */}
      <SectionTitle>4.10 Rischio cadute dall'alto</SectionTitle>
      <Checkbox label="Rischio cadute dall'alto presente" checked={ra.presente} onChange={(v) => updateAltura("presente", v)} />
      {ra.presente && (
        <>
          <Checkbox label="Lavoro in quota (> 2 m)" checked={ra.lavoroInQuota} onChange={(v) => updateAltura("lavoroInQuota", v)} />
          <Checkbox label="Uso PLE / Piattaforme elevabili" checked={ra.usoPle} onChange={(v) => updateAltura("usoPle", v)} />
          <Checkbox label="Uso impalcature/ponteggi" checked={ra.usoImpalcature} onChange={(v) => updateAltura("usoImpalcature", v)} />
          <SectionTitle>Matrice PxD</SectionTitle>
          <Select label="Probabilità (P)" value={String(ra.probabilita)} onChange={(v) => updateAltura("probabilita", Number(v))} options={opzioniPxD} />
          <Select label="Danno (D)" value={String(ra.danno)} onChange={(v) => updateAltura("danno", Number(v))} options={opzioniPxD} />
          <RisultanteBox p={ra.probabilita} d={ra.danno} />
        </>
      )}
    </>
  )
}
