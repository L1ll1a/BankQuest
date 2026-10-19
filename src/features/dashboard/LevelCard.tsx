import { useApp } from '../../store'
import { XP_PER_LEVEL } from '../../engine/level'

export default function LevelCard() {
  const level = useApp((s) => s.level)
  const xp = useApp((s) => s.xp)
  const streak = useApp((s) => s.streak)
  const achievements = useApp((s) => s.achievements)
  const pct = Math.min(100, Math.round((xp / XP_PER_LEVEL) * 100))
  return (
    <div className="rounded-2xl bg-violet-600 p-4 text-white">
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold">Уровень {level}</div>
        <div className="text-xs opacity-80">до уровня {level + 1}</div>
      </div>
      <div className="mt-3 h-2 rounded-full bg-violet-400/60">
        <div
          className="h-2 rounded-full bg-lime-400"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-2 text-sm font-semibold">
        XP {xp.toLocaleString('ru-RU')} / {XP_PER_LEVEL.toLocaleString('ru-RU')}
      </div>
      <div className="mt-3 flex gap-2 text-xs">
        <span className="rounded-full bg-amber-100 px-3 py-1 font-semibold text-amber-700">
          серия {streak} дн.
        </span>
        <span className="rounded-full bg-white px-3 py-1 font-semibold text-violet-700">
          ачивки {achievements}/30
        </span>
      </div>
    </div>
  )
}