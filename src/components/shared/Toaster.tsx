import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        classNames: {
          toast: 'bg-card border-border',
          title: 'text-foreground',
          description: 'text-muted-foreground',
          error: 'bg-destructive text-destructive-foreground',
          success: 'bg-salon-success text-white',
        },
      }}
    />
  )
}