"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";

const profileSchema = z.object({
  name:   z.string().min(2, "Name must be at least 2 characters"),
  phone:  z.string().min(7, "Enter a valid phone number"),
  gender: z.enum(["male", "female"], { message: "Select a gender" }),
  dob:    z.string().min(1, "Date of birth is required"),
});
type ProfileData = z.infer<typeof profileSchema>;

export default function ProfileForm({ user }: { user: any }) {
  const { setUser } = useAuth();
  const [pending, startTransition] = useTransition();

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name:   user?.name   ?? "",
      phone:  user?.phone  ?? "",
      gender: user?.gender ?? "male",
      dob:    user?.dob    ?? "",
    },
  });

  const submit = (values: ProfileData) => {
    startTransition(async () => {
      const res = await handleUpdateProfile({
        ...values,
        userId: user?.id ?? user?._id,
      });
      if (!res.success) {
        toast.error(res.message ?? "Update failed");
        return;
      }
      toast.success("Profile updated!");
      if (res.data?.data) setUser(res.data.data);
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900">
      {/* Avatar */}
      <div className="mb-6 flex items-center gap-4">
        {user?.photoUrl ? (
          <Image
            src={user.photoUrl}
            alt="Avatar"
            width={72}
            height={72}
            className="h-18 w-18 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-2xl font-bold text-green-700">
            {user?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
        )}
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">{user?.name}</p>
          <p className="text-sm text-gray-500">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(submit)} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
          <input
            {...register("name")}
            className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                       focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                       dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
          <input
            {...register("phone")}
            type="tel"
            className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                       focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                       dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
          <select
            {...register("gender")}
            className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-700
                       focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                       dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
          <input
            {...register("dob")}
            type="date"
            className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm text-gray-700
                       focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600
                       dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300"
          />
          {errors.dob && <p className="mt-1 text-xs text-red-500">{errors.dob.message}</p>}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="h-11 w-full rounded-lg bg-green-600 text-sm font-semibold
                     text-white transition hover:bg-green-700 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}