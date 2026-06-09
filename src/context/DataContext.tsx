import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Booking, Customer, Service, Stylist } from '@/types'
import { mockServices, mockStylists } from '@/data/mockData'
import { customersApi, bookingsApi } from '@/lib/api'

interface DataContextType {
  bookings: Booking[]
  customers: Customer[]
  services: Service[]
  stylists: Stylist[]
  isLoading: boolean
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateBooking: (id: string, updates: Partial<Booking>) => Promise<void>
  deleteBooking: (id: string) => Promise<void>
  getCustomerName: (id: string) => string
  getStylistName: (id: string) => string
  getServiceName: (id: string) => string
  getService: (id: string) => Service | undefined
}

export const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [services] = useState<Service[]>(mockServices)
  const [stylists] = useState<Stylist[]>(mockStylists)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const [fetchedCustomers, fetchedBookings] = await Promise.all([
          customersApi.getAll(),
          bookingsApi.getAll(),
        ])
        setCustomers(fetchedCustomers)
        setBookings(fetchedBookings)
      } catch (error) {
        console.error('Kunde inte hämta data från API:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const addBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newBooking = await bookingsApi.create(booking)
    setBookings(prev => [...prev, newBooking])
  }

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    const existing = bookings.find(b => b.id === id)
    if (!existing) return
    await bookingsApi.update(id, { ...existing, ...updates })
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, ...updates } : b)
    )
  }

  const deleteBooking = async (id: string) => {
    await bookingsApi.delete(id)
    setBookings(prev => prev.filter(b => b.id !== id))
  }

  const getCustomerName = (id: string) => customers.find(c => c.id === id)?.name || 'Okänd'
  const getStylistName = (id: string) => stylists.find(s => s.id === id)?.name || 'Okänd'
  const getServiceName = (id: string) => services.find(s => s.id === id)?.name || 'Okänd'
  const getService = (id: string) => services.find(s => s.id === id)

  return (
    <DataContext.Provider value={{
      bookings,
      customers,
      services,
      stylists,
      isLoading,
      addBooking,
      updateBooking,
      deleteBooking,
      getCustomerName,
      getStylistName,
      getServiceName,
      getService,
    }}>
      {children}
    </DataContext.Provider>
  )
}
