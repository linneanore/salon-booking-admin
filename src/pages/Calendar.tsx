import { Calendar as CalendarIcon } from 'lucide-react'

export default function Calendar() {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="page-header">
        <h1 className="page-title">Kalender</h1>
        <p className="page-description">Dag- och veckovy över bokningar</p>
      </div>

      <div className="empty-state">
        <CalendarIcon className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">
          Kalendervy kommer snart
        </p>
      </div>
    </div>
  )
}