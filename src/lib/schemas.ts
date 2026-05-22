import { z } from 'zod'

export const bookingFormSchema = z.object({
  customerId: z.string().min(1, 'Välj en kund'),
  serviceId: z.string().min(1, 'Välj en behandling'),
  stylistId: z.string().min(1, 'Välj en stylist'),
  date: z.string().min(1, 'Välj ett datum'),
  time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Ogiltig tid'),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled', 'noshow']),
  internalNote: z.string().optional(),
})

export type BookingFormData = z.infer<typeof bookingFormSchema>