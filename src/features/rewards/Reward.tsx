import { useNavigate } from 'react-router-dom'
import { PrimaryButton, Screen } from '../../ui/Screen'
import { Progress } from '../../ui/Screen'

export default function Reward() {
  const navigate = useNavigate()
  return <Screen title="Твоя награда" back>
    <div className="space-y-5 py-6 text-center"><div className="text-7xl">🏆</div><h1 className="text-2xl font-bold">Отличная работа!</h1><p className="text-sm text-[#6a6381]">Квест выполнен. Продолжай развивать финансовые навыки!</p><div className="rounded-2xl bg-[#f1ebff] p-5"><p className="font-semibold text-[#6236d6]">+150 XP</p><p className="mt-2 text-sm">Прогресс уровня</p><div className="mt-3"><Progress value={2600} max={3000}/></div></div><p className="text-xs text-[#817991]">Демонстрационный экран. Настоящую награду передаст игровой движок.</p><PrimaryButton onClick={() => navigate('/')}>На главный экран</PrimaryButton></div>
  </Screen>
}
