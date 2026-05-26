type Props = {
  label: string
  value: string
  onChange: (value: string) => void
}

export default function Textarea({ label, value, onChange }: Props) {
  return (
    <div style={{ marginBottom: 10 }}>
      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, color: '#6B7280', marginBottom: 4 }}>
        {label}
      </label>
      <textarea
        style={{
          width: '100%', padding: '7px 10px',
          border: '1.5px solid #E5E7EB', borderRadius: 8,
          fontSize: 12, color: '#1E1B2E', background: 'white',
          outline: 'none', resize: 'vertical', minHeight: 80,
          fontFamily: 'inherit', boxSizing: 'border-box' as const,
        }}
        onFocus={e => e.target.style.borderColor = '#7C3AED'}
        onBlur={e => e.target.style.borderColor = '#E5E7EB'}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    </div>
  )
}
