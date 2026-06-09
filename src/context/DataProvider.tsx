import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Booking, Customer, Service, Stylist } from '@/types'
import { mockServices, mockStylists } from '@/data/mockData'
import { customersApi, bookingsApi } from '@/lib/api'
import { toast } from 'sonner'
import { DataContext } from '@/context/DataContext'

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
        console.error(error)
        toast.error('Could not connect to server. Please make sure the API is running.')
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const addBooking = async (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newBooking = await bookingsApi.create(booking)
      setBookings(prev => [...prev, newBooking])
      toast.success('Booking created successfully.')
    } catch (error) {
      console.error(error)
      toast.error('Could not create booking. Please try again.')
    }
  }

  const updateBooking = async (id: string, updates: Partial<Booking>) => {
    try {
      const existing = bookings.find(b => b.id === id)
      if (!existing) return
      await bookingsApi.update(id, { ...existing, ...updates })
      setBookings(prev =>
        prev.map(b => b.id === id ? { ...b, ...updates } : b)
      )
      toast.success('Booking updated.')
    } catch (error) {
      console.error(error)
      toast.error('Could not update booking. Please try again.')
    }
  }

  const deleteBooking = async (id: string) => {
    try {
      await bookingsApi.delete(id)
      setBookings(prev => prev.filter(b => b.id !== id))
      toast.success('Booking deleted.')
    } catch (error) {
      console.error(error)
      toast.error('Could not delete booking. Please try again.')
    }
  }

  const getCustomerName = (id: string) => customers.find(c => c.id === id)?.name || 'Okänd'
  const getStylistName = (id: string) => stylists.find(s => s.id === id)?.name || 'Okänd'
  const getServiceName = (id: string) => services.find(s => s.id === id)?.name || 'Okänd'
  const getService = (id: string) => services.find(s => s.id === id)

  return (
    <DataContext.Provider value={{
      bookings, customers, services, stylists, isLoading,
      addBooking, updateBooking, deleteBooking,
      getCustomerName, getStylistName, getServiceName, getService,
    }}>
      {children}
    </DataContext.Provider>
  )
}