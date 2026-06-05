import { useState } from 'react'
import { Users, Plus, Search, Phone, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useData } from '@/context/DataContext'
import { format } from 'date-fns'
import { sv } from 'date-fns/locale'

export default function Customers() {

  const [search, setSearch] = useState('')

  const { customers } = useData()

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search)
  )

  return (
    <div className="animate-fade-in space-y-6">
      {/* Sidhuvud */}
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Kunder</h1>
          <p className="page-description">{customers.length} kunder registrerade</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ny kund
        </Button>
      </div>

      {/* Sökfält */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Sök på namn, e-post eller telefon..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Kundtabell */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Namn</TableHead>
              <TableHead>Kontakt</TableHead>
              <TableHead>Anteckningar</TableHead>
              <TableHead>Allergier</TableHead>
              <TableHead>Kund sedan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  <Users className="mx-auto mb-2 h-8 w-8 opacity-30" />
                  Inga kunder hittades
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(customer => (
                <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3 text-muted-foreground" />
                        {customer.phone}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {customer.notes || '—'}
                  </TableCell>
                  <TableCell>
                    {customer.allergies ? (
                      <Badge variant="destructive" className="text-xs">
                        {customer.allergies}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Inga</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(customer.createdAt), 'd MMM yyyy', { locale: sv })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}