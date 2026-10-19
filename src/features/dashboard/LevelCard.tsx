
import { useApp } from '../../store'
import { XP_PER_LEVEL } from '../../engine/level'

export default function LevelCard() {
  const level = useApp((s) => s.level)
  const xp = useApp((s) => s.xp)
  const streak = useApp((s) => s.streak)
  const achievements = useApp((s) => s.achievements)

  const pct =
    XP_PER_LEVEL > 0
      ? Math.min(100, Math.max(0, Math.round((xp / XP_PER_LEVEL) * 100)))
      : 0

  return (
    <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0645b8] via-[#1265e7] to-[#43a0ff] p-6 text-white shadow-[0_14px_32px_rgba(18,101,231,0.24)]">
      <div className="pointer-events-none absolute -right-12 -top-14 h-44 w-44 rounded-full border-[30px] border-white/10" />

      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-100">
            Финансовый уровень
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">
            Уровень {level}
          </h2>
        </div>

        <div className="rounded-2xl bg-white/15 px-3 py-2 text-center backdrop-blur-sm">
          <div className="text-xl">🏆</div>
          <div className="mt-1 text-[10px] font-medium text-blue-100">
            Следующий: {level + 1}
          </div>
        </div>
      </div>

      <div className="relative mt-6">
        <div className="mb-2 flex justify-between text-xs font-semibold">
          <span>Прогресс уровня</span>
          <span>{pct}%</span>
        </div>

        <div className="h-2.5 overflow-hidden rounded-full bg-white/25">
          <div
            className="h-full rounded-full bg-white transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <p className="mt-2 text-xs text-blue-100">
          {xp.toLocaleString('ru-RU')} /{' '}
          {XP_PER_LEVEL.toLocaleString('ru-RU')} XP
        </p>
      </div>

      <div className="relative mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-white/15 px-3 py-3 backdrop-blur-sm">
          <div className="text-lg">🔥</div>
          <p className="mt-1 text-lg font-bold">{streak} дней</p>
          <p className="text-[11px] text-blue-100">Серия активности</p>
        </div>

        <div className="rounded-2xl bg-white/15 px-3 py-3 backdrop-blur-sm">
          <div className="text-lg">⭐</div>
          <p className="mt-1 text-lg font-bold">{achievements}/30</p>
          <p className="text-[11px] text-blue-100">Достижения</p>
        </div>
      </div>
    </div>
  )
}
