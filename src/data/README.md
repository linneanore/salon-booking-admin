# Mock Data

This folder contains mock data for development and testing.

## Files

- **mockData.ts** - Sample data for all entities

## Mock Data Sets

### Stylists (3)
- Anna Lindqvist (Senior Stylist)
- Erik Johansson (Colorist)
- Sofia Berg (Junior Stylist)

Each has:
- Working hours (Mon-Fri, with variations)
- Break times
- Active status

### Services (6)
- Klippning Dam (650 kr, 60 min)
- Klippning Herr (400 kr, 30 min)
- Färgning Helfärg (1800 kr, 120 min)
- Slingor Halvhuvud (1400 kr, 90 min)
- Behandling Olaplex (500 kr, 45 min)
- Barnklippning (300 kr, 30 min)

### Customers (5)
- Maria Svensson
- Karl Andersson (has PPD allergy)
- Lisa Pettersson (loyal customer)
- Johan Nilsson
- Emma Gustavsson (wants coffee)

### Bookings (5)
All scheduled for today at various times with different statuses.

### Blocked Times (2)
Lunch breaks for Anna and Erik (12:00-12:30).

## Usage
```typescript
import { mockBookings, mockCustomers } from '@/data/mockData'

// Get all bookings
const bookings = mockBookings

// Find a specific customer
const customer = mockCustomers.find(c => c.id === 'c1')
```

## Future

This mock data will be replaced with real API calls in later milestones.
For now, it allows us to build and test UI components.