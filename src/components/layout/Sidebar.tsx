import { Link, useLocation } from 'react-router-dom'
import {
  Scissors,
  Calendar,
  ClipboardList,
  Users,
  Sparkles,
  UserCog,
  Settings,
  LayoutDashboard,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/calendar', label: 'Kalender', icon: Calendar },
  { to: '/bookings', label: 'Bokningar', icon: ClipboardList },
  { to: '/customers', label: 'Kunder', icon: Users },
  { to: '/services', label: 'Tjänster', icon: Sparkles },
  { to: '/staff', label: 'Personal', icon: UserCog },
  { to: '/settings', label: 'Inställningar', icon: Settings },
]

interface SidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export default function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar text-sidebar-foreground transition-transform duration-200 lg:relative lg:translate-x-0',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-sidebar-border px-5">
        <Scissors className="h-6 w-6 text-sidebar-primary" />
        <span className="font-display text-lg font-semibold text-sidebar-primary-foreground">
          Studio Bloom
        </span>
        <button className="ml-auto lg:hidden" onClick={onClose}>
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.to ||
            (item.to !== '/' && location.pathname.startsWith(item.to))

          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground'
              )}
            >
              <item.icon className="h-4.5 w-4.5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-5 py-4">
        <p className="text-xs text-sidebar-foreground/50">© 2025 Studio Bloom</p>
      </div>
    </aside>
  )
}