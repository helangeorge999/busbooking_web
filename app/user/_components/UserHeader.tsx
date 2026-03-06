"use client";

import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/user/dashboard", label: "Dashboard" },
  { href: "/user/profile",   label: "Profile"   },
  { href: "/user/settings",  label: "Settings"  },
];

export default function UserHeader() {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/user/dashboard" className="flex items-center gap-2 font-bold text-green-700">
          <span className="text-xl">🚌</span>
          <span>BusBooking</span>
        </Link>

        {/* Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors ${
                pathname === n.href
                  ? "text-green-700 border-b-2 border-green-700 pb-0.5"
                  : "text-gray-600 hover:text-green-700"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gray-600 dark:text-gray-400 sm:block">
            {user?.name ?? user?.email}
          </span>
          <button
            onClick={logout}
            className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium
                       text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}