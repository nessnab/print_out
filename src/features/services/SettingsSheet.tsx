import { useEffect, useState } from "react"
import { getServices } from "@/features/services/api"
import { updateService } from "@/features/services/api"
import type { Service } from "@/types/service"
// import { updateService } from "../services/api"

import { Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function SettingsSheet() {
  const [services, setServices] = useState<Service[]>([])
  const [editedServices, setEditedServices] = useState<Service[]>([])

  useEffect(() => {
    loadServices()
  }, [])

  async function loadServices() {
    try {
      const data = await getServices()
      setServices(data)
      setEditedServices(data)
    } catch (err) {
      console.error(err)
    }
  }

  function updateServiceField(
    id: number,
    field: keyof Service,
    value: string | number | boolean
  ) {
    setEditedServices((prev) =>
      prev.map((service) =>
        service.id === id
          ? {
              ...service,
              [field]: value,
            }
          : service
      )
    )
  }

  async function handleSave() {
    try {
      await Promise.all(
        editedServices.map((service) =>
          updateService(service)
        )
      )

      toast.success(
        "Settings updated!"
      )

      setServices(editedServices)

    } catch (err) {
      console.error(err)

      toast.error(
        "Failed to save settings."
      )
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="bottom"
        className="mx-auto flex w-full max-w-xl flex-col rounded-t-2xl">
        <SheetHeader className="shrink-0">
          <SheetTitle>
            Manage Services
          </SheetTitle>
        </SheetHeader>

        <div className="min-h-0 flex-1 overflow-y-auto py-4">
          <div className="space-y-4">
          {editedServices.map((service) => (
            <div
              key={service.id}
              className="flex space-y-3 rounded-xl border p-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Name
                </label>

                <Input
                  value={service.name}
                  onChange={(e) =>
                    updateServiceField(
                      service.id,
                      "name",
                      e.target.value
                    )
                  }
                />
              </div>

              <div>
                <label className="text-sm">
                  Price
                </label>

                <Input
                  type="number"
                  value={service.price}
                  onChange={(e) =>
                    updateServiceField(
                      service.id,
                      "price",
                      Number(e.target.value)
                    )
                  }
                />
              </div>

              <div>
                <label className="text-sm">
                  Every
                </label>

                <Input
                  type="number"
                  value={service.every}
                  onChange={(e) =>
                    updateServiceField(
                      service.id,
                      "every",
                      Number(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          ))}
          </div>
        </div>
        {/* Fixed footer */}
        <div className="shrink-0 border-t pt-4">
          <Button
            className="w-full"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </div>

      </SheetContent>
    </Sheet>
  )
}