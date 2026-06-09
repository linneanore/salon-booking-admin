const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5284/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`API-fel: ${response.status}`)
  }

  if (response.status === 204) return null as T

  return response.json()
}

// customers
export const customersApi = {
  getAll: () => request<Customer[]>('/customers'),
  create: (data: Omit<Customer, 'id' | 'createdAt'>) =>
    request<Customer>('/customers', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Customer>) =>
    request<void>(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/customers/${id}`, { method: 'DELETE' }),
}

// bookings
export const bookingsApi = {
  getAll: () => request<Booking[]>('/bookings'),
  create: (data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) =>
    request<Booking>('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Booking>) =>
    request<void>(`/bookings/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    request<void>(`/bookings/${id}`, { method: 'DELETE' }),
}

// Importera typer
import type { Customer, Booking } from '@/types'