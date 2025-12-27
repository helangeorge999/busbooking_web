"use client";

import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-gray-100">

      {/* NAVBAR */}
      <nav className="flex w-full items-center justify-between bg-white px-10 py-4 shadow">

        <div className="flex items-center gap-8">
          <h1 className="text-xl font-bold text-blue-600">BusBooking</h1>

          <Link href="/dashboard" className="hover:text-blue-600">Home</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
          <Link href="/contact" className="hover:text-blue-600">Contact</Link>
        </div>

        <div className="flex gap-4">
          <Link
            href="/login"
            className="rounded border border-blue-600 px-4 py-2 text-sm text-blue-600"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Sign up
          </Link>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="flex min-h-[calc(100vh-72px)] items-center justify-center">
        <h2 className="text-4xl font-semibold bg-grey text-gray-800">
          Welcome to Bus Booking 
        </h2>
      </main>

    </div>
  );
}
