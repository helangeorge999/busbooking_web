"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { handleCreateBooking } from "@/lib/actions/booking-action";

export default function ConfirmationPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [agreed, setAgreed] = useState(false);
  
  // Form state for passenger info
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");
  const [passengerEmail, setPassengerEmail] = useState("");

  const busId = params.get("busId");
  const busName = params.get("busName");
  const from = params.get("from");
  const to = params.get("to");
  const date = params.get("date");
  const seats = params.get("seats");
  const total = params.get("total");

  const handleConfirm = () => {
    if (!agreed) {
      toast.error("Please agree to terms and conditions");
      return;
    }

    if (!passengerName || !passengerPhone || !passengerEmail) {
      toast.error("Please fill all passenger information");
      return;
    }

    startTransition(async () => {
      const bookingData = {
        busId: busId,
        from: from,
        to: to,
        travelDate: date,
        seats: seats,
        totalAmount: Number(total),
        passengerName,
        passengerPhone,
        passengerEmail,
      };

      const result = await handleCreateBooking(bookingData);
      
      if (!result.success) {
        toast.error(result.message || "Booking failed");
        return;
      }

      const bookingId = result.data?.bookingId || `BK${Date.now()}`;
      toast.success("Booking confirmed!");
      router.push(
        `/booking/ticket?bookingId=${bookingId}&busName=${busName}&from=${from}&to=${to}&date=${date}&seats=${seats}&total=${total}`
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mx-auto max-w-2xl">
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
          <h1 className="text-2xl font-bold text-gray-900">Confirm Your Booking</h1>
        </div>

        {/* Booking Details */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-bold text-gray-900">Trip Details</h2>

          <div className="mt-6 space-y-4">
            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Bus</span>
              <span className="font-semibold text-gray-900">{busName}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Route</span>
              <span className="font-semibold text-gray-900">
                {from} → {to}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Date</span>
              <span className="font-semibold text-gray-900">
                {new Date(date!).toDateString()}
              </span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Seats</span>
              <span className="font-semibold text-gray-900">{seats}</span>
            </div>

            <div className="flex justify-between pt-2">
              <span className="text-lg font-semibold text-gray-900">Total Amount</span>
              <span className="text-2xl font-bold text-green-600">NPR {total}</span>
            </div>
          </div>
        </div>

        {/* Passenger Info */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow">
          <h2 className="text-lg font-bold text-gray-900">Passenger Information</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                placeholder="Enter passenger name"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                value={passengerPhone}
                onChange={(e) => setPassengerPhone(e.target.value)}
                placeholder="Enter phone number"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={passengerEmail}
                onChange={(e) => setPassengerEmail(e.target.value)}
                placeholder="Enter email address"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-6 rounded-xl bg-white p-6 shadow">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 h-5 w-5 rounded border-gray-300 text-green-600
                         focus:ring-2 focus:ring-green-500"
            />
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-green-600 hover:underline">
                Terms and Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-green-600 hover:underline">
                Cancellation Policy
              </a>
            </span>
          </label>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          disabled={pending || !agreed}
          className="mt-6 h-14 w-full rounded-xl bg-gradient-to-r from-green-600 to-green-700
                     text-lg font-semibold text-white shadow-lg transition
                     hover:from-green-700 hover:to-green-800 disabled:opacity-50"
        >
          {pending ? "Processing..." : "Confirm & Pay"}
        </button>

        <p className="mt-4 text-center text-sm text-gray-500">
          You will be redirected to payment page
        </p>
      </div>
    </div>
  );
}