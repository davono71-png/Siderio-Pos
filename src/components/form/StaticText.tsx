type Props = {
  title?: string
  children: React.ReactNode
}

export default function StaticText({
  title,
  children,
}: Props) {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded p-4 mb-5">
      {title && (
        <div className="text-xs uppercase tracking-wide text-gray-500 font-bold mb-2">
          {title}
        </div>
      )}

      <div className="text-[13px] leading-relaxed text-gray-700 whitespace-pre-line">
        {children}
      </div>
    </div>
  )
}