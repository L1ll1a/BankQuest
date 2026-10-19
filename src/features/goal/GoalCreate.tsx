
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, Screen } from '../../ui/Screen'

export type GoalInput = {
  title: string
  target: number
  deadline: string
  weekly: number
}

type Props = {
  onCreate?: (goal: GoalInput) => void
}

const categories = [
  { label: 'Гаджеты', icon: '🎧', title: 'Наушники' },
  { label: 'Поездка', icon: '✈️', title: 'Путешествие' },
  { label: 'Подарок', icon: '🎁', title: 'Подарок' },
  { label: 'Своя', icon: '✨', title: '' },
]

function localDateString(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function defaultDeadline() {
  const date = new Date()
  date.setMonth(date.getMonth() + 2)
  return localDateString(date)
}

export default function GoalCreate({ onCreate }: Props) {
  const navigate = useNavigate()

  const [category, setCategory] = useState('Гаджеты')
  const [title, setTitle] = useState('Наушники')
  const [targetInput, setTargetInput] = useState('12000')
  const [deadline, setDeadline] = useState(defaultDeadline)
  const [weeklyInput, setWeeklyInput] = useState('1000')
  const [error, setError] = useState('')

  const target = Number(targetInput)
  const weekly = Number(weeklyInput)
  const validAmounts =
    Number.isFinite(target) &&
    Number.isFinite(weekly) &&
    target > 0 &&
    weekly > 0

  const weeks = validAmounts ? Math.ceil(target / weekly) : 0
  const eta = new Date()
  eta.setDate(eta.getDate() + weeks * 7)

  const estimatedDeadline = validAmounts
    ? eta.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—'

  const selectedDate = new Date(`${deadline}T23:59:59`)
  const tooSoon =
    validAmounts &&
    deadline !== '' &&
    Number.isFinite(selectedDate.getTime()) &&
    selectedDate.getTime() < eta.getTime()

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    if (
      !title.trim() ||
      !validAmounts ||
      !deadline ||
      !Number.isFinite(selectedDate.getTime())
    ) {
      setError('Проверь название, сумму, дату и отчисления.')
      return
    }

    if (selectedDate.getTime() < Date.now()) {
      setError('Укажи будущую дату.')
      return
    }

    const goal: GoalInput = {
      title: title.trim(),
      target,
      deadline,
      weekly,
    }

    if (onCreate) {
      onCreate(goal)
    } else {
      localStorage.setItem(
        'bankquest-draft-goal',
        JSON.stringify(goal),
      )
    }

    navigate('/')
  }

  const inputClass =
    'mt-2 w-full rounded-2xl border border-[#dbe7f8] bg-white px-4 py-3.5 text-base text-[#19375f] outline-none transition focus:border-[#1764e8] focus:ring-2 focus:ring-[#1764e8]/10'

  return (
    <Screen title="Новая цель" back>
      <form onSubmit={submit} className="space-y-5">
        <div className="overflow-hidden rounded-[24px] bg-gradient-to-br from-[#0849bd] to-[#48a0ff] px-5 py-7 text-center text-white">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[24px] bg-white/20 text-5xl">
            🎯
          </div>
          <h1 className="mt-4 text-2xl font-extrabold">
            На что копим?
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-blue-100">
            Большие мечты начинаются с маленьких шагов.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-sm font-bold text-[#25466f]">
            Выбери категорию
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {categories.map((item) => {
              const selected = category === item.label

              return (
                <button
                  type="button"
                  key={item.label}
                  aria-pressed={selected}
                  onClick={() => {
                    setCategory(item.label)
                    setTitle(item.title)
                  }}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected
                      ? 'border-[#1764e8] bg-[#eaf2ff]'
                      : 'border-[#e6eef9] bg-white'
                  }`}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className={`mt-2 block text-xs font-bold ${
                    selected ? 'text-[#1764e8]' : 'text-[#385575]'
                  }`}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-4 rounded-[22px] border border-[#e6eef9] bg-white p-4 shadow-sm">
          <label className="block text-sm font-bold text-[#25466f]">
            Название цели
            <input
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Например, новые наушники"
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-bold text-[#25466f]">
            Сколько нужно накопить, ₽
            <input
              required
              type="number"
              min="1"
              step="0.01"
              value={targetInput}
              onChange={(event) => setTargetInput(event.target.value)}
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-bold text-[#25466f]">
            Когда хочешь достичь цели?
            <input
              required
              type="date"
              min={localDateString(new Date())}
              value={deadline}
              onChange={(event) => setDeadline(event.target.value)}
              className={inputClass}
            />
          </label>

          <label className="block text-sm font-bold text-[#25466f]">
            Сколько готов откладывать в неделю, ₽
            <input
              required
              type="number"
              min="1"
              step="0.01"
              value={weeklyInput}
              onChange={(event) => setWeeklyInput(event.target.value)}
              className={inputClass}
            />
          </label>
        </div>

        {validAmounts && (
          <div className="rounded-[22px] border border-[#dce9ff] bg-[#eaf2ff] p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">📊</span>
              <h2 className="text-sm font-extrabold text-[#194d9e]">
                Твой план накоплений
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white p-3">
                <p className="text-[11px] text-[#8294ad]">
                  Примерный срок
                </p>
                <p className="mt-1 text-lg font-extrabold text-[#1764e8]">
                  {weeks} нед.
                </p>
              </div>

              <div className="rounded-xl bg-white p-3">
                <p className="text-[11px] text-[#8294ad]">
                  Каждую неделю
                </p>
                <p className="mt-1 text-lg font-extrabold text-[#1764e8]">
                  {weekly.toLocaleString('ru-RU')} ₽
                </p>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-[#5376a5]">
              При таком темпе накопишь нужную сумму примерно к{' '}
              <strong>{estimatedDeadline}</strong>.
            </p>

            <p className={`mt-2 text-xs font-semibold ${
              tooSoon ? 'text-[#bd6b1c]' : 'text-[#16845c]'
            }`}>
              {tooSoon
                ? 'Чтобы успеть к выбранной дате, нужно откладывать больше.'
                : 'Выбранный темп накоплений подходит по сроку.'}
            </p>
          </div>
        )}

        <div className="rounded-2xl bg-white px-4 py-3 text-center text-xs font-semibold text-[#1764e8]">
          ✨ За создание цели получишь +50 XP
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <PrimaryButton type="submit">
          Создать цель →
        </PrimaryButton>
      </form>
    </Screen>
  )
}
