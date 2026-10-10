import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import seed from '../data/seed.json'
import { addXp } from '../engine/level'
import type { Profile, GoalInput, Goal, Quest, Reward, Skills } from '../types'

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
  setProfile: (p: Profile) => void
  createGoal: (g: GoalInput) => void
  reset: () => void
}

const initial = seed as unknown as Omit<
  State,
  'setProfile' | 'createGoal' | 'reset'
>

export const useApp = create<State>()(
  persist(
    (set, get) => ({
      ...initial,
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
      reset: () => set({ ...initial }),
    }),
    { name: 'bankquest-demo' },
  ),
)