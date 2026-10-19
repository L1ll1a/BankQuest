
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
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-extrabold text-[#152d54]">
          Финпрофиль
        </h2>
        <span className="rounded-full bg-[#e7f0ff] px-3 py-1 text-xs font-semibold text-[#1661d9]">
          Мои навыки
        </span>
      </div>

      <div className="rounded-[22px] border border-[#e6eef9] bg-white p-5 shadow-[0_5px_20px_rgba(33,86,154,0.05)]">
        {profile && (
          <div className="mb-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#e8f1ff] px-3 py-1.5 text-xs font-semibold text-[#155bd0]">
              {profile.age} лет
            </span>

            <span className="rounded-full bg-[#e8f1ff] px-3 py-1.5 text-xs font-semibold text-[#155bd0]">
              {goalNames[profile.goalType] ?? profile.goalType}
            </span>

            {profile.habits.map((h) => (
              <span
                key={h}
                className="rounded-full bg-[#e8f1ff] px-3 py-1.5 text-xs font-semibold text-[#155bd0]"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-4">
          {Object.entries(skills).map(([k, v]) => (
            <div key={k}>
              <div className="mb-2 flex justify-between text-xs">
                <span className="font-semibold text-[#334b6c]">
                  {skillNames[k] ?? k}
                </span>
                <span className="font-bold text-[#1764e8]">
                  {v}%
                </span>
              </div>

              <Bar
                value={v / 100}
                color={v > 30 ? 'bg-[#1769ed]' : 'bg-[#f5b942]'}
              />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-[#f1f6ff] px-3 py-3 text-center text-[11px] text-[#8193ae]">
          Показатели отражают игровые навыки, а не кредитный рейтинг.
        </div>
      </div>
    </section>
  )
}
