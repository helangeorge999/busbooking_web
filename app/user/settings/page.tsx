"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleChangePassword } from "@/lib/actions/auth-action";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type PasswordData = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const [pending, startTransition] = useTransition();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark =
      stored === "dark" ||
      (stored !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (values: PasswordData) => {
    startTransition(async () => {
      const result = await handleChangePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      if (result.success) {
        toast.success(result.message);
        reset();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and display preferences</p>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Change Password</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Password
            </label>
            <input
              {...register("currentPassword")}
              type="password"
              placeholder="Enter current password"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.currentPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <input
              {...register("newPassword")}
              type="password"
              placeholder="Enter new password"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              placeholder="Confirm new password"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={pending}
            className="h-11 rounded-lg bg-green-600 px-6 text-sm font-semibold text-white
                       transition hover:bg-green-700 disabled:opacity-60"
          >
            {pending ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>

      {/* Display Settings */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Display Settings</h2>
        <div className="flex items-center justify-between max-w-md">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Dark Mode</p>
            <p className="text-sm text-gray-500">Switch between light and dark theme</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative h-7 w-12 rounded-full transition-colors ${
              darkMode ? "bg-green-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                darkMode ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
