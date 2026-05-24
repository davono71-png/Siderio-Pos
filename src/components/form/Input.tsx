type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  disabled?: boolean
}

export default function Input({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>

      <input
        type={type}
        disabled={disabled}
        className={`w-full border rounded p-2 ${
          disabled ? "bg-gray-100 text-gray-600" : ""
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}