import { useState } from 'react'
import { Save, Building2, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { mockSalonSettings } from '@/data/mockData'

export default function Settings() {
  const [form, setForm] = useState({
    name: mockSalonSettings.name,
    address: mockSalonSettings.address,
    phone: mockSalonSettings.phone,
    email: mockSalonSettings.email,
  })

  function handleChange(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSave() {
    toast.success('Inställningar sparade!')
  }

  return (
    <div className="animate-fade-in space-y-6 max-w-2xl">
      {/* Sidhuvud */}
      <div className="page-header">
        <h1 className="page-title">Inställningar</h1>
        <p className="page-description">Hantera salongens uppgifter</p>
      </div>

      {/* Formulär */}
      <div className="rounded-xl border bg-card p-6 space-y-5">
        <h2 className="font-semibold flex items-center gap-2">
          <Building2 className="h-4 w-4" />
          Salonginformation
        </h2>

        <div className="space-y-2">
          <Label>Salongens namn</Label>
          <Input
            value={form.name}
            onChange={e => handleChange('name', e.target.value)}
            placeholder="Studio Bloom"
          />
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> Adress
          </Label>
          <Input
            value={form.address}
            onChange={e => handleChange('address', e.target.value)}
            placeholder="Storgatan 12, Stockholm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> Telefon
            </Label>
            <Input
              value={form.phone}
              onChange={e => handleChange('phone', e.target.value)}
              placeholder="08-123 456 78"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> E-post
            </Label>
            <Input
              value={form.email}
              onChange={e => handleChange('email', e.target.value)}
              placeholder="info@salong.se"
            />
          </div>
        </div>

        <Button onClick={handleSave} className="gap-2 w-full">
          <Save className="h-4 w-4" />
          Spara inställningar
        </Button>
      </div>
    </div>
  )
}