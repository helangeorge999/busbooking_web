import { handleGetAllBookings } from "@/lib/actions/booking-action";
import BookingsTable from "./_components/BookingsTable";

export default async function AdminBookingsPage() {
  const result = await handleGetAllBookings();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Bookings</h1>
        <p className="text-sm text-gray-500">Manage all customer bookings</p>
      </div>
      <BookingsTable initialBookings={result.data ?? []} />
    </div>
  );
}
