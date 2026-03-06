import Link from "next/link";
import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import UsersTable from "./_components/UsersTable";

export default async function AdminUsersPage() {
  const result = await handleGetAllUsers();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
          <p className="text-sm text-gray-500">Manage all registered passengers</p>
        </div>
        <Link
          href="/admin/users/create"
          className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm
                     font-semibold text-white shadow-sm transition hover:bg-green-700"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create User
        </Link>
      </div>
      <UsersTable initialUsers={result.data ?? []} />
    </div>
  );
}
