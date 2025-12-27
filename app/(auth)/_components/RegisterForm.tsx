"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { RegisterData, registerSchema } from "../schema";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
        mode: "onSubmit",
    });

    const [pending, setTransition] = useTransition();

    const submit = async (values: RegisterData) => {
        setTransition(async () => {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            router.push("/login");
        });
        console.log("register", values);
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="space-y-4">

            {/* Full Name */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full name</label>
                <input
                    {...register("name")}
                    placeholder="Helan Geo"
                    className="h-9 w-full rounded border border-gray-300 px-3 text-sm
                               focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.name?.message && (
                    <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
            </div>

            {/* Email */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                    {...register("email")}
                    type="email"
                    placeholder="example@gmail.com"
                    className="h-9 w-full rounded border border-gray-300 px-3 text-sm
                               focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.email?.message && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
            </div>

            {/* Password */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Password</label>
                <input
                    {...register("password")}
                    type="password"
                    placeholder="••••••"
                    className="h-9 w-full rounded border border-gray-300 px-3 text-sm
                               focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.password?.message && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Confirm password</label>
                <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="••••••"
                    className="h-9 w-full rounded border border-gray-300 px-3 text-sm
                               focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                {errors.confirmPassword?.message && (
                    <p className="text-xs text-red-500">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Create Account Button */}
            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-9 w-full rounded bg-blue-600 text-white text-sm font-medium
                           hover:bg-blue-700 disabled:opacity-60"
            >
                {isSubmitting || pending ? "Creating account..." : "Create account"}
            </button>

            {/* Login Link */}
            <div className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-blue-600 hover:underline">
                    Log in
                </Link>
            </div>
        </form>
    );
}
