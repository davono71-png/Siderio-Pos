type Props = {
  children: React.ReactNode
}

export default function SectionTitle({ children }: Props) {
  return (
    <h2 className="text-lg font-bold mt-8 mb-3 border-b pb-1">
      {children}
    </h2>
  )
}