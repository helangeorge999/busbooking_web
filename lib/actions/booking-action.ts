"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { revalidatePath } from "next/cache";

export const handleCreateBooking = async (data: any) => {
  try {
    const res = await axios.post(API.BOOKINGS.CREATE, data);
    revalidatePath("/user/bookings");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create booking",
    };
  }
};

export const handleGetMyBookings = async () => {
  try {
    const res = await axios.get(API.BOOKINGS.MY_BOOKINGS);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch bookings",
    };
  }
};

export const handleGetBookedSeats = async (busId: string, travelDate: string) => {
  try {
    const res = await axios.get(API.BOOKINGS.BOOKED_SEATS, {
      params: { busId, travelDate },
    });
    return { success: true, data: res.data.data as number[] };
  } catch (error: any) {
    return {
      success: false,
      data: [] as number[],
      message: error.response?.data?.message || "Failed to fetch booked seats",
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