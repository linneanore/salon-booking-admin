/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, } from 'react'
import type { ReactNode } from 'react'
import type { Booking, Customer, Service, Stylist } from '@/types'
import { mockBookings, mockCustomers, mockServices, mockStylists } from '@/data/mockData'

interface DataContextType {
  bookings: Booking[]
  customers: Customer[]
  services: Service[]
  stylists: Stylist[]
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateBooking: (id: string, updates: Partial<Booking>) => void
  deleteBooking: (id: string) => void
  getCustomerName: (id: string) => string
  getStylistName: (id: string) => string
  getServiceName: (id: string) => string
  getService: (id: string) => Service | undefined
}

const DataContext = createContext<DataContextType | null>(null)

let nextId = 100 // Simple ID generator

export function DataProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [customers] = useState<Customer[]>(mockCustomers)
  const [services] = useState<Service[]>(mockServices)
  const [stylists] = useState<Stylist[]>(mockStylists)

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newBooking: Booking = {
      ...booking,
      id: `b${nextId++}`,
      createdAt: now,
      updatedAt: now,
    }
    setBookings(prev => [...prev, newBooking])
  }

  const updateBooking = (id: string, updates: Partial<Booking>) => {
    setBookings(prev =>
      prev.map(b =>
        b.id === id
          ? { ...b, ...updates, updatedAt: new Date().toISOString() }
          : b
      )
    )
  }

  const deleteBooking = (id: string) => {
    setBookings(prev => prev.filter(b => b.id !== id))
  }

  const getCustomerName = (id: string) => customers.find(c => c.id === id)?.name || 'Okänd'
  const getStylistName = (id: string) => stylists.find(s => s.id === id)?.name || 'Okänd'
  const getServiceName = (id: string) => services.find(s => s.id === id)?.name || 'Okänd'
  const getService = (id: string) => services.find(s => s.id === id)

  return (
    <DataContext.Provider
      value={{
        bookings,
        customers,
        services,
        stylists,
        addBooking,
        updateBooking,
        deleteBooking,
        getCustomerName,
        getStylistName,
        getServiceName,
        getService,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

// Hook export at the bottom
export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}