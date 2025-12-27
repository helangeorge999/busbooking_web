"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { LoginData, loginSchema } from "../schema";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    });

    const [pending, setTransition] = useTransition();

    const submit = async (values: LoginData) => {
        setTransition(async () => {
            await new Promise((r) => setTimeout(r, 1000));
        });
        console.log("login", values);
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="space-y-5"
        >
            {/* Email */}
            <div className="space-y-1">
                <label className="text-sm text-gray-300">Email</label>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    className="h-10 w-full rounded-md bg-blue-50 px-3 text-sm text-gray-900
                               outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email?.message && (
                    <p className="text-xs text-red-400">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-1">
                <label className="text-sm text-gray-300">Password</label>
                <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••••"
                    className="h-10 w-full rounded-md bg-blue-50 px-3 text-sm text-gray-900
                               outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.password?.message && (
                    <p className="text-xs text-red-400">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {/* Login Button */}
            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-9 w-full rounded-md bg-blue-600 text-sm font-medium text-white
                           hover:bg-blue-700 disabled:opacity-60"
            >
                {isSubmitting || pending ? "Logging in..." : "Log in"}
            </button>

            {/* Signup Link */}
            <div className="text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                    href="/register"
                    className="text-blue-500 hover:underline"
                >
                    Sign up
                </Link>
            </div>
        </form>
    );
}
