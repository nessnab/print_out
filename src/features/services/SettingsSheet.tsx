import { useEffect, useState } from "react"
import { createService, deactivateService, getServices, updateService } from "@/features/services/api"
import type { Service } from "@/types/service"

import { Settings } from "lucide-react"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog" 

export default function SettingsSheet() {
  const [services, setServices] = useState<Service[]>([])
  const [editedServices, setEditedServices] = useState<Service[]>([])

  const [newService, setNewService] = useState({
    name: "",
    price: Number,
    every: Number,
    // unit: "page",
  })

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
  async function handleDeactivate(id: number) {
    try {
      await deactivateService(id)
      await loadServices()

      window.location.reload()

      toast.success("Service deactivated")
    } catch (err) {
      console.error(err)
      toast.error("Failed to deactivate service")
    }
  }

  async function handleCreateService() {
    try {
      await createService(newService)
      console.log(newService);
      await loadServices()
  
      setNewService({
        name: "",
        price: Number,
        every: Number,
      })
  
      toast.success("Service added")

    } catch (error) {
      console.error(error)
      toast.error("Failed to add service")
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
            <Card className="space-y-1 p-4">
              <h2 className="text-base font-semibold">
                Add New Service
              </h2>
              <div className="grid grid-cols-4 gap-3">
                <Input
                  placeholder="Service name"
                  value={newService.name}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      name: e.target.value,
                    })
                  }
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={newService.price}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      price: Number(e.target.value),
                    })
                  }
                />

                <Input
                  type="number"
                  placeholder="Every"
                  value={newService.every}
                  onChange={(e) =>
                    setNewService({
                      ...newService,
                      every: Number(e.target.value),
                    })
                  }
                />
                <Button
                  className=""
                  onClick={handleCreateService}
                >
                  Add Service
                </Button>
              </div>
            </Card>

          <div className="space-y-1">
          {editedServices.map((service) => (
            <div
              key={service.id}
              className="flex space-y-1 p-3"
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
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    className="self-end"
                    variant="destructive"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>

                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Deactivate "{service.name}"?
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                      This service will no longer appear when creating new orders. Existing orders will remain unchanged.
                    </AlertDialogDescription>
                  </AlertDialogHeader>

                  <AlertDialogFooter>
                    <AlertDialogCancel>
                      Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                      onClick={() => handleDeactivate(service.id)}
                    >
                      Deactivate
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
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