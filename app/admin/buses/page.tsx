import { handleGetAllBuses } from "@/lib/actions/admin/bus-action";
import Link from "next/link";
import DeleteBusButton from "./_components/DeleteBusButton";

export default async function AdminBusesPage() {
  const result = await handleGetAllBuses();
  const buses = result.data ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Buses</h1>
          <p className="text-sm text-gray-500">Manage all bus routes and schedules</p>
        </div>
        <Link
          href="/admin/buses/create"
          className="rounded-lg bg-green-600 px-4 py-2.5 text-sm font-semibold text-white
                     transition hover:bg-green-700"
        >
          + Add New Bus
        </Link>
      </div>

      {/* Bus List */}
      <div className="space-y-4">
        {buses.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-12 text-center dark:border-gray-700 dark:bg-gray-900">
            <div className="text-6xl mb-4">🚌</div>
            <p className="text-gray-500">No buses added yet.</p>
            <Link
              href="/admin/buses/create"
              className="mt-4 inline-block text-green-600 hover:underline"
            >
              Add your first bus
            </Link>
          </div>
        ) : (
          buses.map((bus: any) => (
            <div
              key={bus._id}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm
                         dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {bus.name}
                    </h3>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {bus.type}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Route</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {bus.from} → {bus.to}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Departure</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {bus.departureTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Price</p>
                      <p className="font-medium text-green-600">NPR {bus.price}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Seats</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {bus.totalSeats}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-6 flex gap-2">
                  <Link
                    href={`/admin/buses/${bus._id}/edit`}
                    className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600
                               hover:bg-blue-100"
                  >
                    Edit
                  </Link>
                  <DeleteBusButton busId={bus._id} busName={bus.name} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}