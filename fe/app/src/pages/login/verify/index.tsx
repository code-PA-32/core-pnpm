import { Route, useNavigate } from "@tanstack/react-router"
import { useCallback, useEffect } from "react"
import {
  consumeCode,
  getLoginAttemptInfo,
} from "supertokens-auth-react/recipe/passwordless"

import { rootRoute } from "#router.js"

async function isThisSameBrowserAndDevice() {
  return (await getLoginAttemptInfo()) !== undefined
}

const Verify = () => {
  const navigate = useNavigate()
  const handleMagicLinkClicked = useCallback(async () => {
    try {
      const response = await consumeCode()
      if (response.status === "OK") {
        void navigate({ to: "/setting" })
      } else {
        console.error("Something wrong while consuming code", response)
      }
    } catch (err: unknown) {
      console.error("isSuperTokensGeneralError", err)
    }
  }, [])

  useEffect(() => {
    void isThisSameBrowserAndDevice().then((isSame) => {
      if (isSame) {
        void handleMagicLinkClicked()
      } else {
        console.info("error")
      }
    })
  }, [handleMagicLinkClicked])

  return <div>123</div>
}

export const VerifyIndex = new Route({
  getParentRoute: () => rootRoute,
  path: "/login/verify",
  component: Verify,
})
