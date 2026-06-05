import { useState } from 'react'
import { Sparkles, Plus, Search, Clock, Tag } from 'lucide-react'
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

export default function Services() {
  const [search, setSearch] = useState('')
  const { services } = useData()

  const categories = [...new Set(services.map(s => s.category))]

  const filtered = services.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.category.toLowerCase().includes(search.toLowerCase())
  )

  function formatDuration(minutes: number) {
    if (minutes < 60) return `${minutes} min`
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return m > 0 ? `${h} tim ${m} min` : `${h} tim`
  }

  return (
    <div className="animate-fade-in space-y-6">
      {/* Sidhuvud */}
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Tjänster</h1>
          <p className="page-description">{services.length} tjänster · {categories.length} kategorier</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ny tjänst
        </Button>
      </div>

      {/* Statistikkort per kategori */}
      <div className="grid grid-cols-3 gap-4">
        {categories.map(cat => {
          const count = services.filter(s => s.category === cat).length
          return (
            <div key={cat} className="rounded-xl border bg-card p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="h-4 w-4" />
                <span className="text-sm">{cat}</span>
              </div>
              <p className="mt-1 text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">tjänster</p>
            </div>
          )
        })}
      </div>

      {/* Sökfält */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Sök på namn eller kategori..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Tjänsttabell */}
      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tjänst</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Beskrivning</TableHead>
              <TableHead>Tid</TableHead>
              <TableHead className="text-right">Pris</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  <Sparkles className="mx-auto mb-2 h-8 w-8 opacity-30" />
                  Inga tjänster hittades
                </TableCell>
              </TableRow>
            ) : (
              filtered.map(service => (
                <TableRow key={service.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">{service.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{service.category}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {service.description}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 text-sm">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {formatDuration(service.durationMinutes)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {service.price.toLocaleString('sv-SE')} kr
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