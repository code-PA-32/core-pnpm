import { signOut } from "supertokens-auth-react/recipe/session/index.js"

export const Logout = async () => {
  await signOut()
  window.location.href = "/login"
}
