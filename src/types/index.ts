// Booking status types
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'noshow'

// Blocked time reasons
export type BlockedTimeReason = 'vacation' | 'lunch' | 'closed' | 'other'

// User roles (for future authentication)
export type UserRole = 'admin' | 'staff'

// Working hours for a specific day
export interface WorkingHours {
  dayOfWeek: number
  startTime: string
  endTime: string
  enabled: boolean
}

// Break time during the day
export interface BreakTime {
  startTime: string
  endTime: string
}

// Stylist (hairdresser) model
export interface Stylist {
  id: string
  name: string
  profileImage?: string
  title: string
  workingHours: WorkingHours[]
  breaks: BreakTime[]
  isActive: boolean
}

// Service (treatment) model
export interface Service {
  id: string
  name: string
  description: string
  durationMinutes: number
  price: number // in SEK (Swedish Krona)
  category: string
  isActive: boolean
}

// Customer model
export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  notes: string
  allergies: string
  createdAt: string
}

// Booking model
export interface Booking {
  id: string
  customerId: string
  stylistId: string
  serviceId: string
  startTime: string
  endTime: string
  status: BookingStatus
  internalNote: string
  createdAt: string
  updatedAt: string
  updatedBy?: string // User ID who last updated
}

// Blocked time (vacation, lunch breaks, etc.)
export interface BlockedTime {
  id: string
  stylistId: string
  startTime: string // ISO datetime string
  endTime: string   // ISO datetime string
  reason: BlockedTimeReason
  note?: string
}

// Salon settings
export interface SalonSettings {
  name: string
  address: string
  phone: string
  email: string
  openingHours: WorkingHours[]
}