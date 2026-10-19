
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, Screen } from '../../ui/Screen'

export type ProfileInput = {
  age: number
  goalType: 'gadget' | 'trip' | 'gift' | 'other'
  habits: string[]
  consent: boolean
}

type Props = {
  onComplete?: (profile: ProfileInput) => void
}

const goalOptions = [
  { label: 'Гаджеты', value: 'gadget', icon: '🎧' },
  { label: 'Поездка', value: 'trip', icon: '✈️' },
  { label: 'Подарок', value: 'gift', icon: '🎁' },
  { label: 'Своя цель', value: 'other', icon: '✨' },
] as const

const habitOptions = [
  'Импульсивные покупки',
  'Кофе/доставка',
  'Подписки',
  'Игры',
]

export default function Onboarding({ onComplete }: Props) {
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [ageInput, setAgeInput] = useState('17')
  const [goalType, setGoalType] =
    useState<ProfileInput['goalType']>('gadget')
  const [habits, setHabits] = useState<string[]>([])
  const [consent, setConsent] = useState(false)

  const age = Number(ageInput)
  const validAge =
    ageInput.trim() !== '' &&
    Number.isInteger(age) &&
    age >= 14 &&
    age <= 22

  function toggleHabit(value: string) {
    setHabits((previous) =>
      previous.includes(value)
        ? previous.filter((habit) => habit !== value)
        : [...previous, value],
    )
  }

  function submit() {
    if (!validAge || !consent) return

    const profile: ProfileInput = {
      age,
      goalType,
      habits,
      consent,
    }

    if (onComplete) {
      onComplete(profile)
    } else {
      localStorage.setItem(
        'bankquest-draft-profile',
        JSON.stringify(profile),
      )
    }

    navigate('/goal/new')
  }

  return (
    <Screen title="BankQuest">
      <div className="mb-6 mt-3">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#7290bb]">
            Твой финансовый путь
          </span>
          <span className="text-xs font-bold text-[#1764e8]">
            {step + 1} / 3
          </span>
        </div>

        <div className="flex gap-2">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full ${
                index <= step ? 'bg-[#1764e8]' : 'bg-[#e1eafa]'
              }`}
            />
          ))}
        </div>
      </div>

      {step === 0 && (
        <section className="space-y-6">
          <div className="relative flex min-h-[230px] flex-col items-center justify-center overflow-hidden rounded-[26px] bg-gradient-to-br from-[#0849bd] to-[#48a0ff] p-6 text-center text-white">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full border-[25px] border-white/10" />
            <div className="relative flex h-24 w-24 items-center justify-center rounded-[30px] bg-white/20 text-6xl shadow-lg">
              🚀
            </div>
            <p className="relative mt-5 text-xs font-semibold uppercase tracking-widest text-blue-100">
              Добро пожаловать
            </p>
          </div>

          <div className="text-center">
            <h1 className="text-[27px] font-extrabold leading-tight tracking-tight text-[#15345f]">
              Твой путь к финансовой свободе
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-[#7c90ad]">
              Превращай финансовые привычки в игру. Копи на мечты, выполняй квесты и получай награды.
            </p>
          </div>

          <div className="space-y-3">
            {[
              ['🎯', 'Ставь цели', 'Копи на то, что действительно хочешь'],
              ['⚡', 'Выполняй квесты', 'Прокачивай полезные привычки'],
              ['🏆', 'Получай награды', 'Зарабатывай XP и открывай бонусы'],
            ].map(([icon, title, description]) => (
              <div
                key={title}
                className="flex items-center gap-3 rounded-2xl border border-[#e6eef9] bg-white p-4 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eaf2ff] text-2xl">
                  {icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#19375f]">{title}</p>
                  <p className="mt-1 text-xs text-[#8294ad]">{description}</p>
                </div>
              </div>
            ))}
          </div>

          <PrimaryButton onClick={() => setStep(1)}>
            Начать путешествие →
          </PrimaryButton>

          <p className="text-center text-[11px] text-[#8b9bb0]">
            Демо-версия · реальные деньги не списываются
          </p>
        </section>
      )}

      {step === 1 && (
        <section className="space-y-5">
          <div className="rounded-[24px] bg-[#eaf2ff] p-5">
            <div className="text-4xl">👋</div>
            <h1 className="mt-3 text-2xl font-extrabold text-[#15345f]">
              Давай знакомиться
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-[#6e88ad]">
              Ответь на пару вопросов, чтобы мы подобрали задания под твои интересы.
            </p>
          </div>

          <label className="block text-sm font-bold text-[#25466f]">
            Сколько тебе лет?
            <input
              className="mt-2 w-full rounded-2xl border border-[#dbe7f8] bg-white px-4 py-3.5 text-base text-[#19375f] outline-none transition focus:border-[#1764e8] focus:ring-2 focus:ring-[#1764e8]/10"
              type="number"
              min="14"
              max="22"
              value={ageInput}
              onChange={(event) => setAgeInput(event.target.value)}
            />
          </label>

          <div>
            <p className="mb-3 text-sm font-bold text-[#25466f]">
              На что хочешь копить?
            </p>

            <div className="grid grid-cols-2 gap-3">
              {goalOptions.map(({ label, value, icon }) => {
                const selected = goalType === value
                return (
                  <button
                    type="button"
                    key={value}
                    aria-pressed={selected}
                    onClick={() => setGoalType(value)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      selected
                        ? 'border-[#1764e8] bg-[#eaf2ff] shadow-sm'
                        : 'border-[#e6eef9] bg-white'
                    }`}
                  >
                    <span className="text-2xl">{icon}</span>
                    <span className={`mt-2 block text-xs font-bold ${
                      selected ? 'text-[#1764e8]' : 'text-[#385575]'
                    }`}>
                      {label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-bold text-[#25466f]">
              Какие траты тебе знакомы?
            </p>
            <div className="flex flex-wrap gap-2">
              {habitOptions.map((habit) => {
                const selected = habits.includes(habit)
                return (
                  <button
                    type="button"
                    key={habit}
                    aria-pressed={selected}
                    onClick={() => toggleHabit(habit)}
                    className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                      selected
                        ? 'border-[#1764e8] bg-[#1764e8] text-white'
                        : 'border-[#e2ebf8] bg-white text-[#567195]'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}{habit}
                  </button>
                )
              })}
            </div>
          </div>

          {!validAge && (
            <p className="text-xs text-red-600">
              Укажи возраст от 14 до 22 лет.
            </p>
          )}

          <PrimaryButton disabled={!validAge} onClick={() => setStep(2)}>
            Продолжить →
          </PrimaryButton>

          <button
            type="button"
            onClick={() => setStep(0)}
            className="w-full py-2 text-sm font-semibold text-[#7890b0]"
          >
            ← Назад
          </button>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-5">
          <div className="rounded-[24px] bg-gradient-to-br from-[#0b4bc1] to-[#3489f6] p-6 text-white">
            <div className="text-5xl">🏆</div>
            <h1 className="mt-5 text-2xl font-extrabold">
              Ты почти у цели!
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-blue-100">
              Твой финансовый путь начинается с первого шага. Вот какие квесты тебя ждут.
            </p>
          </div>

          <div className="rounded-[22px] border border-[#e5edf9] bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-extrabold text-[#18365c]">
              Первые достижения
            </h2>

            {[
              ['🎯', 'Создай первую цель', '+50 XP'],
              ['⚡', 'Неделя без лишних трат', '+150 XP'],
              ['🛡️', 'Не дай себя обмануть', '+80 XP'],
            ].map(([icon, title, xp]) => (
              <div
                key={title}
                className="flex items-center gap-3 border-b border-[#edf2fa] py-3 last:border-0"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eaf2ff] text-xl">
                  {icon}
                </span>
                <span className="flex-1 text-xs font-semibold text-[#355476]">
                  {title}
                </span>
                <span className="shrink-0 text-xs font-bold text-[#1764e8]">
                  {xp}
                </span>
              </div>
            ))}
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-[#e0eaf8] bg-[#f1f6ff] p-4 text-xs leading-relaxed text-[#587394]">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-[#1764e8]"
            />
            <span>
              Согласен на использование введённых данных для демонстрации прогресса. Это локальный прототип, банковские операции не анализируются.
            </span>
          </label>

          <PrimaryButton disabled={!consent} onClick={submit}>
            Перейти к своей цели →
          </PrimaryButton>

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full py-2 text-sm font-semibold text-[#7890b0]"
          >
            ← Назад
          </button>
        </section>
      )}
    </Screen>
  )
}
