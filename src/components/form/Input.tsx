type Props = {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  disabled?: boolean
}

export default function Input({ label, value, onChange, type = "text", disabled = false }: Props) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>
        {label}
      </label>
      <input
        type={type}
        disabled={disabled}
        style={{
          width: '100%', padding: '7px 10px',
          border: '1.5px solid #E5E7EB', borderRadius: 8,
          fontSize: 12, color: '#1E1B2E', background: disabled ? '#F9FAFB' : 'white',
          outline: 'none', boxSizing: 'border-box' as const,
          opacity: disabled ? 0.7 : 1,
        }}
        onFocus={e => e.target.style.borderColor = '#7C3AED'}
        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
