"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { handleGetBookedSeats } from "@/lib/actions/booking-action";

type SeatStatus = "available" | "booked" | "selected";

interface Seat {
  id: string;
  number: number;
  status: SeatStatus;
}

export default function SeatSelectionPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  const busId = params.get("busId");
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");
  const price = params.get("price");
  const busName = params.get("busName");
  const totalSeats = Number(params.get("totalSeats")) || 40;

  const [seats, setSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!busId || !date) return;

    startTransition(async () => {
      const result = await handleGetBookedSeats(busId, date);
      const bookedSeatNumbers = result.data ?? [];

      const initialSeats: Seat[] = [];
      for (let i = 1; i <= totalSeats; i++) {
        initialSeats.push({
          id: `seat-${i}`,
          number: i,
          status: bookedSeatNumbers.includes(i) ? "booked" : "available",
        });
      }
      setSeats(initialSeats);
      setIsLoading(false);
    });
  }, [busId, date, totalSeats]);

  const selectedSeats = seats.filter((s) => s.status === "selected");
  const totalPrice = selectedSeats.length * Number(price);

  const toggleSeat = (seatId: string) => {
    setSeats((prev) =>
      prev.map((seat) => {
        if (seat.id === seatId && seat.status !== "booked") {
          return {
            ...seat,
            status: seat.status === "selected" ? "available" : "selected",
          };
        }
        return seat;
      })
    );
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      toast.error("Please select at least one seat");
      return;
    }
    const seatNumbers = selectedSeats.map((s) => s.number).join(",");
    router.push(
      `/booking/confirmation?busId=${busId}&from=${from}&to=${to}&date=${date}&price=${price}&busName=${busName}&seats=${seatNumbers}&total=${totalPrice}`
    );
  };

  const getSeatColor = (status: SeatStatus) => {
    switch (status) {
      case "available":
        return "bg-green-100 hover:bg-green-200 text-green-700 cursor-pointer";
      case "booked":
        return "bg-gray-300 text-gray-500 cursor-not-allowed";
      case "selected":
        return "bg-blue-500 text-white cursor-pointer";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto max-w-5xl">
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
          <h1 className="text-2xl font-bold text-gray-900">Select Your Seats</h1>
          <p className="text-gray-600">{busName}</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center rounded-xl bg-white p-16 shadow">
            <div className="text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-green-200 border-t-green-600" />
              <p className="mt-4 text-sm text-gray-500">Loading seat availability...</p>
            </div>
          </div>
        ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Seat Map */}
          <div className="rounded-xl bg-white p-6 shadow">
            {/* Driver */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800 text-white">
                🚗
              </div>
              <span className="text-sm font-medium text-gray-600">Driver</span>
            </div>

            {/* Seats Grid */}
            <div className="grid grid-cols-4 gap-3">
              {seats.map((seat, idx) => (
                <div key={seat.id}>
                  {/* Aisle after 2nd column */}
                  {idx % 4 === 2 && <div className="w-8"></div>}
                  <button
                    onClick={() => toggleSeat(seat.id)}
                    disabled={seat.status === "booked"}
                    className={`flex h-14 w-14 items-center justify-center rounded-lg
                                text-sm font-semibold transition ${getSeatColor(seat.status)}`}
                  >
                    {seat.number}
                  </button>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-8 flex flex-wrap gap-6 border-t pt-6">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-green-100"></div>
                <span className="text-sm text-gray-600">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500"></div>
                <span className="text-sm text-gray-600">Selected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gray-300"></div>
                <span className="text-sm text-gray-600">Booked</span>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-lg font-bold text-gray-900">Booking Summary</h3>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm text-gray-500">Selected Seats</p>
                <p className="text-xl font-bold text-gray-900">
                  {selectedSeats.length > 0
                    ? selectedSeats.map((s) => s.number).join(", ")
                    : "None"}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Price per seat</p>
                <p className="text-lg font-semibold text-gray-900">NPR {price}</p>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-3xl font-bold text-green-600">NPR {totalPrice}</p>
              </div>
            </div>

            <button
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
              className="mt-6 h-12 w-full rounded-lg bg-green-600 font-semibold text-white
                         transition hover:bg-green-700 disabled:bg-gray-300"
            >
              Continue
            </button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}