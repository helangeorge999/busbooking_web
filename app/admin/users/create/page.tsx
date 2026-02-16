import { handleGetAllUsers } from "@/lib/actions/admin/user-action";
import UsersTable from "./../_components/UsersTable";

export default async function AdminUsersPage() {
  const result = await handleGetAllUsers();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users</h1>
        <p className="text-sm text-gray-500">Manage all registered passengers</p>
      </div>
      <UsersTable initialUsers={result.data ?? []} />
    </div>
  );
}