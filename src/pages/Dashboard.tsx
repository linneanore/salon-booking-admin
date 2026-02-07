import { CalendarDays, Clock, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { toast } from 'sonner'

export default function Dashboard() {
  const handleNewBooking = () => {
    toast.success('Ny bokning öppnas snart!')
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-description">
          Välkommen tillbaka! Här är en överblick av din salong.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-3">
        <Button onClick={handleNewBooking} className="gap-2">
          <CalendarDays className="h-4 w-4" />
          Ny bokning
        </Button>
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          Blocka tid
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Today's Bookings */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-salon-rose-light">
                <CalendarDays className="h-5 w-5 text-salon-rose" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Idag</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Bookings */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-salon-info-light">
                <Clock className="h-5 w-5 text-salon-info" />
              </div>
              <div>
                <p className="text-2xl font-bold">24</p>
                <p className="text-xs text-muted-foreground">Kommande 7 dagar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cancellations */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-salon-warning-light">
                <TrendingUp className="h-5 w-5 text-salon-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Avbokningar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Total Customers */}
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-salon-success-light">
                <Users className="h-5 w-5 text-salon-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Kunder</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Bookings Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Dagens bokningar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {/* Sample booking 1 */}
              <div className="flex items-center gap-4 px-5 py-3">
                <div className="text-sm font-medium tabular-nums text-muted-foreground">
                  09:00
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">Maria Svensson</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Klippning Dam · Anna Lindqvist
                  </p>
                </div>
                <StatusBadge status="confirmed" />
              </div>

              {/* Sample booking 2 */}
              <div className="flex items-center gap-4 px-5 py-3">
                <div className="text-sm font-medium tabular-nums text-muted-foreground">
                  10:30
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">Erik Johansson</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Färgning · Sofia Berg
                  </p>
                </div>
                <StatusBadge status="pending" />
              </div>

              {/* Sample booking 3 */}
              <div className="flex items-center gap-4 px-5 py-3">
                <div className="text-sm font-medium tabular-nums text-muted-foreground">
                  13:00
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium">Lisa Pettersson</p>
                  <p className="truncate text-xs text-muted-foreground">
                    Behandling · Anna Lindqvist
                  </p>
                </div>
                <StatusBadge status="confirmed" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Popular Services */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Populära behandlingar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              <div className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium">Klippning Dam</p>
                  <p className="text-xs text-muted-foreground">650 kr</p>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                  12 bokningar
                </span>
              </div>

              <div className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium">Färgning</p>
                  <p className="text-xs text-muted-foreground">1 800 kr</p>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                  8 bokningar
                </span>
              </div>

              <div className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium">Klippning Herr</p>
                  <p className="text-xs text-muted-foreground">400 kr</p>
                </div>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                  6 bokningar
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}