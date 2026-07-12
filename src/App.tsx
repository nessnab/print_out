import HomePage from "./pages/HomePage"
import LoginPage from "./features/auth/LoginPage"

import { useAuthContext } from "./features/auth/AuthProvider"

export default function App() {
  const { user, loading } =
    useAuthContext()

  if (loading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <LoginPage />
  }

  return <HomePage />
}