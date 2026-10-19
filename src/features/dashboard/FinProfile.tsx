import { useApp } from '../../store'
import Bar from './Bar'

const goalNames: Record<string, string> = {
  gadget: 'Гаджеты',
  trip: 'Поездка',
  gift: 'Подарок',
  other: 'Другое',
}
const skillNames: Record<string, string> = {
  savings: 'Накопления',
  budget: 'Бюджет',
  safety: 'Безопасность',
  planning: 'Планирование',
  investing: 'Инвестиции',
}

export default function FinProfile() {
  const profile = useApp((s) => s.profile)
  const skills = useApp((s) => s.skills)
  return (
    <section>
      <h2 className="mb-2 font-bold">Финпрофиль</h2>
      <div className="rounded-2xl bg-white p-4">
        {profile && (
          <div className="mb-3 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700">
              {profile.age} лет
            </span>
            <span className="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700">
              {goalNames[profile.goalType] ?? profile.goalType}
            </span>
            {profile.habits.map((h) => (
              <span
                key={h}
                className="rounded-full bg-violet-100 px-3 py-1 font-semibold text-violet-700"
              >
                {h}
              </span>
            ))}
          </div>
        )}
        <div className="space-y-2">
          {Object.entries(skills).map(([k, v]) => (
            <div key={k}>
              <div className="mb-1 flex justify-between text-xs">
                <span className="font-semibold">{skillNames[k] ?? k}</span>
                <span className="font-bold text-violet-700">{v}%</span>
              </div>
              <Bar value={v / 100} color={v > 30 ? 'bg-violet-600' : 'bg-amber-500'} />
            </div>
          ))}
        </div>
        <div className="mt-3 text-center text-xs text-gray-500">
          Это не кредитный рейтинг
        </div>
      </div>
    </section>
  )
}