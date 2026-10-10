export type Profile = {
  age: number
  goalType: 'gadget' | 'trip' | 'gift' | 'other'
  habits: string[]
  consent: boolean
}

export type GoalInput = {
  title: string
  target: number
  deadline: string
  weekly: number
}

export type Goal = GoalInput & { id: string; saved: number }

export type Quest = {
  id: string
  type: 'savings' | 'budget' | 'safety'
  title: string
  xp: number
  progress: number
  total: number
  unit: 'days' | 'rub'
  status: 'active' | 'done'
  goalId?: string
}

export type Reward = {
  id: string
  title: string
  partner: string
  minLevel: number
  code: string
}

export type Skills = Record<
  'savings' | 'budget' | 'safety' | 'planning' | 'investing',
  number
>