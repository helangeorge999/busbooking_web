"use client";

import { useState, useTransition } from "react";
import { handleDeleteBus } from "@/lib/actions/admin/bus-action";
import { toast } from "react-toastify";

export default function DeleteBusButton({ busId, busName }: { busId: string; busName: string }) {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Delete "${busName}"? This cannot be undone.`)) return;

    startTransition(async () => {
      const result = await handleDeleteBus(busId);
      if (result.success) {
        toast.success("Bus deleted successfully");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600
                 hover:bg-red-100 disabled:opacity-50"
    >
      {pending ? "Deleting..." : "Delete"}
    </button>
  );
}