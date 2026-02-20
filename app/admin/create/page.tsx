"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "react-toastify";
import { handleCreateBus } from "@/lib/actions/admin/bus-action";

const CITIES = ["Kathmandu", "Pokhara", "Nepalgunj"];
const BUS_TYPES = ["AC Sleeper", "AC Semi-Sleeper", "Non-AC Sleeper", "AC Seater", "Non-AC Seater"];

const busSchema = z.object({
  name: z.string().min(3, "Bus name is required"),
  from: z.string().min(1, "Origin is required"),
  to: z.string().min(1, "Destination is required"),
  departureTime: z.string().min(1, "Departure time is required"),
  arrivalTime: z.string().min(1, "Arrival time is required"),
  price: z.number().min(1, "Price must be greater than 0"),
  totalSeats: z.number().min(1).max(60),
  type: z.string().min(1, "Bus type is required"),
  rating: z.number().min(0).max(5).default(4.0),
});

type BusFormData = z.infer<typeof busSchema>;

export default function CreateBusPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusFormData>({
    resolver: zodResolver(busSchema),
    defaultValues: {
      totalSeats: 40,
      rating: 4.0,
    },
  });

  const onSubmit = (data: BusFormData) => {
    startTransition(async () => {
      const result = await handleCreateBus(data);
      if (!result.success) {
        toast.error(result.message);
        return;
      }
      toast.success("Bus created successfully!");
      router.push("/admin/buses");
    });
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Bus</h1>
        <p className="text-sm text-gray-500">Create a new bus route</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-900"
      >
        <div className="space-y-6">
          {/* Bus Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bus Name
            </label>
            <input
              {...register("name")}
              placeholder="e.g., Deluxe Express"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
          </div>

          {/* Route */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                From
              </label>
              <select
                {...register("from")}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select City</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.from && <p className="mt-1 text-xs text-red-500">{errors.from.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                To
              </label>
              <select
                {...register("to")}
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              >
                <option value="">Select City</option>
                {CITIES.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {errors.to && <p className="mt-1 text-xs text-red-500">{errors.to.message}</p>}
            </div>
          </div>

          {/* Timings */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Departure Time
              </label>
              <input
                {...register("departureTime")}
                type="time"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              {errors.departureTime && (
                <p className="mt-1 text-xs text-red-500">{errors.departureTime.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Arrival Time
              </label>
              <input
                {...register("arrivalTime")}
                type="time"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              {errors.arrivalTime && (
                <p className="mt-1 text-xs text-red-500">{errors.arrivalTime.message}</p>
              )}
            </div>
          </div>

          {/* Bus Type */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Bus Type
            </label>
            <select
              {...register("type")}
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              <option value="">Select Type</option>
              {BUS_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.type && <p className="mt-1 text-xs text-red-500">{errors.type.message}</p>}
          </div>

          {/* Price & Seats */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Price (NPR)
              </label>
              <input
                {...register("price", { valueAsNumber: true })}
                type="number"
                placeholder="1500"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              {errors.price && <p className="mt-1 text-xs text-red-500">{errors.price.message}</p>}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Seats
              </label>
              <input
                {...register("totalSeats", { valueAsNumber: true })}
                type="number"
                placeholder="40"
                className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                           focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                           dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
              {errors.totalSeats && (
                <p className="mt-1 text-xs text-red-500">{errors.totalSeats.message}</p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Rating (0-5)
            </label>
            <input
              {...register("rating", { valueAsNumber: true })}
              type="number"
              step="0.1"
              min="0"
              max="5"
              placeholder="4.5"
              className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                         focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500
                         dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            />
            {errors.rating && <p className="mt-1 text-xs text-red-500">{errors.rating.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={pending}
              className="flex-1 rounded-lg bg-green-600 py-3 font-semibold text-white
                         transition hover:bg-green-700 disabled:opacity-50"
            >
              {pending ? "Creating..." : "Create Bus"}
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