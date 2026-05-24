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

/*
  Mappa pagine (da aggiornare se si cambiano i contenuti):
  Pag 1  → Frontespizio
  Pag 2  → Sommario
  Pag 3  → Cap0 pagina1 (0.1–0.4)
  Pag 4  → Cap0 pagina2 (0.5–0.6)
  Pag 5  → Cap0 pagina3 (0.7–0.9)
  Pag 6  → Cap1 pagina1 (1.1–1.3)
  Pag 7  → Cap1 pagina2 (1.4 DPI)
  Pag 8  → Cap2 (Opere)
  Pag 9  → Cap3 pagina1 (3.1–3.4)
  Pag 10 → Cap3 pagina2 (3.5–4.8)
  Pag 11 → Cap3 pagina3 (4.9–4.10)
  Pag 12 → Cap4 (Emergenze)
  Pag 13 → Cap5 (PSC pag1)
  Pag 14 → Cap5 (PSC pag2)
*/

export default function DocumentoCompleto({ pos }: Props) {
  return (
    <div className="documento-completo">
      <Frontespizio pos={pos} pageNumber={1} />
      <Sommario     pos={pos} pageNumber={2} />
      <Capitolo0Cantiere  pos={pos} pageNumber={3} />
      <Capitolo1Personale pos={pos} pageNumber={6} />
      <Capitolo2Opere     pos={pos} pageNumber={8} />
      <Capitolo3Rischi    pos={pos} pageNumber={9} />
      <Capitolo4Emergenze pos={pos} pageNumber={12} />
      <Capitolo5Psc       pos={pos} pageNumber={13} />
    </div>
  )
}
