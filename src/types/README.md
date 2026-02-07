# Type Definitions

All TypeScript interfaces and types for the application.

## Core Types

### BookingStatus
Union type for booking states:
- `pending` - Awaiting confirmation
- `confirmed` - Confirmed booking
- `completed` - Service completed
- `cancelled` - Cancelled by customer/salon
- `noshow` - Customer didn't show up

### BlockedTimeReason
Union type for blocked time reasons:
- `vacation` - Stylist on vacation
- `lunch` - Lunch break
- `closed` - Salon closed
- `other` - Other reason

### UserRole
Union type for user permissions:
- `admin` - Full access
- `staff` - Limited access

## Interfaces

### Stylist
Represents a hairdresser/stylist.

**Key fields:**
- `workingHours` - Array of working hours per day of week
- `breaks` - Array of break times during the day
- `isActive` - Whether stylist is currently active

### Service
Represents a treatment/service offered.

**Key fields:**
- `durationMinutes` - How long the service takes
- `price` - Price in SEK
- `category` - Grouping (Klippning, Färgning, etc.)

### Customer
Represents a salon customer.

**Key fields:**
- `notes` - Staff notes about customer
- `allergies` - Important allergy information
- `createdAt` - When customer was added

### Booking
Represents an appointment.

**Key fields:**
- `startTime` - ISO datetime string
- `endTime` - ISO datetime string (auto-calculated from duration)
- `status` - Current booking status
- `internalNote` - Staff-only notes

### BlockedTime
Represents time when stylist is unavailable.

**Key fields:**
- `reason` - Why the time is blocked
- `note` - Optional additional context

## Usage
```typescript
import { Booking, Customer, BookingStatus } from '@/types'

// Define a variable with type
const booking: Booking = {
  id: 'b1',
  customerId: 'c1',
  // ... other fields
}

// Use in function parameters
function getBookingStatus(booking: Booking): BookingStatus {
  return booking.status
}
```