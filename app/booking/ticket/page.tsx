"use client";

import { useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import html2canvas from "html2canvas";

export default function TicketPage() {
  const params = useSearchParams();
  const router = useRouter();
  const ticketRef = useRef<HTMLDivElement>(null);

  const bookingId = params.get("bookingId");
  const busName = params.get("busName");
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");
  const seats = params.get("seats");
  const total = params.get("total");

  const downloadTicket = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current, {
      backgroundColor: "#ffffff",
      scale: 2,
    });

    const link = document.createElement("a");
    link.download = `ticket-${bookingId}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="mx-auto max-w-2xl">
        {/* Success Message */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Confirmed!</h1>
          <p className="mt-2 text-gray-600">Your ticket has been generated</p>
        </div>

        {/* Ticket */}
        <div ref={ticketRef} className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Booking ID</p>
                <p className="text-2xl font-bold">{bookingId}</p>
              </div>
              <div className="text-6xl">🚌</div>
            </div>
          </div>

          {/* Ticket Details */}
          <div className="p-8">
            {/* Route */}
            <div className="mb-8 flex items-center justify-between">
              <div className="text-center">
                <p className="text-sm text-gray-500">From</p>
                <p className="text-3xl font-bold text-gray-900">{from}</p>
              </div>
              <div className="flex-1 px-4">
                <div className="relative">
                  <div className="h-px bg-gray-300"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2">
                    <svg
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">To</p>
                <p className="text-3xl font-bold text-gray-900">{to}</p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-6 border-t border-b border-dashed py-6">
              <div>
                <p className="text-sm text-gray-500">Bus Name</p>
                <p className="text-lg font-semibold text-gray-900">{busName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Travel Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(date!).toLocaleDateString("en-US", {
                    weekday: "short",
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Seat Numbers</p>
                <p className="text-lg font-semibold text-gray-900">{seats}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-lg font-semibold text-green-600">NPR {total}</p>
              </div>
            </div>

            {/* Barcode */}
            <div className="mt-6 text-center">
              <div className="mx-auto flex h-24 w-64 items-center justify-center bg-gray-100">
                <svg viewBox="0 0 200 80" className="h-full w-full">
                  {[...Array(30)].map((_, i) => (
                    <rect
                      key={i}
                      x={i * 6 + 10}
                      y="10"
                      width={Math.random() > 0.5 ? 2 : 4}
                      height="60"
                      fill="#000"
                    />
                  ))}
                </svg>
              </div>
              <p className="mt-2 text-xs text-gray-500">{bookingId}</p>
            </div>

            {/* Instructions */}
            <div className="mt-6 rounded-lg bg-yellow-50 p-4">
              <p className="text-sm font-medium text-yellow-800">Important Instructions:</p>
              <ul className="mt-2 space-y-1 text-sm text-yellow-700">
                <li>• Please arrive 30 minutes before departure</li>
                <li>• Carry a valid ID proof</li>
                <li>• Show this ticket at the boarding point</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={downloadTicket}
            className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-semibold text-white
                       transition hover:bg-green-700"
          >
            Download Ticket
          </button>
          <button
            onClick={() => router.push("/user/dashboard")}
            className="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 font-semibold
                       text-gray-700 transition hover:bg-gray-50"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}