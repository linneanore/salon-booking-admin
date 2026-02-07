import { format, parseISO } from 'date-fns'
import { sv } from 'date-fns/locale'
import type { BookingStatus } from '@/types'

// Format time from ISO string (e.g., "14:30")
export function formatTime(isoString: string): string {
  return format(parseISO(isoString), 'HH:mm')
}

// Format date (e.g., "6 feb 2025")
export function formatDate(isoString: string): string {
  return format(parseISO(isoString), 'd MMM yyyy', { locale: sv })
}

// Format date and time (e.g., "6 feb 2025 14:30")
export function formatDateTime(isoString: string): string {
  return format(parseISO(isoString), 'd MMM yyyy HH:mm', { locale: sv })
}

// Format full date for inputs (e.g., "2025-02-06")
export function formatDateForInput(date: Date): string {
  return format(date, 'yyyy-MM-dd')
}

// Format time for inputs (e.g., "14:30")
export function formatTimeForInput(date: Date): string {
  return format(date, 'HH:mm')
}

// Format currency (Swedish Krona)
export function formatCurrency(amount: number): string {
  return `${amount.toLocaleString('sv-SE')} kr`
}

// Get weekday name in Swedish
export function getWeekdayName(dayOfWeek: number): string {
  const days = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag']
  return days[dayOfWeek] || ''
}

// Check if two dates are the same day
export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

// Status labels in Swedish
export const statusLabels: Record<BookingStatus, string> = {
  pending: 'Väntande',
  confirmed: 'Bekräftad',
  completed: 'Slutförd',
  cancelled: 'Avbokad',
  noshow: 'No-show',
}

// Calculate end time based on start time and duration
export function calculateEndTime(startTime: string, durationMinutes: number): string {
  const start = parseISO(startTime)
  const end = new Date(start.getTime() + durationMinutes * 60000)
  return end.toISOString()
}