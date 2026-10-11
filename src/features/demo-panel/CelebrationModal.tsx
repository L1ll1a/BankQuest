import { useApp } from '../../store'

export default function CelebrationModal() {
  const c = useApp((s) => s.celebration)
  const dismiss = useApp((s) => s.dismissCelebration)
  if (!c) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-[340px] rounded-3xl bg-violet-600 p-6 text-center text-white">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-violet-400 text-3xl">
          ★
        </div>
        <div className="text-xl font-bold">Квест выполнен!</div>
        <div className="mt-1 text-sm opacity-90">{c.title}</div>
        <div className="mt-4 inline-block rounded-full bg-lime-400 px-4 py-1 text-sm font-bold text-gray-900">
          +{c.xp} XP
        </div>
        {c.levelUp && (
          <div className="mt-3 rounded-xl bg-white p-3 text-sm font-bold text-violet-700">
            Новый уровень: {c.levelUp}! Открылись новые награды
          </div>
        )}
        <button
          className="mt-5 w-full rounded-xl bg-lime-400 py-3 text-sm font-bold text-gray-900"
          onClick={dismiss}
        >
          Отлично
        </button>
      </div>
    </div>
  )
}