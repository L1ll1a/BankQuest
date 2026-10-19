import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import seed from '../data/seed.json'
import { addXp } from '../engine/level'
import type { Profile, GoalInput, Goal, Quest, Reward, Skills } from '../types'

export type Celebration = {
  title: string
  xp: number
  levelUp: number | null
}

type State = {
  onboarded: boolean
  profile: Profile | null
  level: number
  xp: number
  streak: number
  achievements: number
  goals: Goal[]
  quests: Quest[]
  rewards: Reward[]
  skills: Skills
  celebration: Celebration | null
  setProfile: (p: Profile) => void
  createGoal: (g: GoalInput) => void
  contribute: (goalId: string, amount: number) => void
  nextDay: () => void
  nextWeek: () => void
  dismissCelebration: () => void
  reset: () => void
}

type Actions =
  | 'setProfile'
  | 'createGoal'
  | 'contribute'
  | 'nextDay'
  | 'nextWeek'
  | 'dismissCelebration'
  | 'reset'

const initial = seed as unknown as Omit<State, Actions | 'celebration'>

// квест привязан к цели: его прогресс = накопленная сумма
function syncQuests(quests: Quest[], goals: Goal[]): Quest[] {
  return quests.map((q) => {
    if (!q.goalId) return q
    const g = goals.find((x) => x.id === q.goalId)
    return g ? { ...q, progress: g.saved } : q
  })
}

function markDone(q: Quest): Quest {
  return q.status !== 'done' && q.progress >= q.total
    ? { ...q, status: 'done' }
    : q
}

// считает награды за только что выполненные квесты
function settle(
  s: State,
  goals: Goal[],
  quests: Quest[],
  extra: Partial<State> = {},
): Partial<State> {
  const newlyDone = quests.filter(
    (q, i) => q.status === 'done' && s.quests[i].status !== 'done',
  )
  if (newlyDone.length === 0) return { goals, quests, ...extra }

  const gain = newlyDone.reduce((a, q) => a + q.xp, 0)
  const { level, xp } = addXp(s.level, s.xp, gain)
  const skills = newlyDone.reduce<Skills>(
    (acc, q) => ({ ...acc, [q.type]: Math.min(100, acc[q.type] + 5) }),
    s.skills,
  )
  return {
    goals,
    quests,
    ...extra,
    level,
    xp,
    skills,
    achievements: s.achievements + newlyDone.length,
    celebration: {
      title: newlyDone.map((q) => q.title).join(', '),
      xp: gain,
      levelUp: level > s.level ? level : null,
    },
  }
}

export const useApp = create<State>()(
  persist(
    (set, get) => ({
      ...initial,
      celebration: null,

      setProfile: (profile) => set({ profile, onboarded: true }),

      createGoal: (g) => {
        const id = crypto.randomUUID()
        const { level, xp } = addXp(get().level, get().xp, 50)
        const quest: Quest = {
          id: 'q-' + id,
          type: 'savings',
          title: `Накопи ${g.target.toLocaleString('ru-RU')} ₽: ${g.title}`,
          xp: 300,
          progress: 0,
          total: g.target,
          unit: 'rub',
          status: 'active',
          goalId: id,
        }
        set((s) => ({
          goals: [...s.goals, { ...g, id, saved: 0 }],
          quests: [...s.quests, quest],
          level,
          xp,
        }))
      },

      contribute: (goalId, amount) => {
        const s = get()
        const goals = s.goals.map((g) =>
          g.id === goalId
            ? { ...g, saved: Math.min(g.target, g.saved + amount) }
            : g,
        )
        const quests = syncQuests(s.quests, goals).map(markDone)
        set(settle(s, goals, quests))
      },

      nextDay: () => {
        const s = get()
        const quests = s.quests
          .map((q) =>
            q.type === 'budget' && !q.goalId && q.status !== 'done'
              ? { ...q, progress: Math.min(q.total, q.progress + 1) }
              : q,
          )
          .map(markDone)
        set(settle(s, s.goals, quests, { streak: s.streak + 1 }))
      },

      nextWeek: () => {
        const s = get()
        const goals = s.goals.map((g) => ({
          ...g,
          saved: Math.min(g.target, g.saved + g.weekly),
        }))
        const quests = syncQuests(s.quests, goals).map(markDone)
        set(settle(s, goals, quests, { streak: s.streak + 7 }))
      },

      dismissCelebration: () => set({ celebration: null }),

      reset: () => set({ ...initial, celebration: null }),
    }),
    { name: 'bankquest-demo' },
  ),
)