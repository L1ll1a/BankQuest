export default function Bar({
  value,
  color = 'bg-green-500',
}: {
  value: number
  color?: string
}) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)))
  return (
    <div className="h-2 w-full rounded-full bg-gray-200">
      <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
    </div>
  )
}