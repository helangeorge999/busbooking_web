import { handleGetMyBookings } from "@/lib/actions/booking-action";
import CancelBookingButton from "./_components/CancelBookingButton";

export default async function UserBookingsPage() {
  const result = await handleGetMyBookings();
  const bookings = result.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Bookings</h1>
        <p className="text-sm text-gray-500">View your booking history</p>
      </div>

      {bookings.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-500">No bookings yet.</p>
          <a
            href="/booking/search"
            className="mt-4 inline-block text-green-600 hover:underline"
          >
            Book your first ticket
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking: any) => (
            <div
              key={booking._id}
              className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {booking.from} → {booking.to}
                    </h3>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Booking ID</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {booking.bookingId}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Travel Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(booking.travelDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Seats</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {booking.seats}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total Amount</p>
                      <p className="font-semibold text-green-600">NPR {booking.totalAmount}</p>
                    </div>
                  </div>
                </div>

                <div className="ml-6">
                  {booking.status === "confirmed" && (
                    <CancelBookingButton bookingId={booking._id} />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}