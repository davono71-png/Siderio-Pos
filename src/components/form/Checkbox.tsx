type Props = {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

export default function Checkbox({ label, checked, onChange }: Props) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', fontSize: 12, color: '#1E1B2E' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        style={{ width: 15, height: 15, accentColor: '#7C3AED', cursor: 'pointer' }}
      />
      <span>{label}</span>
    </label>
  )
}
