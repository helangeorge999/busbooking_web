"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";
import { adminLoginAction, loginAction } from "@/lib/actions/auth-action";
import { useAuth } from "@/app/context/AuthContext";

export default function LoginForm() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [pending, startTransition] = useTransition();
  const [isAdmin, setIsAdmin] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const submit = (values: LoginData) => {
    startTransition(async () => {
      const result = isAdmin
        ? await adminLoginAction(values)
        : await loginAction(values);

      if (!result.success) {
        alert(result.message || "Login failed");
        return;
      }

      setUser(result.data);
      router.push(result.role === "admin" ? "/admin" : "/user/dashboard");
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-green-700 px-8 py-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <span className="text-2xl">🚌</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="mt-1 text-sm text-green-100">
            {isAdmin ? "Admin Portal" : "Sign in to book your journey"}
          </p>
        </div>

        {/* Toggle */}
        <div className="flex bg-green-800">
          <button
            type="button"
            onClick={() => setIsAdmin(false)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              !isAdmin ? "bg-white text-green-800" : "text-white hover:bg-green-700"
            }`}
          >
            Passenger
          </button>
          <button
            type="button"
            onClick={() => setIsAdmin(true)}
            className={`flex-1 py-2.5 text-sm font-medium transition-colors ${
              isAdmin ? "bg-white text-green-800" : "text-white hover:bg-green-700"
            }`}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <div className="bg-white px-8 py-8">
          <form onSubmit={handleSubmit(submit)} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">✉️</span>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  {...register("password")}
                  type="password"
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="h-11 w-full rounded-lg bg-green-600 text-sm font-semibold
                         text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              {pending ? "Signing in…" : isAdmin ? "Admin Sign In" : "Sign In"}
            </button>

            {!isAdmin && (
              <>
                <p className="text-center text-sm text-gray-500">
                  Don&apos;t have an account?
                </p>
                <Link
                  href="/register"
                  className="block h-11 w-full rounded-lg border border-gray-300 text-center
                             text-sm font-medium leading-[44px] text-gray-700 hover:bg-gray-50"
                >
                  Create Account
                </Link>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}