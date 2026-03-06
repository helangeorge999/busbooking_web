import { handleGetAllBookings } from "@/lib/actions/booking-action";

export default async function AdminBookingsPage() {
  const result = await handleGetAllBookings();
  const bookings = result.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Bookings</h1>
        <p className="text-sm text-gray-500">View all customer bookings</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
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
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {bookings.map((booking: any) => (
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
                  <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
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
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-8 text-center text-gray-400">
                    No bookings yet.
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