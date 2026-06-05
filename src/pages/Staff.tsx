import { useState } from 'react'
import { Users, Plus, Search, Clock, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useData } from '@/context/DataContext'

const DAYS = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör']

export default function Staff() {
  const [search, setSearch] = useState('')
  const { stylists } = useData()

  const filtered = stylists.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="animate-fade-in space-y-6">
      {/* Sidhuvud */}
      <div className="flex items-center justify-between">
        <div className="page-header">
          <h1 className="page-title">Personal</h1>
          <p className="page-description">{stylists.length} aktiva stylister</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Ny stylist
        </Button>
      </div>

      {/* Sökfält */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Sök på namn eller titel..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Stylistkort */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map(stylist => (
          <div key={stylist.id} className="rounded-xl border bg-card p-5 space-y-4">

            {/* Namn och titel */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{stylist.name}</h3>
                <p className="text-sm text-muted-foreground">{stylist.title}</p>
              </div>
              {stylist.isActive ? (
                <Badge variant="secondary" className="gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  Aktiv
                </Badge>
              ) : (
                <Badge variant="outline" className="gap-1">
                  <XCircle className="h-3 w-3" />
                  Inaktiv
                </Badge>
              )}
            </div>

            {/* Arbetstider */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                Arbetstider
              </p>
              <div className="space-y-1">
                {stylist.workingHours
                  .filter(wh => wh.enabled)
                  .map(wh => (
                    <div key={wh.dayOfWeek} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{DAYS[wh.dayOfWeek]}</span>
                      <span>{wh.startTime} – {wh.endTime}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Raster */}
            {stylist.breaks.length > 0 && (
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
                  Raster
                </p>
                {stylist.breaks.map((b, i) => (
                  <span key={i} className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    {b.startTime} – {b.endTime}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}