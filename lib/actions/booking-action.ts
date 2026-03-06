"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { revalidatePath } from "next/cache";

export const handleCreateBooking = async (data: any) => {
  try {
    console.log("📤 Creating booking with data:", JSON.stringify(data, null, 2));
    const res = await axios.post(API.BOOKINGS.CREATE, data);
    console.log("✅ Booking created:", JSON.stringify(res.data, null, 2));
    revalidatePath("/user/bookings");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    console.error("❌ Create booking error:", error.response?.status, JSON.stringify(error.response?.data));
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create booking",
    };
  }
};

export const handleGetMyBookings = async () => {
  try {
    const res = await axios.get(API.BOOKINGS.MY_BOOKINGS);
    console.log("📦 My Bookings API response:", JSON.stringify(res.data, null, 2));
    const bookings = res.data.data ?? res.data.bookings ?? res.data;
    return { success: true, data: Array.isArray(bookings) ? bookings : [] };
  } catch (error: any) {
    console.error("❌ My Bookings API error:", error.response?.status, error.response?.data);
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch bookings",
    };
  }
};

export const handleGetAllBookings = async () => {
  try {
    const res = await axios.get(API.BOOKINGS.GET_ALL);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch bookings",
    };
  }
};

export const handleCancelBooking = async (id: string) => {
  try {
    const res = await axios.patch(API.BOOKINGS.CANCEL(id));
    revalidatePath("/user/bookings");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to cancel booking",
    };
  }
};