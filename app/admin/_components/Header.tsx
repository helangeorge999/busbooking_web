"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";

export default function AdminHeader() {
  const { logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-full items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            🚌 BusBooking Admin
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {user?.email ?? "Admin"}
          </span>
          <button
            onClick={logout}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium
                       text-gray-700 transition hover:bg-gray-100 dark:border-gray-700
                       dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}