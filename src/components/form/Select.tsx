type Option = {
  value: string
  label: string
}

type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  options: Option[]
}

export default function Select({ label, value, onChange, options }: Props) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>

      <select
        className="w-full border rounded p-2 bg-white"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}