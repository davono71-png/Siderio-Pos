type Props = {
  children: React.ReactNode
}

export default function InfoBox({ children }: Props) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-900 mt-4">
      {children}
    </div>
  )
}