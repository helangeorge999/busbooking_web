import { handleSearchBuses } from "@/lib/actions/admin/bus-action";

"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

interface Bus {
  id: string;
  name: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  type: string;
  rating: number;
}

export default function BusListPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [buses, setBuses] = useState<Bus[]>([]);
  const [loading, setLoading] = useState(true);

  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");

 useEffect(() => {
  const fetchBuses = async () => {
    if (!from || !to) {
      setLoading(false);
      return;
    }
    
    const result = await handleSearchBuses(from, to);
    if (result.success) {
      setBuses(result.data);
    }
    setLoading(false);
  };
  
  fetchBuses();
}, [from, to]);

  const handleSelectBus = (bus: Bus) => {
    if (bus.availableSeats === 0) {
      toast.error("No seats available");
      return;
    }
    router.push(`/booking/seats?busId=${bus.id}&from=${from}&to=${to}&date=${date}&price=${bus.price}&busName=${bus.name}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-green-200 border-t-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Searching buses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">
            {from} → {to}
          </h1>
          <p className="text-gray-600">{new Date(date!).toDateString()}</p>
          <p className="mt-1 text-sm text-gray-500">{buses.length} buses found</p>
        </div>

        {/* Bus List */}
        <div className="space-y-4">
          {buses.map((bus) => (
            <div
              key={bus.id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900">{bus.name}</h3>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {bus.type}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="text-lg font-semibold text-gray-900">{bus.departureTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="text-lg font-semibold text-gray-900">{bus.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Arrival</p>
                      <p className="text-lg font-semibold text-gray-900">{bus.arrivalTime}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="font-medium">{bus.rating}</span>
                    </div>
                    <div className="text-gray-600">
                      {bus.availableSeats} / {bus.totalSeats} seats available
                    </div>
                  </div>
                </div>

                <div className="ml-6 text-right">
                  <p className="text-sm text-gray-500">Starting from</p>
                  <p className="text-3xl font-bold text-green-600">NPR {bus.price}</p>
                  <button
                    onClick={() => handleSelectBus(bus)}
                    disabled={bus.availableSeats === 0}
                    className="mt-4 rounded-lg bg-green-600 px-6 py-2.5 text-sm font-semibold
                               text-white transition hover:bg-green-700 disabled:bg-gray-300"
                  >
                    {bus.availableSeats === 0 ? "Sold Out" : "Select Seats"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}