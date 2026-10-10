export const XP_PER_LEVEL = 3000

export function addXp(level: number, xp: number, gain: number) {
  let l = level
  let x = xp + gain
  while (x >= XP_PER_LEVEL) {
    x -= XP_PER_LEVEL
    l++
  }
  return { level: l, xp: x }
}