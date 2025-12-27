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
      await new Promise((r) => setTimeout(r, 1000));
      console.log("login", values);
      router.push("/dashboard");
    });
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center"
    //   style={{ backgroundImage: "url('/images/busss.jpg')" }} // 
    >
      {/* TRANSPARENT DARK CARD */}
      <div
        className="w-full max-w-md rounded-2xl px-6 py-6 shadow-2xl
                   bg-black/70 backdrop-blur-md"
      >
        {/* HEADER */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-white">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-gray-300">
            Log in to your account
          </p>
        </div>

        {/* WHITE FORM CARD */}
        <div className="mt-2 rounded-xl bg-white p-5">
          <form onSubmit={handleSubmit(submit)} className="space-y-4">

            {/* EMAIL */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                ✉️
              </span>
              <input
                {...register("email")}
                type="text"
                placeholder="Email or Phone Number"
                className="h-11 w-full rounded-md border border-gray-300
                           pl-10 text-sm text-black
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                🔒
              </span>
              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className="h-11 w-full rounded-md border border-gray-300
                           pl-10 text-sm text-black
                           focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting || pending}
              className="h-11 w-full rounded-md bg-blue-600
                         text-sm font-medium text-white
                         hover:bg-blue-700 disabled:opacity-60"
            >
              {isSubmitting || pending ? "Logging in..." : "Login"}
            </button>

            {/* FORGOT PASSWORD */}
            <p className="text-center text-xs text-gray-600 hover:underline cursor-pointer">
              Forgot password?
            </p>

            {/* SIGNUP */}
            <p className="pt-2 text-center text-xs text-gray-600">
              Don't have an account?
            </p>

            <Link
              href="/register"
              className="block h-11 w-full rounded-md border border-gray-400
                         text-center text-sm leading-[44px]
                         text-black hover:bg-gray-100"
            >
              Create account
            </Link>

          </form>
        </div>
      </div>
    </div>
  );
}
