"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";

export default function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const submit = async (values: LoginData) => {
    startTransition(async () => {
      try {
        const res = await fetch("http://localhost:5050/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          alert(data.message || "Login failed");
          return;
        }

        // ✅ ONLY LOGIC ADDED (NO UI CHANGE)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful");

        // ✅ Redirect to HOME
        router.replace("/");
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center">
      <div className="w-full max-w-md rounded-2xl px-6 py-6 shadow-2xl bg-black/70 backdrop-blur-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
          <p className="mt-1 text-sm text-gray-300">Log in to your account</p>
        </div>

        <div className="mt-2 rounded-xl bg-white p-5">
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div className="relative">
              <input
                {...register("email")}
                type="text"
                placeholder="Email or Phone Number"
                className="h-11 w-full rounded-md border border-gray-300 pl-10 text-sm text-black"
              />
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="h-11 w-full rounded-md border border-gray-300 pl-10 text-sm text-black"
              />
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || pending}
              className="h-11 w-full rounded-md bg-blue-600 text-sm font-medium text-white"
            >
              {isSubmitting || pending ? "Logging in..." : "Login"}
            </button>

            <Link
              href="/register"
              className="block h-11 w-full rounded-md border border-gray-400 text-center text-sm leading-[44px] text-black"
            >
              Create account
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
