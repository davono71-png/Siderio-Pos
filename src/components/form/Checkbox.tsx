type Props = {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

export default function Checkbox({ label, checked, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 mb-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />

      <span>{label}</span>
    </label>
  )
}