
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
  { label: 'Гаджеты', value: 'gadget' },
  { label: 'Поездка', value: 'trip' },
  { label: 'Подарок', value: 'gift' },
  { label: 'Своя цель', value: 'other' },
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
      // Временный режим без подключённого Zustand.
      localStorage.setItem(
        'bankquest-draft-profile',
        JSON.stringify(profile),
      )
    }

    navigate('/goal/new')
  }

  return (
    <Screen title="Bank Quest">
      <div className="mb-6 mt-4 flex gap-2">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded ${
              index <= step ? 'bg-[#673ee1]' : 'bg-[#ebe5f8]'
            }`}
          />
        ))}
      </div>

      {step === 0 && (
        <section className="space-y-6">
          <div className="flex justify-center py-6">
            <span className="flex h-28 w-28 items-center justify-center rounded-full bg-[#ede6ff] text-6xl">
              ⭐
            </span>
          </div>

          <h1 className="text-center text-2xl font-bold">
            Учись на реальных деньгах
          </h1>

          <p className="text-center text-sm text-[#6a6381]">
            Без лекций. Через цели и квесты.
          </p>

          <div className="space-y-3 rounded-2xl bg-white p-4 text-sm shadow-sm">
            <p>🎯 <b>Ставишь цель</b> — например, на наушники</p>
            <p>🎮 <b>Проходишь квесты</b> — учишься копить</p>
            <p>🏆 <b>Получаешь награды</b> — XP и достижения</p>
          </div>

          <PrimaryButton onClick={() => setStep(1)}>
            Продолжить
          </PrimaryButton>

          <p className="text-center text-xs text-[#817991]">
            Демонстрационная версия: реальные деньги не списываются
          </p>
        </section>
      )}

      {step === 1 && (
        <section className="space-y-5">
          <h1 className="text-2xl font-bold">
            Твой финансовый профиль
          </h1>

          <p className="text-sm text-[#6a6381]">
            Пару вопросов, чтобы подобрать первые задания.
          </p>

          <label className="block text-sm font-semibold">
            Возраст
            <input
              className="mt-2 w-full rounded-xl border border-[#d6ceed] bg-white p-3"
              type="number"
              min="14"
              max="22"
              value={ageInput}
              onChange={(event) => setAgeInput(event.target.value)}
            />
          </label>

          <div>
            <p className="mb-2 text-sm font-semibold">
              На что хочешь копить?
            </p>

            <div className="flex flex-wrap gap-2">
              {goalOptions.map(({ label, value }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() => setGoalType(value)}
                  className={`rounded-full px-3 py-2 text-sm ${
                    goalType === value
                      ? 'bg-[#673ee1] text-white'
                      : 'bg-[#eee9fa]'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">
              Какие траты знакомы?
            </p>

            <div className="flex flex-wrap gap-2">
              {habitOptions.map((habit) => (
                <button
                  type="button"
                  key={habit}
                  onClick={() => toggleHabit(habit)}
                  className={`rounded-full px-3 py-2 text-sm ${
                    habits.includes(habit)
                      ? 'bg-[#673ee1] text-white'
                      : 'bg-[#eee9fa]'
                  }`}
                >
                  {habit}
                </button>
              ))}
            </div>
          </div>

          <PrimaryButton
            disabled={!validAge}
            onClick={() => setStep(2)}
          >
            Дальше
          </PrimaryButton>

          {!validAge && (
            <p className="text-sm text-red-600">
              Укажи возраст от 14 до 22 лет.
            </p>
          )}
        </section>
      )}

      {step === 2 && (
        <section className="space-y-5">
          <h1 className="text-2xl font-bold">
            Твой финансовый старт
          </h1>

          <p className="text-sm text-[#6a6381]">
            Начни с простой цели, а мы предложим полезные задания.
          </p>

          <div className="space-y-3 rounded-2xl bg-white p-4 text-sm shadow-sm">
            <b>Рекомендованные квесты</b>

            <p>🟢 Первая цель · +50 XP</p>
            <p>🟢 Неделя без лишних трат · +150 XP</p>
            <p>🟢 Не дай себя обмануть · +80 XP</p>
          </div>

          <label className="flex items-start gap-2 rounded-xl border border-[#e8e3f4] p-3 text-xs">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => setConsent(event.target.checked)}
            />

            <span>
              Согласен на использование введённых данных для
              демонстрации прогресса. Это локальный прототип,
              банковские операции не анализируются.
            </span>
          </label>

          <PrimaryButton disabled={!consent} onClick={submit}>
            Начать
          </PrimaryButton>
        </section>
      )}
    </Screen>
  )
}
