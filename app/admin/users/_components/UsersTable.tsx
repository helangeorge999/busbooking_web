"use client";

import { useState, useTransition } from "react";
import { handleDeleteUser, handleAdminResetPassword } from "@/lib/actions/admin/user-action";
import { toast } from "react-toastify";

export default function UsersTable({ initialUsers }: { initialUsers: any[] }) {
  const [users, setUsers] = useState(initialUsers);
  const [pending, startTransition] = useTransition();
  const [search, setSearch] = useState("");

  const filtered = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const onDelete = (userId: string) => {
    if (!confirm("Delete this user?")) return;
    startTransition(async () => {
      const res = await handleDeleteUser(userId);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u._id !== userId));
        toast.success("User deleted");
      } else {
        toast.error(res.message);
      }
    });
  };

  const onResetPassword = (userId: string, userName: string) => {
    const newPassword = prompt(`Enter new password for ${userName}:`);
    if (!newPassword) return;
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    startTransition(async () => {
      const res = await handleAdminResetPassword(userId, newPassword);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      {/* Search */}
      <div className="border-b border-gray-200 px-5 py-4 dark:border-gray-700">
        <input
          type="text"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2 text-sm
                     focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                     dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:bg-gray-800">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Phone</th>
              <th className="px-5 py-3">Gender</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-5 py-3 font-medium text-gray-900 dark:text-white">
                  {user.name}
                </td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">{user.email}</td>
                <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                  {user.phone ?? "—"}
                </td>
                <td className="px-5 py-3 capitalize text-gray-600 dark:text-gray-400">
                  {user.gender ?? "—"}
                </td>
                <td className="flex gap-2 px-5 py-3">
                  <a
                    href={`/admin/users/${user._id}/edit`}
                    className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600
                               hover:bg-blue-100"
                  >
                    Edit
                  </a>
                  <button
                    onClick={() => onResetPassword(user._id, user.name)}
                    disabled={pending}
                    className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-600
                               hover:bg-amber-100 disabled:opacity-50"
                  >
                    Reset Password
                  </button>
                  <button
                    onClick={() => onDelete(user._id)}
                    disabled={pending}
                    className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600
                               hover:bg-red-100 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
