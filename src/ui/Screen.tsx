import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export function Screen({ children, title, back = false }: { children: ReactNode; title?: string; back?: boolean }) {
  const navigate = useNavigate()
  return <main className="min-h-screen bg-[#eceaf7] px-3 py-5 text-[#211b38] sm:py-10">
    <div className="mx-auto min-h-[740px] w-full max-w-[390px] overflow-hidden rounded-[32px] border-[7px] border-[#25213d] bg-[#faf9ff] shadow-2xl">
      <div className="mx-auto mt-2 h-1.5 w-24 rounded-full bg-[#25213d]" />
      <header className="flex items-center gap-3 px-6 pb-3 pt-6">
        {back && <button type="button" onClick={() => navigate(-1)} aria-label="Назад" className="rounded-lg px-2 py-1 text-2xl text-[#6541d5]">‹</button>}
        <span className="font-semibold text-[#37275b]">{title ?? 'Bank Quest'}</span>
      </header>
      <div className="px-6 pb-10">{children}</div>
    </div>
  </main>
}

export function PrimaryButton({ children, onClick, disabled = false, type = 'button' }: { children: ReactNode; onClick?: () => void; disabled?: boolean; type?: 'button' | 'submit' }) {
  return <button type={type} onClick={onClick} disabled={disabled} className="w-full rounded-xl bg-[#653bda] px-4 py-3.5 font-semibold text-white transition hover:bg-[#5231b9] disabled:cursor-not-allowed disabled:opacity-50">{children}</button>
}

export function Progress({ value, max }: { value: number; max: number }) {
  const percent = max > 0 ? Math.min(100, Math.max(0, value / max * 100)) : 0
  return <div className="h-2.5 overflow-hidden rounded-full bg-[#e8e2f8]"><div className="h-full rounded-full bg-[#7148e7] transition-all" style={{ width: `${percent}%` }} /></div>
}
