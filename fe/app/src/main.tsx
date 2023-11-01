import { RouterProvider } from "@tanstack/react-router"
import { ThemeProvider } from "next-themes"
import React from "react"
import ReactDOM from "react-dom/client"

import { Toaster } from "@core/ui"

import { router } from "#/router.js"
import "#/services/supertokens.js"
import "./globals.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider attribute="class">
    <RouterProvider router={router} />
    <Toaster />
  </ThemeProvider>,
)
