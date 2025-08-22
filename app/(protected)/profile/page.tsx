"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function Profile() {
  return (
    <div>
      <LogOutButton />
    </div>
  );
}

const LogOutButton = () => {
  const logOut = async () => {
    await signOut({
      redirect: true,
      callbackUrl: "/auth/signin",
    });
  };
  return (
    <Button onClick={logOut} variant="destructive">
      Log Out
    </Button>
  );
};
