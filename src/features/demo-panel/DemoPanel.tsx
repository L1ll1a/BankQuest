import { useApp } from '../../store'

const btn =
  'w-full rounded-lg bg-amber-500 py-2 text-xs font-bold text-white disabled:opacity-40'

export default function DemoPanel() {
  const goals = useApp((s) => s.goals)
  const contribute = useApp((s) => s.contribute)
  const nextDay = useApp((s) => s.nextDay)
  const nextWeek = useApp((s) => s.nextWeek)
  const target = goals.find((g) => g.saved < g.target)

  return (
    <section className="rounded-2xl border-2 border-dashed border-amber-400 bg-amber-50 p-4">
      <h2 className="text-sm font-bold text-amber-800">
        Симулятор банка (для демо)
      </h2>
      <p className="mb-3 text-xs text-amber-700">
        Имитирует операции по карте, чтобы двигать квесты.
      </p>
      <div className="space-y-2">
        <button
          className={btn}
          disabled={!target}
          onClick={() => target && contribute(target.id, 1000)}
        >
          +1 000 ₽ в цель
        </button>
        <button
          className={btn}
          disabled={!target}
          onClick={() => target && contribute(target.id, target.target - target.saved)}
        >
          Дособрать цель целиком
        </button>
        <button className={btn} disabled={!target} onClick={nextWeek}>
          Следующая неделя (+отчисления)
        </button>
        <button className={btn} onClick={nextDay}>
          Следующий день без лишних трат
        </button>
      </div>
      {!target && (
        <p className="mt-2 text-xs text-amber-700">
          Сначала создайте цель, кнопки для цели станут активными.
        </p>
      )}
    </section>
  )
}