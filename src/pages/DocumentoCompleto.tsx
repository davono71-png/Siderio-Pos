import Frontespizio from "./Frontespizio"
import Sommario from "./Sommario"
import Capitolo0Cantiere from "./Capitolo0Cantiere"
import Capitolo1Personale from "./Capitolo1Personale"
import Capitolo2Opere from "./Capitolo2Opere"
import type { PosData } from "../types/pos"
import Capitolo3Rischi from "./Capitolo3Rischi"

type Props = {
  pos: PosData
}

export default function DocumentoCompleto({ pos }: Props) {
  return (
    <div className="documento-completo">
      <Frontespizio pos={pos} />
      <Sommario />
      <Capitolo0Cantiere pos={pos} />
      <Capitolo1Personale pos={pos} />
      <Capitolo2Opere pos={pos} />
      <Capitolo3Rischi pos={pos} />
    </div>
  )
}