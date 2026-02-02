"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../schema";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  FaUser,
  FaCalendarAlt,
  FaVenusMars,
  FaPhoneAlt,
  FaLock,
} from "react-icons/fa";
import React from "react";

export default function RegisterForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  // Watch the name field and generate username
  const nameValue = watch("name");
  React.useEffect(() => {
    if (nameValue) {
      const username = nameValue
        .toLowerCase()
        .replace(/\s+/g, "") + Math.floor(Math.random() * 1000);
      setValue("username", username); // automatically set username
    }
  }, [nameValue, setValue]);

  const submit = async (values: RegisterData) => {
    try {
      const res = await fetch("http://localhost:5050/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      console.log("register response:", data);

      if (!res.ok || !data.success) {
        alert(data.message || "Registration failed!");
        return;
      }

      alert("Registration successful!");
      router.push("/login"); // redirect after success
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="w-full max-w-md rounded-2xl bg-white p-10 shadow-xl">
        <h1 className="mb-2 text-center text-2xl font-semibold text-gray-900">
          Create An Account
        </h1>
        <p className="mb-8 text-center text-sm text-gray-500">
          Join us and book your bus tickets easily
        </p>

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("name")}
              placeholder="Full Name"
              className="h-11 w-full rounded-lg border border-gray-300 pl-10 text-sm text-gray-900
                     placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {errors.name?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          {/* Username (auto-generated) */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("username")}
              placeholder="Username"
              readOnly
              className="h-11 w-full rounded-lg border border-gray-300 pl-10 text-sm text-gray-900
                     placeholder-gray-400 bg-gray-100 cursor-not-allowed focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {errors.username?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("email")}
              placeholder="Email"
              className="h-11 w-full rounded-lg border border-gray-300 pl-10 text-sm text-gray-900
                     placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {errors.email?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>

          {/* DOB */}
          <div className="relative">
            <FaCalendarAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="date"
              {...register("dob")}
              className="h-11 w-full rounded-lg border border-gray-300 pl-10 text-sm text-gray-700
                     focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {errors.dob?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="relative">
            <FaVenusMars className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              {...register("gender")}
              className="h-11 w-full rounded-lg border border-gray-300 pl-10 text-sm text-gray-700
                     focus:border-green-600 focus:ring-1 focus:ring-green-600"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.gender?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="relative">
            <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              {...register("phone")}
              placeholder="Phone Number"
              className="h-11 w-full rounded-lg border border-gray-300 pl-10 text-sm text-gray-900
                     placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {errors.phone?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="h-11 w-full rounded-lg border border-gray-300 pl-10 text-sm text-gray-900
                     placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {errors.password?.message && (
              <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm Password"
              className="h-11 w-full rounded-lg border border-gray-300 pl-10 text-sm text-gray-900
                     placeholder-gray-400 focus:border-green-600 focus:ring-1 focus:ring-green-600"
            />
            {errors.confirmPassword?.message && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 h-11 w-full rounded-lg bg-green-600 text-sm font-semibold
                   text-white hover:bg-green-700 disabled:opacity-60"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </button>

          {/* Login */}
          <p className="mt-4 text-center text-sm text-gray-500">
            Already have an account?
          </p>
          <Link
            href="/login"
            className="block w-full rounded-lg border border-black-300 py-2
                   text-center text-sm font-medium text-gray-700 hover:bg-black-100"
          >
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}
