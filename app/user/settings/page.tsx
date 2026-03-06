"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleChangePassword } from "@/lib/actions/auth-action";
import { useAuth } from "@/app/context/AuthContext";

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
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const { user, logout } = useAuth();

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

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const EyeIcon = ({ visible }: { visible: boolean }) => (
    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      {visible ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
      ) : (
        <>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </>
      )}
    </svg>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Manage your account preferences and security
        </p>
      </div>

      {/* Account Info */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Information</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-lg">
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Name</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
              {user?.name || "N/A"}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Email</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
              {user?.email || "N/A"}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Phone</p>
            <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
              {user?.phone || "N/A"}
            </p>
          </div>
          <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Role</p>
            <p className="mt-1 text-sm font-semibold capitalize text-gray-900 dark:text-white">
              {user?.role || "User"}
            </p>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 dark:bg-orange-900/30">
            <svg className="h-5 w-5 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Change Password</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Update your password to keep your account secure</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Current Password
            </label>
            <div className="relative">
              <input
                {...register("currentPassword")}
                type={showPasswords.current ? "text" : "password"}
                placeholder="Enter current password"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 pr-11 text-sm
                           focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <EyeIcon visible={showPasswords.current} />
              </button>
            </div>
            {errors.currentPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.currentPassword.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <div className="relative">
              <input
                {...register("newPassword")}
                type={showPasswords.new ? "text" : "password"}
                placeholder="Enter new password"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 pr-11 text-sm
                           focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <EyeIcon visible={showPasswords.new} />
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-xs text-red-500">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword")}
                type={showPasswords.confirm ? "text" : "password"}
                placeholder="Confirm new password"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 pr-11 text-sm
                           focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                <EyeIcon visible={showPasswords.confirm} />
              </button>
            </div>
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
            {pending ? "Changing..." : "Update Password"}
          </button>
        </form>
      </div>

      {/* Appearance */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 dark:bg-purple-900/30">
            <svg className="h-5 w-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Appearance</h2>
        </div>

        <div className="max-w-md">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
            <div className="flex items-center gap-3">
              <span className="text-xl">{darkMode ? "🌙" : "☀️"}</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {darkMode ? "Dark theme is active" : "Light theme is active"}
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? "bg-green-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                  darkMode ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-white p-6 dark:border-red-900/50 dark:bg-gray-900">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-900/30">
            <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">Danger Zone</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Irreversible account actions</p>
          </div>
        </div>

        <div className="max-w-md">
          <div className="flex items-center justify-between rounded-lg border border-red-100 p-4 dark:border-red-900/30">
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Log out</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Sign out from your current session</p>
            </div>
            <button
              onClick={logout}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600
                         transition hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
