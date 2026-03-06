"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { getAuthToken } from "@/lib/cookie";
import { revalidatePath } from "next/cache";

export const handleCreateBooking = async (data: any) => {
  try {
    const token = await getAuthToken();
    const res = await axios.post(API.BOOKINGS.CREATE, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
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
    const token = await getAuthToken();
    const res = await axios.get(API.BOOKINGS.MY_BOOKINGS, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    const bookings = res.data.data ?? res.data.bookings ?? res.data;
    return { success: true, data: Array.isArray(bookings) ? bookings : [] };
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
    const token = await getAuthToken();
    const res = await axios.get(API.BOOKINGS.GET_ALL, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
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
    const token = await getAuthToken();
    const res = await axios.patch(API.BOOKINGS.CANCEL(id), undefined, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    revalidatePath("/user/bookings");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to cancel booking",
    };
  }
};