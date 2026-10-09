import { Navigate, Route, Routes } from 'react-router-dom'

const Stub = ({ name }: { name: string }) => (
  <div className="p-4 text-lg">{name}</div>
)

export default function App() {
  return (
    <Routes>
      <Route path="/onboarding" element={<Stub name="Onboarding" />} />
      <Route path="/goal/new" element={<Stub name="Goal" />} />
      <Route path="/" element={<Stub name="Dashboard" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}