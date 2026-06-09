import { createContext } from 'react'
import type { Booking, Customer, Service, Stylist } from '@/types'

export interface DataContextType {
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
