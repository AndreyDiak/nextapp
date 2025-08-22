"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { EmailField } from "../_components/email";
import { PasswordField } from "../_components/password";
import { UsernameField } from "../_components/username";

const tabs = [
  {
    label: "Вход",
    value: "login",
  },
  {
    label: "Регистрация",
    value: "register",
  },
];

export default function SignIn() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSignIn = useCallback(async (e: React.FormEvent) => {
    startTransition(async () => {
      e.preventDefault();
      setError("");

      const formData = new FormData(e.target as HTMLFormElement);
      const username = formData.get("username");
      const password = formData.get("password");

      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid credentials");
      } else {
        router.push("/");
        router.refresh();
      }
    });
  }, []);

  const handleSignUp = useCallback(async (e: React.FormEvent) => {
    startTransition(async () => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const username = formData.get("username");
      const password = formData.get("password");

      // const response = await signIn("credentials", {
      //   username,
      //   password,
      //   redirect: false,
      // });

      // if (response?.error) {
      //   setError("Invalid credentials");
      // } else {
      //   router.push("/");
      //   router.refresh();
      // }
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-100 via-blue-50 to-pink-50">
      {/* Декоративные элементы фона */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000"></div>
      </div>

      <Card className="w-full max-w-md mx-auto bg-white/80 backdrop-blur-lg border-blue-200 shadow-2xl relative z-10">
        <CardHeader className="text-center space-y-2 pb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center transform rotate-3 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Добро пожаловать!
          </CardTitle>
          <CardDescription className="text-blue-600">
            Войдите в свой аккаунт или создайте новый
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 gap-1 mb-6 bg-blue-50 border-blue-200">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "data-[state=active]:bg-blue-500 data-[state=active]:text-white cursor-pointer",
                    "data-[state=active]:hover:bg-blue-700 data-[state=active]:hover:text-white data-[state=inactive]:hover:bg-blue-100"
                  )}
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleSignIn} className="space-y-4">
                <UsernameField />
                <PasswordField />
                <div className="flex justify-center">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Забыли пароль?
                  </button>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                  disabled={isPending}
                >
                  {isPending ? "Вход..." : "Войти"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleSignUp} className="space-y-4">
                <UsernameField />
                <EmailField />
                <PasswordField type="password" />
                <PasswordField type="confirm-password" />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg transition-all duration-200 transform hover:scale-105"
                  disabled={isPending}
                >
                  {isPending ? "Создание аккаунта..." : "Создать аккаунт"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
