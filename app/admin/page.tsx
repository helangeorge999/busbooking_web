import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import { handleGetAllBookings } from "@/lib/actions/booking-action";
import { handleGetAllBuses } from "@/lib/actions/admin/bus-action";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [userResult, bookingResult, busResult] = await Promise.all([
    handleGetAllUsers(),
    handleGetAllBookings(),
    handleGetAllBuses(),
  ]);

  const users    = userResult.data ?? [];
  const bookings = bookingResult.data ?? [];
  const buses    = busResult.data ?? [];

  const today = new Date().toISOString().split("T")[0];
  const bookingsToday = bookings.filter((b: any) => {
    const created = b.createdAt?.split("T")[0];
    return created === today;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, Admin</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        {[
          { label: "Total Users",    value: users.length,         icon: "👥", color: "bg-blue-50 text-blue-700"    },
          { label: "Total Buses",    value: buses.length,         icon: "🚌", color: "bg-green-50 text-green-700"  },
          { label: "Total Bookings", value: bookings.length,      icon: "🎫", color: "bg-purple-50 text-purple-700" },
          { label: "Bookings Today", value: bookingsToday.length, icon: "📅", color: "bg-yellow-50 text-yellow-700" },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="mt-1 text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              </div>
              <span className={`rounded-lg p-3 text-2xl ${stat.color}`}>{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent users */}
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
        <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
          <h2 className="font-semibold text-gray-800 dark:text-white">Recent Users</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {users.slice(0, 5).map((user: any) => (
            <div key={user._id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                Active
              </span>
            </div>
          ))}
          {users.length === 0 && (
            <p className="px-5 py-4 text-sm text-gray-500">No users yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}