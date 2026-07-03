import SummaryCards from "./components/SummaryCards"
import NewOrderForm from "./components/NewOrderForm"
import OrdersList from "./components/OrdersList"

export default function HomePage() {
  return (
    <main className="mx-auto min-h-screen max-w-md space-y-6 bg-zinc-50 p-4">
      <header>
        <h1 className="text-3xl font-bold">
          PrintOut
        </h1>

        <p className="text-sm text-muted-foreground">
          Print Shop Dashboard
        </p>
      </header>

      <SummaryCards />

      <NewOrderForm />

      <OrdersList />
    </main>
  )
}