import { getUserData } from "@/lib/cookie";

export default async function UserDashboardPage() {
  const user = await getUserData();

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-green-600 to-green-700 p-6 text-white shadow">
        <h1 className="text-2xl font-bold">Welcome back, {user?.name ?? "Traveller"}! 👋</h1>
        <p className="mt-1 text-green-100">Ready to plan your next journey?</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Book a Ticket",   icon: "🎫", desc: "Search & book bus tickets",    href: "#" },
          { label: "My Bookings",     icon: "📋", desc: "View your booking history",    href: "#" },
          { label: "Update Profile",  icon: "👤", desc: "Edit your personal details",   href: "/user/profile" },
        ].map((action) => (
          <a
            key={action.label}
            href={action.href}
            className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition
                       hover:border-green-400 hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
          >
            <span className="text-3xl">{action.icon}</span>
            <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-green-700 dark:text-white">
              {action.label}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{action.desc}</p>
          </a>
        ))}
      </div>

      {/* Info Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-gray-900">
        <h2 className="mb-4 font-semibold text-gray-800 dark:text-white">Your Details</h2>
        <dl className="grid grid-cols-2 gap-3 text-sm">
          {[
            { label: "Name",   value: user?.name   },
            { label: "Email",  value: user?.email  },
            { label: "Phone",  value: user?.phone  },
            { label: "Gender", value: user?.gender },
          ].map((item) => (
            <div key={item.label}>
              <dt className="text-gray-500">{item.label}</dt>
              <dd className="font-medium text-gray-900 dark:text-white capitalize">
                {item.value ?? "—"}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}