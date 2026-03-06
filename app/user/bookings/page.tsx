import { handleGetMyBookings } from "@/lib/actions/booking-action";
import CancelBookingButton from "./_components/CancelBookingButton";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function UserBookingsPage() {
  const result = await handleGetMyBookings();
  const bookings = result.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Bookings
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            View and manage your travel history
          </p>
        </div>
        <Link
          href="/booking/search"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm
                     font-semibold text-white shadow-sm transition hover:bg-green-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Book New Ticket
        </Link>
      </div>

      {!result.success && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950">
          <svg className="h-5 w-5 shrink-0 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-red-700 dark:text-red-300">
            {result.message || "Failed to load bookings. Please try again."}
          </p>
        </div>
      )}

      {bookings.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-16 text-center dark:border-gray-700 dark:bg-gray-900">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
            <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No bookings yet
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Start your journey by booking your first bus ticket.
          </p>
          <Link
            href="/booking/search"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-green-600 px-5 py-2.5
                       text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Search Buses
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking: any) => (
            <div
              key={booking._id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm
                         transition hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
            >
              {/* Status bar */}
              <div
                className={`h-1 ${
                  booking.status === "confirmed"
                    ? "bg-green-500"
                    : booking.status === "cancelled"
                      ? "bg-red-500"
                      : "bg-yellow-500"
                }`}
              />

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* Route & Status */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 dark:bg-green-900/30">
                        <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                          {booking.from} → {booking.to}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {booking.busName || "Bus Ticket"}
                        </p>
                      </div>
                      <span
                        className={`ml-auto rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                            : booking.status === "cancelled"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Details Grid */}
                    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                      <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Booking ID
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                          {booking.bookingId}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Travel Date
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                          {new Date(booking.travelDate).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Seats
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-900 dark:text-white">
                          {booking.seats}
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Total Amount
                        </p>
                        <p className="mt-1 text-sm font-bold text-green-600 dark:text-green-400">
                          NPR {booking.totalAmount}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {booking.status === "confirmed" && (
                  <div className="mt-4 flex justify-end border-t border-gray-100 pt-4 dark:border-gray-800">
                    <CancelBookingButton bookingId={booking._id} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
