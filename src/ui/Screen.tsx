
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

type ScreenProps = {
  children: ReactNode
  title?: string
  back?: boolean
}

export function Screen({
  children,
  title,
  back = false,
}: ScreenProps) {
  const navigate = useNavigate()

  return (
    <main className="min-h-screen bg-[#eaf0fa] px-3 py-5 text-[#18253e] sm:py-10">
      <div className="mx-auto min-h-[740px] w-full max-w-[390px] overflow-hidden rounded-[32px] border-[7px] border-[#172c51] bg-[#f8fbff] shadow-[0_24px_70px_rgba(20,54,108,0.18)]">
        <div className="mx-auto mt-2 h-1.5 w-24 rounded-full bg-[#172c51]" />

        <header className="flex items-center gap-3 px-6 pb-4 pt-6">
          {back && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Назад"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e7efff] text-2xl text-[#1554dc] transition hover:bg-[#d7e5ff]"
            >
              ‹
            </button>
          )}

          <span className="text-base font-bold tracking-tight text-[#172c51]">
            {title ?? 'Bank Quest'}
          </span>
        </header>

        <div className="px-6 pb-10">
          {children}
        </div>
      </div>
    </main>
  )
}

type PrimaryButtonProps = {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit'
}

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  type = 'button',
}: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="w-full rounded-2xl bg-[#1658e8] px-4 py-4 text-sm font-bold text-white shadow-[0_8px_18px_rgba(22,88,232,0.18)] transition hover:bg-[#1049c7] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
    >
      {children}
    </button>
  )
}

type ProgressProps = {
  value: number
  max: number
}

export function Progress({ value, max }: ProgressProps) {
  const percent =
    max > 0
      ? Math.min(100, Math.max(0, (value / max) * 100))
      : 0

  return (
    <div
      className="h-2.5 overflow-hidden rounded-full bg-[#dce8ff]"
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-[#1763f3] to-[#46a2ff] transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
