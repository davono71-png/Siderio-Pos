import Page from "../components/Page"

export default function Sommario() {
  return (
    <Page>
      <h1 className="text-2xl font-bold text-center mb-10">
        SOMMARIO
      </h1>

      <div className="space-y-3 text-[14px]">
        <Row
          title="0. IL CANTIERE"
          page="3"
        />

        <Row
          title="1. PERSONALE IN CANTIERE"
          page="8"
        />

        <Row
          title="2. OPERE"
          page="12"
        />

        <Row
          title="3. RISCHI SPECIFICI INTRODOTTI IN CANTIERE"
          page="18"
        />

        <Row
          title="4. PROCEDURE IN CASO DI EMERGENZA"
          page="24"
        />

        <Row
          title="5. PROCEDURE RICHIESTE DA PSC"
          page="27"
        />
      </div>
    </Page>
  )
}

function Row({
  title,
  page,
}: {
  title: string
  page: string
}) {
  return (
    <div className="flex items-end gap-2">
      <span>{title}</span>

      <div className="flex-1 border-b border-dotted border-black mb-1" />

      <span>{page}</span>
    </div>
  )
}