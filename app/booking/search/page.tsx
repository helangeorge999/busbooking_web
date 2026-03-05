"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CITIES = [
  "Kathmandu",
  "Pokhara",
  "Biratnagar",
  "Birgunj",
  "Bharatpur",
  "Janakpur",
  "Butwal",
  "Dharan",
  "Hetauda",
  "Nepalgunj",
  "Dhangadhi",
  "Itahari",
  "Banepa",
  "Dhulikhel",
  "Bhaktapur",
  "Lalitpur",
  "Gorkha",
  "Besisahar",
  "Mugling",
  "Narayanghat",
];

export default function SearchBusPage() {
  const router = useRouter();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = () => {
    if (!from || !to || !date) {
      toast.error("Please fill all fields");
      return;
    }
    if (from === to) {
      toast.error("Origin and destination cannot be the same");
      return;
    }
    router.push(`/booking/buses?from=${from}&to=${to}&date=${date}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">🚌 Book Your Bus</h1>
          <p className="mt-2 text-gray-600">Find the best bus for your journey</p>
        </div>

        {/* Search Card */}
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="space-y-6">
            {/* From */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Coming From
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="h-14 w-full rounded-xl border-2 border-gray-200 px-4 text-gray-900
                           focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                <option value="">Select City</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  const temp = from;
                  setFrom(to);
                  setTo(temp);
                }}
                className="rounded-full bg-green-100 p-3 text-green-700 transition hover:bg-green-200"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </button>
            </div>

            {/* To */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Going To
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="h-14 w-full rounded-xl border-2 border-gray-200 px-4 text-gray-900
                           focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              >
                <option value="">Select City</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Travel Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Travel Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="h-14 w-full rounded-xl border-2 border-gray-200 px-4 text-gray-900
                           focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="h-14 w-full rounded-xl bg-gradient-to-r from-green-600 to-green-700
                         text-lg font-semibold text-white shadow-lg transition
                         hover:from-green-700 hover:to-green-800"
            >
              Search Buses
            </button>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { icon: "🎫", label: "Easy Booking" },
            { icon: "💺", label: "Choose Seats" },
            { icon: "✅", label: "Instant Confirm" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl bg-white p-4 text-center shadow">
              <div className="text-3xl">{item.icon}</div>
              <p className="mt-2 text-sm font-medium text-gray-700">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}