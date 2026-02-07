import { useState, useMemo, useEffect } from 'react'
import { Search, Plus, ClipboardList } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { StatusBadge } from '@/components/shared/StatusBadge'
import { mockBookings, mockCustomers, mockStylists, mockServices } from '@/data/mockData'
import { formatDate, formatTime, statusLabels } from '@/lib/format'
import type { BookingStatus, Booking } from '@/types'
import { toast } from 'sonner'

export default function Bookings() {
  // State for filters
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [stylistFilter, setStylistFilter] = useState<string>('all')

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K to focus search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector('input[placeholder*="Sök"]')?.focus()
      }
      
      // Cmd/Ctrl + Enter to create new booking
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        handleNewBooking()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Helper functions to get names
  const getCustomerName = (id: string) => mockCustomers.find(c => c.id === id)?.name || 'Okänd'
  const getStylistName = (id: string) => mockStylists.find(s => s.id === id)?.name || 'Okänd'
  const getServiceName = (id: string) => mockServices.find(s => s.id === id)?.name || 'Okänd'

  // Filter and search bookings
  const filteredBookings = useMemo(() => {
    let result = [...mockBookings]

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter(b => b.status === statusFilter)
    }

    // Filter by stylist
    if (stylistFilter !== 'all') {
      result = result.filter(b => b.stylistId === stylistFilter)
    }

    // Search by customer, service, or stylist name
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(b => {
        const customerName = getCustomerName(b.customerId).toLowerCase()
        const serviceName = getServiceName(b.serviceId).toLowerCase()
        const stylistName = getStylistName(b.stylistId).toLowerCase()
        
        return (
          customerName.includes(query) ||
          serviceName.includes(query) ||
          stylistName.includes(query)
        )
      })
    }

    // Sort by start time (newest first)
    result.sort((a, b) => b.startTime.localeCompare(a.startTime))

    return result
  }, [searchQuery, statusFilter, stylistFilter])

  const handleNewBooking = () => {
    toast.success('Bokningsformulär öppnas i nästa milestone!')
  }

  const handleBookingClick = (booking: Booking) => {
    toast.info(`Detaljer för ${getCustomerName(booking.customerId)} visas snart`)
  }

  return (
    <div className="animate-fade-in space-y-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Bokningar</h1>
          <p className="page-description">
            {mockBookings.length} {mockBookings.length === 1 ? 'bokning' : 'bokningar'} totalt
          </p>
        </div>
        <Button onClick={handleNewBooking} className="gap-2">
          <Plus className="h-4 w-4" />
          Ny bokning
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Sök kund, behandling, stylist..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla status</SelectItem>
            <SelectItem value="pending">{statusLabels.pending}</SelectItem>
            <SelectItem value="confirmed">{statusLabels.confirmed}</SelectItem>
            <SelectItem value="completed">{statusLabels.completed}</SelectItem>
            <SelectItem value="cancelled">{statusLabels.cancelled}</SelectItem>
            <SelectItem value="noshow">{statusLabels.noshow}</SelectItem>
          </SelectContent>
        </Select>

        {/* Stylist Filter */}
        <Select value={stylistFilter} onValueChange={setStylistFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Stylist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Alla stylister</SelectItem>
            {mockStylists
              .filter(s => s.isActive)
              .map(stylist => (
                <SelectItem key={stylist.id} value={stylist.id}>
                  {stylist.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      {(searchQuery || statusFilter !== 'all' || stylistFilter !== 'all') && (
        <p className="text-sm text-muted-foreground">
          Visar {filteredBookings.length} av {mockBookings.length} bokningar
        </p>
      )}

      {/* Table or Empty State */}
      {filteredBookings.length === 0 ? (
        <div className="empty-state">
          <ClipboardList className="h-10 w-10 text-muted-foreground/40" />
          <p className="text-sm text-muted-foreground">
            {searchQuery || statusFilter !== 'all' || stylistFilter !== 'all'
              ? 'Inga bokningar matchar filtret'
              : 'Inga bokningar ännu'}
          </p>
          {(searchQuery || statusFilter !== 'all' || stylistFilter !== 'all') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('')
                setStatusFilter('all')
                setStylistFilter('all')
              }}
            >
              Rensa filter
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-xl border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Datum & Tid</TableHead>
                <TableHead>Kund</TableHead>
                <TableHead>Behandling</TableHead>
                <TableHead>Stylist</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Åtgärder</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map(booking => (
                <TableRow
                  key={booking.id}
                  className="cursor-pointer"
                  onClick={() => handleBookingClick(booking)}
                >
                  <TableCell>
                    <div>
                      <p className="font-medium">{formatDate(booking.startTime)}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {getCustomerName(booking.customerId)}
                  </TableCell>
                  <TableCell>{getServiceName(booking.serviceId)}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {getStylistName(booking.stylistId)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        toast.info('Redigera öppnas snart')
                      }}
                    >
                      Visa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}