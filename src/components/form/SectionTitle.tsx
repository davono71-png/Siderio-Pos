type Props = {
  children: React.ReactNode
  icon?: React.ReactNode
}

export default function SectionTitle({ children, icon }: Props) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '11px 16px', cursor: 'pointer',
      borderBottom: '1px solid #EDE9FE',
      background: 'white',
    }}>
      {icon && (
        <div style={{
          width: 28, height: 28, borderRadius: 7,
          background: '#EDE9FE', border: '1px solid #C4B5FD',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0
        }}>
          {icon}
        </div>
      )}
      <h2 style={{
        fontSize: 13, fontWeight: 700, color: '#5B21B6',
        margin: 0, flex: 1,
      }}>
        {children}
      </h2>
    </div>
  )
}
