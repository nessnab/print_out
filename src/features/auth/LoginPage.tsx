import { useState } from "react"

import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { login } from "./api"

import { toast } from "sonner"

export default function LoginPage() {
  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [isLoading, setIsLoading] =
    useState(false)

  async function handleLogin() {
    try {
      setIsLoading(true)

      await login(email, password)

      toast.success("Welcome back!")

    } catch (err) {
      console.error(err)

      toast.error("Invalid email or password.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 p-4">
      <Card className="w-full max-w-sm space-y-5 p-6">

        <div>
          <h1 className="text-3xl font-bold">
            PrintOut
          </h1>

          <p className="text-sm text-muted-foreground">
            Sign in to continue
          </p>
        </div>

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <Button
          className="w-full"
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading
            ? "Signing in..."
            : "Sign In"}
        </Button>

      </Card>
    </main>
  )
}