"use client";

import { useTransition } from "react";
import { handleCancelBooking } from "@/lib/actions/booking-action";
import { toast } from "react-toastify";

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
  const [pending, startTransition] = useTransition();

  const handleCancel = () => {
    if (!confirm("Cancel this booking?")) return;

    startTransition(async () => {
      const result = await handleCancelBooking(bookingId);
      if (result.success) {
        toast.success("Booking cancelled");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <button
      onClick={handleCancel}
      disabled={pending}
      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600
                 hover:bg-red-100 disabled:opacity-50"
    >
      {pending ? "Cancelling..." : "Cancel Booking"}
    </button>
  );
}