import { Link, Route } from "@tanstack/react-router"
import React, { useState } from "react"
import { createCode } from "supertokens-auth-react/recipe/passwordless"

import { Button, Input, Label } from "@core/ui"

import { rootRoute } from "#router"

async function sendMagicLink(email: string) {
  try {
    const response = await createCode({
      email,
    })
    if (response.status === "SIGN_IN_UP_NOT_ALLOWED") {
      console.error("Sign in/up is not allowed")
    } else {
      console.info("Please check your email for the magic link")
    }
  } catch (err: unknown) {
    console.error("Oops! Something went wrong.", err)
  }
}

const Login = () => {
  const [email, setEmail] = useState("")

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    void sendMagicLink(email)
  }
  return (
    <div>
      <div className="flex flex-col gap-3 text-center text-xl">
        <h1>Welcome to login page</h1>
        <Link to={rootRoute.to} from={LoginIndex.to} search={{}} params={{}}>
          <Button>Main</Button>
        </Link>
      </div>
      <form
        onSubmit={onSubmit}
        className="mx-auto flex h-[200px]  w-[300px] flex-col items-center justify-center gap-2 rounded p-2"
      >
        <Label className="w-full">
          <span className="inline-block pb-2">Email</span>

          <span className="text-red-500">*</span>
          <Input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Label>

        <Button type="submit" disabled={!email} className="w-full">
          Send magic link
        </Button>
      </form>
    </div>
  )
}

export const LoginIndex = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
})
