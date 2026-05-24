import { useState } from "react"
import DocumentoCompleto from "./pages/DocumentoCompleto"

import Frontespizio from "./pages/Frontespizio"
import Capitolo0Cantiere from "./pages/Capitolo0Cantiere"
import Capitolo1Personale from "./pages/Capitolo1Personale"
import Capitolo2Opere from "./pages/Capitolo2Opere"
import Capitolo3Rischi from "./pages/Capitolo3Rischi"
import Capitolo4Emergenze from "./pages/Capitolo4Emergenze"
import Capitolo5Psc from "./pages/Capitolo5Psc"

import CantierePanel from "./panels/CantierePanel"
import PersonalePanel from "./panels/PersonalePanel"
import OperePanel from "./panels/OperePanel"
import RischiPanel from "./panels/RischiPanel"
import EmergenzePscPanel from "./panels/EmergenzePscPanel"

import InfoBox from "./components/form/InfoBox"

import { initialPosData } from "./data/initialPosData"
import type { PosData } from "./types/pos"

type Section =
  | "frontespizio"
  | "cantiere"
  | "personale"
  | "opere"
  | "rischi"
  | "emergenze"
  | "psc"
  | "preview"

export default function App() {
  const [section, setSection] = useState<Section>("frontespizio")
  const [pos, setPos] = useState<PosData>(initialPosData)

  return (
    <div className="min-h-screen bg-gray-300">
      <div className="no-print bg-slate-800 text-white p-4 flex gap-2 flex-wrap sticky top-0 z-50 shadow">
        <MenuButton active={section === "frontespizio"} onClick={() => setSection("frontespizio")}>Frontespizio</MenuButton>
        <MenuButton active={section === "cantiere"} onClick={() => setSection("cantiere")}>Il Cantiere</MenuButton>
        <MenuButton active={section === "personale"} onClick={() => setSection("personale")}>Personale</MenuButton>
        <MenuButton active={section === "opere"} onClick={() => setSection("opere")}>Le Opere</MenuButton>
        <MenuButton active={section === "rischi"} onClick={() => setSection("rischi")}>Rischi Specifici</MenuButton>
        <MenuButton active={section === "emergenze"} onClick={() => setSection("emergenze")}>Emergenze & PSC</MenuButton>
        <MenuButton active={section === "preview"} onClick={() => setSection("preview")}>Preview / PDF</MenuButton>
      </div>

      <div className="p-6">
        <div className={section === "preview" ? "mx-auto" : "max-w-[1400px] mx-auto grid grid-cols-[420px_1fr] gap-6"}>

          {section !== "preview" && (
            <div className="no-print bg-white rounded shadow p-5 h-fit sticky top-24 max-h-[calc(100vh-120px)] overflow-auto">
              <h1 className="text-2xl font-bold mb-6">Compilazione POS</h1>

              {section === "frontespizio" && (
                <InfoBox>Il frontespizio non si compila direttamente. Riprende automaticamente i dati inseriti nelle sezioni successive.</InfoBox>
              )}
              {section === "cantiere" && <CantierePanel pos={pos} setPos={setPos} />}
              {section === "personale" && <PersonalePanel pos={pos} setPos={setPos} />}
              {section === "opere" && <OperePanel pos={pos} setPos={setPos} />}
              {section === "rischi" && <RischiPanel pos={pos} setPos={setPos} />}
              {section === "emergenze" && <EmergenzePscPanel pos={pos} setPos={setPos} />}
            </div>
          )}

          {section === "preview" && (
            <div className="no-print bg-white rounded shadow p-5 mb-6 max-w-sm">
              <InfoBox>Anteprima completa del documento. Usa il pulsante sotto per stampare o salvare in PDF.</InfoBox>
              <button
                type="button"
                onClick={() => window.print()}
                className="mt-4 bg-slate-800 text-white px-4 py-2 rounded font-semibold"
              >
                Stampa / Salva PDF
              </button>
            </div>
          )}

          <div>
            {section === "frontespizio" && <Frontespizio pos={pos} />}
            {section === "cantiere" && <Capitolo0Cantiere pos={pos} />}
            {section === "personale" && <Capitolo1Personale pos={pos} />}
            {section === "opere" && <Capitolo2Opere pos={pos} />}
            {section === "rischi" && <Capitolo3Rischi pos={pos} />}
            {section === "emergenze" && (
              <>
                <Capitolo4Emergenze pos={pos} />
                <Capitolo5Psc pos={pos} />
              </>
            )}
            {section === "preview" && <DocumentoCompleto pos={pos} />}
          </div>
        </div>
      </div>
    </div>
  )
}

function MenuButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded text-sm font-semibold transition ${
        active ? "bg-white text-slate-900" : "bg-slate-700 hover:bg-slate-600"
      }`}
    >
      {children}
    </button>
  )
}
