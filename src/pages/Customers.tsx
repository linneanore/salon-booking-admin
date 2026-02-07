import { Users, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function Customers() {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Kunder</h1>
          <p className="page-description">Hantera kundregister</p>
        </div>
        <Button onClick={() => toast.success('Ny kund öppnas snart!')} className="gap-2">
          <Plus className="h-4 w-4" />
          Ny kund
        </Button>
      </div>

      <div className="empty-state">
        <Users className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">
          Kundlista kommer i nästa milestone
        </p>
      </div>
    </div>
  )
}