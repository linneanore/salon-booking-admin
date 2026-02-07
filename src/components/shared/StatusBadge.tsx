import { Badge } from '@/components/ui/badge'

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'noshow'

interface StatusBadgeProps {
  status: BookingStatus
}

const statusConfig = {
  pending: {
    label: 'Väntande',
    className: 'bg-salon-warning-light text-salon-warning border-salon-warning/20',
  },
  confirmed: {
    label: 'Bekräftad',
    className: 'bg-salon-info-light text-salon-info border-salon-info/20',
  },
  completed: {
    label: 'Slutförd',
    className: 'bg-salon-success-light text-salon-success border-salon-success/20',
  },
  cancelled: {
    label: 'Avbokad',
    className: 'bg-salon-rose-light text-destructive border-destructive/20',
  },
  noshow: {
    label: 'No-show',
    className: 'bg-muted text-muted-foreground border-border',
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  )
}