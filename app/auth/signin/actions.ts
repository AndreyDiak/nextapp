"use server";

import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export async function handleSignIn(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  // Use NextAuth's signIn with redirect: false to get the result
  const result = await signIn("credentials", {
    email,
    password,
    redirect: true,
  });

  console.log({ result });

  // Redirect to home page after successful login
  redirect("/(protected)");
}
