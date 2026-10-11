import { useNavigate } from 'react-router-dom'
import { useApp } from '../../store'
import Bar from './Bar'

const rub = (n: number) => n.toLocaleString('ru-RU') + ' ₽'
const date = (s: string) =>
  new Date(s).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })

export default function GoalsList() {
  const goals = useApp((s) => s.goals)
  const navigate = useNavigate()
  return (
    <section>
      <h2 className="mb-2 font-bold">Мои цели</h2>
      {goals.length === 0 ? (
        <div className="rounded-2xl bg-white p-4 text-sm text-gray-500">
          Целей пока нет. Поставь первую и получи +50 XP.
        </div>
      ) : (
        <div className="space-y-2">
          {goals.map((g) => (
            <div key={g.id} className="rounded-2xl bg-white p-4">
              <div className="font-semibold">{g.title}</div>
              <div className="mb-2 text-xs text-gray-500">
                {rub(g.saved)} из {rub(g.target)} · до {date(g.deadline)}
              </div>
              <Bar value={g.saved / g.target} color="bg-violet-600" />
            </div>
          ))}
        </div>
      )}
      <button
        className="mt-2 w-full rounded-xl bg-violet-600 py-3 text-sm font-bold text-white"
        onClick={() => navigate('/goal/new')}
      >
        + Создать цель
      </button>
    </section>
  )
}