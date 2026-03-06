"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { registerAction } from "@/lib/actions/auth-action";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female"], { message: "Select a gender" }),
  phone: z.string().min(7, "Enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm the password"),
}).refine((d) => d.password === d.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type FormData = z.infer<typeof schema>;

export default function CreateUserPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const result = await registerAction(data);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("User created successfully!");
      router.push("/admin/users");
    });
  });

  const inputClass =
    "h-11 w-full rounded-lg border border-gray-300 px-4 text-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white";

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create User</h1>
        <p className="text-sm text-gray-500">Register a new user account</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
      >
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Full Name
          </label>
          <input {...form.register("name")} placeholder="John Doe" className={inputClass} />
          {form.formState.errors.name && (
            <p className="mt-1 text-xs text-red-500">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input {...form.register("email")} type="email" placeholder="user@example.com" className={inputClass} />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone
            </label>
            <input {...form.register("phone")} type="tel" placeholder="+977 98765 43210" className={inputClass} />
            {form.formState.errors.phone && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date of Birth
            </label>
            <input {...form.register("dob")} type="date" className={inputClass} />
            {form.formState.errors.dob && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.dob.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Gender
            </label>
            <select {...form.register("gender")} className={inputClass}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {form.formState.errors.gender && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.gender.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input {...form.register("password")} type="password" placeholder="Min 6 characters" className={inputClass} />
            {form.formState.errors.password && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input {...form.register("confirmPassword")} type="password" placeholder="Re-enter password" className={inputClass} />
            {form.formState.errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-2">
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
                       transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
