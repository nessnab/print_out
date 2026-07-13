import HomePage from "./pages/HomePage"
import LoginPage from "./features/auth/LoginPage"

import { useAuthContext } from "./features/auth/AuthProvider"
import { Loader2 } from "lucide-react"

export default function App() {
  const { user, loading } =
    useAuthContext()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <LoginPage />
  }

  return <HomePage />
}