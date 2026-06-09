import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useData } from '@/hooks/useData'
import { format, addDays, startOfWeek, isSameDay } from 'date-fns'
import { sv } from 'date-fns/locale'

const HOURS = Array.from({ length: 9 }, (_, i) => i + 9)

export default function Calendar() {

  const [currentDate, setCurrentDate] = useState(new Date())
  const { bookings, getCustomerName, getServiceName, stylists } = useData()

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  function navigate(direction: 'prev' | 'next') {
    setCurrentDate(prev => addDays(prev, direction === 'next' ? 7 : -7))
  }

  function getBookingsForDay(date: Date) {
    return bookings.filter(b => isSameDay(new Date(b.startTime), date))
  }

  function statusColor(status: string) {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 border-blue-300 text-blue-800'
      case 'pending': return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'completed': return 'bg-green-100 border-green-300 text-green-800'
      case 'cancelled': return 'bg-red-100 border-red-300 text-red-800'
      default: return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Sidhuvud med navigation */}
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Kalender</h1>
          <p className="page-description">
            {format(weekStart, 'd MMM', { locale: sv })} –{' '}
            {format(addDays(weekStart, 6), 'd MMM yyyy', { locale: sv })}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => navigate('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
            Idag
          </Button>
          <Button variant="outline" size="icon" onClick={() => navigate('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Kalenderrutnät */}
      <div className="rounded-xl border bg-card overflow-auto">
        {/* Dagkolumner — rubrikrad */}
        <div className="grid border-b" style={{ gridTemplateColumns: '60px repeat(7, 1fr)' }}>
          <div className="p-2" /> {/* Tom cell för tidskolumnen */}
          {weekDays.map(day => (
            <div
              key={day.toISOString()}
              className={`p-3 text-center border-l ${isSameDay(day, new Date()) ? 'bg-primary/5' : ''}`}
            >
              <p className="text-xs text-muted-foreground uppercase">
                {format(day, 'EEE', { locale: sv })}
              </p>
              <p className={`text-lg font-semibold ${isSameDay(day, new Date()) ? 'text-primary' : ''}`}>
                {format(day, 'd')}
              </p>
            </div>
          ))}
        </div>

        {/* Tidsrader */}
        {HOURS.map(hour => (
          <div
            key={hour}
            className="grid border-b last:border-b-0"
            style={{ gridTemplateColumns: '60px repeat(7, 1fr)', minHeight: '80px' }}
          >
            {/* Tidsstämpel */}
            <div className="p-2 text-xs text-muted-foreground text-right pr-3 pt-2">
              {hour}:00
            </div>

            {/* En cell per dag */}
            {weekDays.map(day => {
              const dayBookings = getBookingsForDay(day).filter(b => {
                const bookingHour = new Date(b.startTime).getHours()
                return bookingHour === hour
              })

              return (
                <div
                  key={day.toISOString()}
                  className={`border-l p-1 space-y-1 ${isSameDay(day, new Date()) ? 'bg-primary/5' : ''}`}
                >
                  {dayBookings.map(booking => (
                    <div
                      key={booking.id}
                      className={`rounded border p-1 text-xs cursor-pointer ${statusColor(booking.status)}`}
                    >
                      <p className="font-medium truncate">{getCustomerName(booking.customerId)}</p>
                      <p className="truncate opacity-75">{getServiceName(booking.serviceId)}</p>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Förklaring av färger */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-200 border border-blue-300" /> Bekräftad</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-yellow-200 border border-yellow-300" /> Väntande</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-200 border border-green-300" /> Slutförd</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-200 border border-red-300" /> Avbokad</span>
      </div>
    </div>
  )
}