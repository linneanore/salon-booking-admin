import type { Stylist, Service, Customer, Booking, BlockedTime, SalonSettings } from '@/types'

// Helper to generate today's date strings
const today = new Date()
const todayStr = today.toISOString().split('T')[0] // "2025-02-06"

// Default working hours (Monday-Friday 9-17, weekends off)
const defaultWorkingHours = [
  { dayOfWeek: 0, startTime: '00:00', endTime: '00:00', enabled: false }, // Sunday
  { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', enabled: true },  // Monday
  { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', enabled: true },  // Tuesday
  { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', enabled: true },  // Wednesday
  { dayOfWeek: 4, startTime: '09:00', endTime: '18:00', enabled: true },  // Thursday (longer)
  { dayOfWeek: 5, startTime: '09:00', endTime: '16:00', enabled: true },  // Friday (shorter)
  { dayOfWeek: 6, startTime: '00:00', endTime: '00:00', enabled: false }, // Saturday
]

// Mock Stylists
export const mockStylists: Stylist[] = [
  {
    id: 's1',
    name: 'Anna Lindqvist',
    profileImage: '',
    title: 'Senior Stylist',
    workingHours: defaultWorkingHours,
    breaks: [{ startTime: '12:00', endTime: '12:30' }],
    isActive: true,
  },
  {
    id: 's2',
    name: 'Erik Johansson',
    profileImage: '',
    title: 'Colorist',
    workingHours: defaultWorkingHours,
    breaks: [{ startTime: '12:00', endTime: '12:30' }],
    isActive: true,
  },
  {
    id: 's3',
    name: 'Sofia Berg',
    profileImage: '',
    title: 'Junior Stylist',
    workingHours: [
      ...defaultWorkingHours.slice(0, 5),
      { dayOfWeek: 5, startTime: '10:00', endTime: '15:00', enabled: true }, // Shorter Friday
      { dayOfWeek: 6, startTime: '00:00', endTime: '00:00', enabled: false },
    ],
    breaks: [{ startTime: '12:30', endTime: '13:00' }],
    isActive: true,
  },
]

// Mock Services
export const mockServices: Service[] = [
  {
    id: 'sv1',
    name: 'Klippning Dam',
    description: 'Klippning inkl. tvätt och styling',
    durationMinutes: 60,
    price: 650,
    category: 'Klippning',
    isActive: true,
  },
  {
    id: 'sv2',
    name: 'Klippning Herr',
    description: 'Herrklippning inkl. tvätt',
    durationMinutes: 30,
    price: 400,
    category: 'Klippning',
    isActive: true,
  },
  {
    id: 'sv3',
    name: 'Färgning Helfärg',
    description: 'Helfärgning med premiumfärg',
    durationMinutes: 120,
    price: 1800,
    category: 'Färgning',
    isActive: true,
  },
  {
    id: 'sv4',
    name: 'Slingor Halvhuvud',
    description: 'Slingor halvhuvud',
    durationMinutes: 90,
    price: 1400,
    category: 'Färgning',
    isActive: true,
  },
  {
    id: 'sv5',
    name: 'Behandling Olaplex',
    description: 'Olaplex behandling för skadat hår',
    durationMinutes: 45,
    price: 500,
    category: 'Behandling',
    isActive: true,
  },
  {
    id: 'sv6',
    name: 'Barnklippning',
    description: 'Klippning barn under 12 år',
    durationMinutes: 30,
    price: 300,
    category: 'Klippning',
    isActive: true,
  },
]

// Mock Customers
export const mockCustomers: Customer[] = [
  {
    id: 'c1',
    name: 'Maria Svensson',
    phone: '070-123 45 67',
    email: 'maria@example.com',
    notes: 'Föredrar naturliga nyanser',
    allergies: '',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'c2',
    name: 'Karl Andersson',
    phone: '073-987 65 43',
    email: 'karl@example.com',
    notes: '',
    allergies: 'PPD-allergi',
    createdAt: '2024-03-20T14:30:00Z',
  },
  {
    id: 'c3',
    name: 'Lisa Pettersson',
    phone: '076-555 12 34',
    email: 'lisa@example.com',
    notes: 'Stamkund sedan 2022',
    allergies: '',
    createdAt: '2022-06-10T09:00:00Z',
  },
  {
    id: 'c4',
    name: 'Johan Nilsson',
    phone: '072-111 22 33',
    email: 'johan@example.com',
    notes: '',
    allergies: '',
    createdAt: '2024-09-01T11:00:00Z',
  },
  {
    id: 'c5',
    name: 'Emma Gustavsson',
    phone: '070-444 55 66',
    email: 'emma@example.com',
    notes: 'Vill alltid ha latte',
    allergies: 'Känslig hårbotten',
    createdAt: '2023-11-05T15:00:00Z',
  },
]

// Mock Bookings (today's schedule)
export const mockBookings: Booking[] = [
  {
    id: 'b1',
    customerId: 'c1',
    stylistId: 's1',
    serviceId: 'sv1',
    startTime: `${todayStr}T09:00:00Z`,
    endTime: `${todayStr}T10:00:00Z`,
    status: 'confirmed',
    internalNote: '',
    createdAt: '2025-02-01T08:00:00Z',
    updatedAt: '2025-02-01T08:00:00Z',
  },
  {
    id: 'b2',
    customerId: 'c2',
    stylistId: 's2',
    serviceId: 'sv2',
    startTime: `${todayStr}T10:00:00Z`,
    endTime: `${todayStr}T10:30:00Z`,
    status: 'confirmed',
    internalNote: 'Ny kund',
    createdAt: '2025-02-02T09:00:00Z',
    updatedAt: '2025-02-02T09:00:00Z',
  },
  {
    id: 'b3',
    customerId: 'c3',
    stylistId: 's1',
    serviceId: 'sv3',
    startTime: `${todayStr}T10:30:00Z`,
    endTime: `${todayStr}T12:30:00Z`,
    status: 'pending',
    internalNote: '',
    createdAt: '2025-02-03T10:00:00Z',
    updatedAt: '2025-02-03T10:00:00Z',
  },
  {
    id: 'b4',
    customerId: 'c5',
    stylistId: 's3',
    serviceId: 'sv5',
    startTime: `${todayStr}T13:00:00Z`,
    endTime: `${todayStr}T13:45:00Z`,
    status: 'confirmed',
    internalNote: '',
    createdAt: '2025-02-04T11:00:00Z',
    updatedAt: '2025-02-04T11:00:00Z',
  },
  {
    id: 'b5',
    customerId: 'c4',
    stylistId: 's2',
    serviceId: 'sv2',
    startTime: `${todayStr}T14:00:00Z`,
    endTime: `${todayStr}T14:30:00Z`,
    status: 'pending',
    internalNote: '',
    createdAt: '2025-02-05T12:00:00Z',
    updatedAt: '2025-02-05T12:00:00Z',
  },
  {
    id: 'b6',
    customerId: 'c1',
    stylistId: 's3',
    serviceId: 'sv6',
    startTime: `${todayStr}T15:00:00Z`,
    endTime: `${todayStr}T15:30:00Z`,
    status: 'completed',
    internalNote: '',
    createdAt: '2025-02-06T08:00:00Z',
    updatedAt: '2025-02-06T08:00:00Z',
  },
  {
    id: 'b7',
    customerId: 'c3',
    stylistId: 's2',
    serviceId: 'sv4',
    startTime: `${todayStr}T11:00:00Z`,
    endTime: `${todayStr}T12:30:00Z`,
    status: 'confirmed',
    internalNote: '',
    createdAt: '2025-02-05T14:00:00Z',
    updatedAt: '2025-02-05T14:00:00Z',
  },
  {
    id: 'b8',
    customerId: 'c4',
    stylistId: 's1',
    serviceId: 'sv1',
    startTime: `${todayStr}T16:00:00Z`,
    endTime: `${todayStr}T17:00:00Z`,
    status: 'cancelled',
    internalNote: 'Kund avbokade i morse',
    createdAt: '2025-02-04T09:00:00Z',
    updatedAt: '2025-02-06T09:30:00Z',
  },
]

// Mock Blocked Times
export const mockBlockedTimes: BlockedTime[] = [
  {
    id: 'bt1',
    stylistId: 's1',
    startTime: `${todayStr}T12:00:00Z`,
    endTime: `${todayStr}T12:30:00Z`,
    reason: 'lunch',
    note: '',
  },
  {
    id: 'bt2',
    stylistId: 's2',
    startTime: `${todayStr}T12:00:00Z`,
    endTime: `${todayStr}T12:30:00Z`,
    reason: 'lunch',
    note: '',
  },
  
]

// Mock Salon Settings
export const mockSalonSettings: SalonSettings = {
  name: 'Studio Bloom',
  address: 'Storgatan 12, 114 51 Stockholm',
  phone: '08-123 456 78',
  email: 'info@studiobloom.se',
  openingHours: defaultWorkingHours,
}