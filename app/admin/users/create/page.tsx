"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";

const createUserSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email"),
    dob: z.string().min(1, "Date of birth is required"),
    gender: z.enum(["male", "female"], { message: "Gender is required" }),
    phone: z.string().min(7, "Phone must be at least 7 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

type CreateUserForm = z.infer<typeof createUserSchema>;

export default function CreateUserPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<CreateUserForm>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      dob: "",
      gender: undefined,
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5050"}/api/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );
        const body = await res.json();
        if (!body.success) {
          toast.error(body.message || "Failed to create user");
          return;
        }
        toast.success("User created successfully!");
        router.push("/admin/users");
      } catch {
        toast.error("Failed to create user");
      }
    });
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create User</h1>
        <p className="text-sm text-gray-500">Register a new passenger account</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              {...form.register("name")}
              placeholder="John Doe"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              {...form.register("email")}
              type="email"
              placeholder="john@example.com"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Phone & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                {...form.register("phone")}
                placeholder="1234567890"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              {form.formState.errors.phone && (
                <p className="mt-1 text-xs text-red-500">{form.formState.errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <select
                {...form.register("gender")}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {form.formState.errors.gender && (
                <p className="mt-1 text-xs text-red-500">{form.formState.errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date of Birth
            </label>
            <input
              {...form.register("dob")}
              type="date"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {form.formState.errors.dob && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.dob.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <input
                {...form.register("password")}
                type="password"
                placeholder="Min 6 characters"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              {form.formState.errors.password && (
                <p className="mt-1 text-xs text-red-500">{form.formState.errors.password.message}</p>
              )}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                {...form.register("confirmPassword")}
                type="password"
                placeholder="Re-enter password"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              {form.formState.errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{form.formState.errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 rounded-lg bg-green-600 py-3 font-semibold text-white
                         transition hover:bg-green-700 disabled:opacity-50"
            >
              {pending ? "Creating..." : "Create User"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700
                         transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
