import { Settings as SettingsIcon } from 'lucide-react'

export default function Settings() {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="page-header">
        <h1 className="page-title">Inställningar</h1>
        <p className="page-description">Hantera salongens uppgifter</p>
      </div>

      <div className="empty-state">
        <SettingsIcon className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">
          Inställningar kommer snart
        </p>
      </div>
    </div>
  )
}