import { useEffect, useState } from 'react'
import './Countdown.css'

interface CountdownProps {
  targetDate: Date
}

interface TimeLeft {
  dias: number
  horas: number
  minutos: number
  segundos: number
}

function getTimeLeft(targetDate: Date): TimeLeft {
  const diff = Math.max(0, targetDate.getTime() - Date.now())

  return {
    dias: Math.floor(diff / (1000 * 60 * 60 * 24)),
    horas: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutos: Math.floor((diff / (1000 * 60)) % 60),
    segundos: Math.floor((diff / 1000) % 60),
  }
}

function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate))

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  const units: { label: string; value: number }[] = [
    { label: 'dias', value: timeLeft.dias },
    { label: 'horas', value: timeLeft.horas },
    { label: 'min', value: timeLeft.minutos },
    { label: 'seg', value: timeLeft.segundos },
  ]

  return (
    <div className="countdown">
      {units.map((unit) => (
        <div className="countdown__unit" key={unit.label}>
          <span className="countdown__value">
            {String(unit.value).padStart(2, '0')}
          </span>
          <span className="countdown__label">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}

export default Countdown
