import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PrimaryButton, Screen } from '../../ui/Screen'

export type GoalInput = { title: string; target: number; deadline: string; weekly: number }
type Props = { onCreate?: (goal: GoalInput) => void }

export default function GoalCreate({ onCreate }: Props) {
  const navigate = useNavigate()
  const [category, setCategory] = useState('Гаджеты')
  const [title, setTitle] = useState('Наушники')
  const [targetInput, setTargetInput] = useState('12000')
  const [deadline, setDeadline] = useState('2026-12-15')
  const [weeklyInput, setWeeklyInput] = useState('1000')
  const target = Number(targetInput)
  const weekly = Number(weeklyInput)
  const [error, setError] = useState('')
  const weeks = weekly > 0 ? Math.ceil(target / weekly) : 0
  const eta = new Date(Date.now() + weeks * 7 * 86400000)
  const estimatedDeadline = Number.isFinite(eta.getTime()) ? eta.toLocaleDateString('ru-RU') : '—'
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!title.trim() || target <= 0 || weekly <= 0 || !deadline || Number.isNaN(Date.parse(deadline))) { setError('Проверь название, сумму, дату и отчисления.'); return }
    if (new Date(`${deadline}T23:59:59`) < new Date()) { setError('Укажи будущую дату.'); return }
    const goal = { title: title.trim(), target, deadline, weekly }
    onCreate?.(goal)
    // Temporary until Vik's createGoal action is wired in.
    if (!onCreate) localStorage.setItem('bankquest-draft-goal', JSON.stringify(goal))
    navigate('/')
  }
  return <Screen title="Новая цель" back>
    <form onSubmit={submit} className="space-y-4">
      <h1 className="text-2xl font-bold">На что копим?</h1>
      <div className="flex flex-wrap gap-2">{['Гаджеты','Поездка','Подарок','Своя'].map(v => <button type="button" key={v} onClick={() => { setCategory(v); if(v !== 'Своя') setTitle(v === 'Гаджеты' ? 'Наушники' : v) }} className={`rounded-full px-3 py-2 text-xs ${category === v ? 'bg-[#673ee1] text-white' : 'bg-[#eee9fa]'}`}>{v}</button>)}</div>
      <label className="block text-sm font-medium">Название<input required value={title} onChange={e => setTitle(e.target.value)} className="mt-2 w-full rounded-xl border border-[#ded8ed] bg-white p-3" /></label>
      <label className="block text-sm font-medium">Сумма, ₽<input required min="1" type="number" value={targetInput} onChange={e => setTargetInput(e.target.value)} className="mt-2 w-full rounded-xl border border-[#ded8ed] bg-white p-3" /></label>
      <label className="block text-sm font-medium">Дата достижения<input required type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="mt-2 w-full rounded-xl border border-[#ded8ed] bg-white p-3" /></label>
      <label className="block text-sm font-medium">Откладывать в неделю, ₽<input required min="1" type="number" value={weeklyInput} onChange={e => setWeeklyInput(e.target.value)} className="mt-2 w-full rounded-xl border border-[#ded8ed] bg-white p-3" /></label>
      {target > 0 && weekly > 0 && <div className="rounded-xl bg-[#e1f8e8] p-3 text-sm text-[#236438]"><b>Расчёт:</b> примерно {weeks} нед. · до {estimatedDeadline}{deadline && new Date(`${deadline}T23:59:59`).getTime() < eta.getTime() ? <p>Чтобы успеть к выбранной дате, нужно откладывать больше.</p> : <p>Выбранная сумма отчислений подходит по сроку.</p>}</div>}
      <p className="text-xs text-[#7b7390]">За создание цели +50 XP (начислит игровая логика).</p>
      {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
      <PrimaryButton type="submit">Создать цель</PrimaryButton>
    </form>
  </Screen>
}
