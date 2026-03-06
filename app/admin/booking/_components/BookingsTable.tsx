"use client";

import { useState, useTransition } from "react";
import { handleCancelBooking } from "@/lib/actions/booking-action";
import { toast } from "react-toastify";

export default function BookingsTable({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = bookings.filter((b) => {
    const matchesSearch =
      b.passengerName?.toLowerCase().includes(search.toLowerCase()) ||
      b.passengerEmail?.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingId?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const onCancel = (bookingId: string, mongoId: string) => {
    if (!confirm(`Cancel booking ${bookingId}?`)) return;
    startTransition(async () => {
      const res = await handleCancelBooking(mongoId);
      if (res.success) {
        setBookings((prev) =>
          prev.map((b) => (b._id === mongoId ? { ...b, status: "cancelled" } : b))
        );
        toast.success("Booking cancelled");
      } else {
        toast.error(res.message || "Failed to cancel booking");
      }
    });
  };

  const totalRevenue = bookings
    .filter((b) => b.status === "confirmed")
    .reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{bookings.length}</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Confirmed</p>
          <p className="text-2xl font-bold text-green-600">
            {bookings.filter((b) => b.status === "confirmed").length}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-900">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <p className="text-2xl font-bold text-green-600">NPR {totalRevenue}</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <input
            type="text"
            placeholder="Search by name, email or booking ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm
                       focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                       dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm
                       focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                       dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:bg-gray-800">
              <tr>
                <th className="px-5 py-3">Booking ID</th>
                <th className="px-5 py-3">Passenger</th>
                <th className="px-5 py-3">Route</th>
                <th className="px-5 py-3">Travel Date</th>
                <th className="px-5 py-3">Seats</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filtered.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">
                    {booking.bookingId}
                  </td>
                  <td className="px-5 py-3">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {booking.passengerName}
                      </p>
                      <p className="text-xs text-gray-500">{booking.passengerEmail}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-gray-600 dark:text-gray-400">
                    {booking.from} → {booking.to}
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                    {new Date(booking.travelDate).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                    {booking.seats}
                  </td>
                  <td className="px-5 py-3 font-semibold text-green-600">
                    NPR {booking.totalAmount}
                  </td>
                  <td className="px-5 py-3">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    {booking.status === "confirmed" ? (
                      <button
                        onClick={() => onCancel(booking.bookingId, booking._id)}
                        disabled={pending}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600
                                   hover:bg-red-100 disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-8 text-center text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
