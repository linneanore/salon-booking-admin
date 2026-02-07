import { Menu } from 'lucide-react'
import { useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Dashboard' },
  { to: '/calendar', label: 'Kalender' },
  { to: '/bookings', label: 'Bokningar' },
  { to: '/customers', label: 'Kunder' },
  { to: '/services', label: 'Tjänster' },
  { to: '/staff', label: 'Personal' },
  { to: '/settings', label: 'Inställningar' },
]

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation()

  const currentPage = navItems.find(
    (n) =>
      n.to === location.pathname ||
      (n.to !== '/' && location.pathname.startsWith(n.to))
  )

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm lg:px-6">
      <button className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </button>
      <h2 className="text-sm font-medium text-muted-foreground">
        {currentPage?.label ?? ''}
      </h2>
    </header>
  )
}