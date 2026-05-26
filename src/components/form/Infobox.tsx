type Props = {
  children: React.ReactNode
}

export default function InfoBox({ children }: Props) {
  return (
    <div style={{
      background: '#EDE9FE', border: '1px solid #C4B5FD',
      borderRadius: 10, padding: '10px 14px',
      fontSize: 12, color: '#5B21B6', marginTop: 8, lineHeight: 1.5,
    }}>
      {children}
    </div>
  )
}
