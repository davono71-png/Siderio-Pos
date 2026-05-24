import Frontespizio from "./Frontespizio"
import Sommario from "./Sommario"
import Capitolo0Cantiere from "./Capitolo0Cantiere"
import Capitolo1Personale from "./Capitolo1Personale"
import Capitolo2Opere from "./Capitolo2Opere"
import Capitolo3Rischi from "./Capitolo3Rischi"
import Capitolo4Emergenze from "./Capitolo4Emergenze"
import Capitolo5Psc from "./Capitolo5Psc"
import type { PosData } from "../types/pos"

type Props = { pos: PosData }

export default function DocumentoCompleto({ pos }: Props) {
  return (
    <div className="documento-completo">
      <Frontespizio pos={pos} pageNumber={1} />
      <Sommario pos={pos} pageNumber={2} />
      <Capitolo0Cantiere pos={pos} pageNumber={3} />
      <Capitolo1Personale pos={pos} pageNumber={8} />
      <Capitolo2Opere pos={pos} pageNumber={12} />
      <Capitolo3Rischi pos={pos} pageNumber={18} />
      <Capitolo4Emergenze pos={pos} pageNumber={24} />
      <Capitolo5Psc pos={pos} pageNumber={27} />
    </div>
  )
}
