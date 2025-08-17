import { getServerSession } from "next-auth"
import { authOptions } from "./auth"

export async function getAuthSession() {
  return await getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getAuthSession()
  
  if (!session) {
    throw new Error("Authentication required")
  }
  
  return session
}

export async function getCurrentUser() {
  const session = await getAuthSession()
  return session?.user
}
