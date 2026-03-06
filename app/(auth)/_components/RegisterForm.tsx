"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../schema";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerAction } from "@/lib/actions/auth-action";
import { toast } from "react-toastify";

const COUNTRY_CODES = [
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+91",  flag: "🇮🇳", name: "India" },
  { code: "+1",   flag: "🇺🇸", name: "USA" },
  { code: "+44",  flag: "🇬🇧", name: "UK" },
  { code: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "+86",  flag: "🇨🇳", name: "China" },
  { code: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "+82",  flag: "🇰🇷", name: "South Korea" },
  { code: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "+33",  flag: "🇫🇷", name: "France" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+60",  flag: "🇲🇾", name: "Malaysia" },
  { code: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+92",  flag: "🇵🇰", name: "Pakistan" },
  { code: "+94",  flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+39",  flag: "🇮🇹", name: "Italy" },
  { code: "+34",  flag: "🇪🇸", name: "Spain" },
  { code: "+7",   flag: "🇷🇺", name: "Russia" },
  { code: "+62",  flag: "🇮🇩", name: "Indonesia" },
  { code: "+66",  flag: "🇹🇭", name: "Thailand" },
  { code: "+63",  flag: "🇵🇭", name: "Philippines" },
  { code: "+84",  flag: "🇻🇳", name: "Vietnam" },
  { code: "+52",  flag: "🇲🇽", name: "Mexico" },
];

export default function RegisterForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [countryCode, setCountryCode] = useState("+977");

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const submit = (values: RegisterData) => {
    startTransition(async () => {
      const fullPhone = `${countryCode} ${values.phone}`;
      const result = await registerAction({ ...values, phone: fullPhone });
      if (!result.success) {
        toast.error(result.message || "Registration failed");
        return;
      }
      toast.success("Account created! Please sign in.");
      router.push("/login");
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-green-700 px-8 py-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <span className="text-2xl">🚌</span>
          </div>
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="mt-1 text-sm text-green-100">Join us and book your bus tickets easily</p>
        </div>

        {/* Form */}
        <div className="bg-white px-8 py-8">
          <form onSubmit={handleSubmit(submit)} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Full Name</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                <input
                  {...register("name")}
                  placeholder="Your full name"
                  className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email Address</label>
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

            {/* DOB */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Date of Birth</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📅</span>
                <input
                  {...register("dob")}
                  type="date"
                  className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm text-gray-700
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>}
            </div>

            {/* Gender */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Gender</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">⚧</span>
                <select
                  {...register("gender")}
                  className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm text-gray-700
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="h-11 w-[120px] shrink-0 rounded-lg border border-gray-300 px-2 text-sm text-gray-700
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input
                  {...register("phone")}
                  type="tel"
                  placeholder="98765 43210"
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
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

            {/* Confirm Password */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="••••••••"
                  className="h-11 w-full rounded-lg border border-gray-300 pl-10 pr-4 text-sm
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="mt-2 h-11 w-full rounded-lg bg-green-600 text-sm font-semibold
                         text-white transition hover:bg-green-700 disabled:opacity-60"
            >
              {pending ? "Creating Account…" : "Create Account"}
            </button>

            <p className="text-center text-sm text-gray-500">Already have an account?</p>
            <Link
              href="/login"
              className="block h-11 w-full rounded-lg border border-gray-300 text-center
                         text-sm font-medium leading-[44px] text-gray-700 hover:bg-gray-50"
            >
              Sign In
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}