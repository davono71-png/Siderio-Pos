type Props = {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function Textarea({ label, value, onChange }: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>

      <textarea
        className="w-full border rounded p-2 h-28"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}