"use client";

import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import { handleGetUserById, handleUpdateUser } from "@/lib/actions/admin/user-action";

const editUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  gender: z.string().optional(),
  dob: z.string().optional(),
});

type EditUserForm = z.infer<typeof editUserSchema>;

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const userId = params.id as string;
  const [pending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  const form = useForm<EditUserForm>({
    resolver: zodResolver(editUserSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      const result = await handleGetUserById(userId);
      if (result.success && result.data) {
        form.reset({
          name: result.data.name || "",
          email: result.data.email || "",
          phone: result.data.phone || "",
          gender: result.data.gender || "",
          dob: result.data.dob || "",
        });
      } else {
        toast.error("User not found");
        router.push("/admin/users");
      }
      setLoading(false);
    };
    fetchUser();
  }, [userId, form, router]);

  const onSubmit = form.handleSubmit((data) => {
    startTransition(async () => {
      const result = await handleUpdateUser(userId, data);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("User updated successfully!");
      router.push("/admin/users");
    });
  });

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-green-200 border-t-green-600"></div>
          <p className="mt-4 text-gray-600">Loading user details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit User</h1>
        <p className="text-sm text-gray-500">Update passenger information</p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <input
              {...form.register("name")}
              placeholder="John Doe"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {form.formState.errors.name && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              {...form.register("email")}
              type="email"
              placeholder="john@example.com"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {form.formState.errors.email && (
              <p className="mt-1 text-xs text-red-500">{form.formState.errors.email.message}</p>
            )}
          </div>

          {/* Phone & Gender */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone
              </label>
              <input
                {...form.register("phone")}
                placeholder="1234567890"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Gender
              </label>
              <select
                {...form.register("gender")}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>

          {/* Date of Birth */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Date of Birth
            </label>
            <input
              {...form.register("dob")}
              type="date"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 rounded-lg bg-green-600 py-3 font-semibold text-white
                         transition hover:bg-green-700 disabled:opacity-50"
            >
              {pending ? "Updating..." : "Update User"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700
                         transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}