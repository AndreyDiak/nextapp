import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  // If user is already authenticated, redirect to home
  if (session) {
    redirect("/")
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  )
}
