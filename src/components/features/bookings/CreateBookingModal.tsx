import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FormField } from '@/components/shared/FormField'
import { useData } from '@/context/DataContext'
import { bookingFormSchema, type BookingFormData } from '@/lib/schemas'
import { calculateEndTime, formatCurrency } from '@/lib/format'
import { toast } from 'sonner'

interface CreateBookingModalProps {
  open: boolean
  onClose: () => void
}

export function CreateBookingModal({ open, onClose }: CreateBookingModalProps) {
  const { customers, services, stylists, addBooking, getService } = useData()
  const [selectedServiceId, setSelectedServiceId] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      status: 'confirmed',
      internalNote: '',
    },
  })

  const selectedService = getService(selectedServiceId)

  const onSubmit = async (data: BookingFormData) => {
  try {
    
    const startTime = `${data.date}T${data.time}:00`
    const endTime = selectedService
      ? calculateEndTime(startTime, selectedService.durationMinutes)
      : startTime

      addBooking({
        customerId: data.customerId,
        serviceId: data.serviceId,
        stylistId: data.stylistId,
        startTime,
        endTime,
        status: data.status,
        internalNote: data.internalNote || '',
      })

      toast.success('Bokning skapad!')
      reset()
      onClose()
    } catch {
      toast.error('Kunde inte skapa bokning')
    }
  }

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ny bokning</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Customer Selection */}
          <FormField label="Kund" required error={errors.customerId?.message}>
            <Select onValueChange={(value) => setValue('customerId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Välj kund" />
              </SelectTrigger>
              <SelectContent>
                {customers.map(customer => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Service Selection */}
          <FormField label="Behandling" required error={errors.serviceId?.message}>
            <Select
              onValueChange={(value) => {
                setValue('serviceId', value)
                setSelectedServiceId(value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Välj behandling" />
              </SelectTrigger>
              <SelectContent>
                {services
                  .filter(s => s.isActive)
                  .map(service => (
                    <SelectItem key={service.id} value={service.id}>
                      <div className="flex items-center justify-between gap-4">
                        <span>{service.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatCurrency(service.price)} · {service.durationMinutes} min
                        </span>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Show service details */}
          {selectedService && (
            <div className="rounded-lg bg-muted p-3 text-sm">
              <p className="font-medium">{selectedService.name}</p>
              <p className="text-muted-foreground">{selectedService.description}</p>
              <div className="mt-2 flex gap-4 text-xs">
                <span>Pris: {formatCurrency(selectedService.price)}</span>
                <span>Tid: {selectedService.durationMinutes} min</span>
              </div>
            </div>
          )}

          {/* Stylist Selection */}
          <FormField label="Stylist" required error={errors.stylistId?.message}>
            <Select onValueChange={(value) => setValue('stylistId', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Välj stylist" />
              </SelectTrigger>
              <SelectContent>
                {stylists
                  .filter(s => s.isActive)
                  .map(stylist => (
                    <SelectItem key={stylist.id} value={stylist.id}>
                      <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-salon-rose-light text-xs font-semibold text-salon-rose">
                          {stylist.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium">{stylist.name}</div>
                          <div className="text-xs text-muted-foreground">{stylist.title}</div>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </FormField>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Datum" required error={errors.date?.message}>
              <Input type="date" {...register('date')} />
            </FormField>

            <FormField label="Tid" required error={errors.time?.message}>
              <Input type="time" {...register('time')} />
            </FormField>
          </div>

          {/* Status */}
          <FormField label="Status" required error={errors.status?.message}>
            <Select
              defaultValue="confirmed"
              onValueChange={(value: BookingFormData['status']) => setValue('status', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Väntande</SelectItem>
                <SelectItem value="confirmed">Bekräftad</SelectItem>
                <SelectItem value="completed">Slutförd</SelectItem>
                <SelectItem value="cancelled">Avbokad</SelectItem>
                <SelectItem value="noshow">No-show</SelectItem>
              </SelectContent>
            </Select>
          </FormField>

          {/* Internal Note */}
          <FormField label="Intern notering">
            <Textarea
              placeholder="Anteckningar för personalen..."
              {...register('internalNote')}
              rows={3}
            />
          </FormField>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Avbryt
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Sparar...' : 'Skapa bokning'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}