# Components

## Folder Structure

- **ui/** - shadcn/ui components (auto-generated, don't edit directly)
- **layout/** - Layout components (Sidebar, Header, AppLayout)
- **shared/** - Reusable components across features

## Shared Components

### StatusBadge
Displays booking status with color coding.

**Usage:**
\`\`\`tsx
import { StatusBadge } from '@/components/shared/StatusBadge'

<StatusBadge status="confirmed" />
\`\`\`

**Statuses:**
- `pending` - Amber (Väntande)
- `confirmed` - Blue (Bekräftad)
- `completed` - Green (Slutförd)
- `cancelled` - Red (Avbokad)
- `noshow` - Gray (No-show)

### Toaster
Toast notification system.

**Usage:**
\`\`\`tsx
import { toast } from 'sonner'

// Success
toast.success('Operation successful!')

// Error
toast.error('Something went wrong')

// Info
toast('This is a message')
\`\`\`

## UI Components (shadcn/ui)

All components in `ui/` folder are from shadcn/ui.
- Can be customized by editing the files
- Styled with Tailwind
- Built on Radix UI primitives

See: https://ui.shadcn.com/docs/components