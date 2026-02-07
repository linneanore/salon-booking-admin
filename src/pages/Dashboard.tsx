import { CalendarDays, Clock, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { toast } from 'sonner'
import { mockBookings, mockCustomers, mockStylists, mockServices } from '@/data/mockData'
import { formatTime, formatCurrency, isSameDay } from '@/lib/format'

export default function Dashboard() {
  // Calculate stats from mock data
  const today = new Date()
  const todayBookings = mockBookings.filter(b => isSameDay(new Date(b.startTime), today))
  const upcomingBookings = mockBookings.filter(b => {
    const bookingDate = new Date(b.startTime)
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
    return bookingDate >= today && bookingDate <= weekFromNow && b.status !== 'cancelled'
  })
  const cancelledCount = mockBookings.filter(b => b.status === 'cancelled').length

  // Helper functions to get names
  const getCustomerName = (id: string) => mockCustomers.find(c => c.id === id)?.name || 'Okänd'
  const getStylistName = (id: string) => mockStylists.find(s => s.id === id)?.name || 'Okänd'
  const getServiceName = (id: string) => mockServices.find(s => s.id === id)?.name || 'Okänd'

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
                <p className="text-2xl font-bold">{todayBookings.length}</p>
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
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
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
                <p className="text-2xl font-bold">{cancelledCount}</p>
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
                <p className="text-2xl font-bold">{mockCustomers.length}</p>
                <p className="text-xs text-muted-foreground">Kunder</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Bookings and Popular Services */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Today's Bookings Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Dagens bokningar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {todayBookings.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                Inga bokningar idag
              </div>
            ) : (
              <div className="divide-y">
                {todayBookings
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map(booking => (
                    <div key={booking.id} className="flex items-center gap-4 px-5 py-3">
                      <div className="text-sm font-medium tabular-nums text-muted-foreground">
                        {formatTime(booking.startTime)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-sm font-medium">
                          {getCustomerName(booking.customerId)}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {getServiceName(booking.serviceId)} · {getStylistName(booking.stylistId)}
                        </p>
                      </div>
                      <StatusBadge status={booking.status} />
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Popular Services */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-lg">Populära behandlingar</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {mockServices.slice(0, 4).map(service => {
                const bookingCount = mockBookings.filter(
                  b => b.serviceId === service.id
                ).length

                return (
                  <div key={service.id} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(service.price)}
                      </p>
                    </div>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium">
                      {bookingCount} {bookingCount === 1 ? 'bokning' : 'bokningar'}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}