import { Sparkles, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function Services() {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Tjänster</h1>
          <p className="page-description">Hantera behandlingar och priser</p>
        </div>
        <Button onClick={() => toast.success('Ny tjänst öppnas snart!')} className="gap-2">
          <Plus className="h-4 w-4" />
          Ny tjänst
        </Button>
      </div>

      <div className="empty-state">
        <Sparkles className="h-10 w-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">
          Tjänstlista kommer snart
        </p>
      </div>
    </div>
  )
}