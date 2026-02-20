"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { revalidatePath } from "next/cache";

export const handleGetAllBuses = async () => {
  try {
    const res = await axios.get(API.ADMIN.BUSES);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch buses",
    };
  }
};

export const handleCreateBus = async (data: any) => {
  try {
    const res = await axios.post(API.ADMIN.BUSES, data);
    revalidatePath("/admin/buses");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to create bus",
    };
  }
};

export const handleUpdateBus = async (busId: string, data: any) => {
  try {
    const res = await axios.patch(`${API.ADMIN.BUSES}/${busId}`, data);
    revalidatePath("/admin/buses");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to update bus",
    };
  }
};

export const handleDeleteBus = async (busId: string) => {
  try {
    await axios.delete(`${API.ADMIN.BUSES}/${busId}`);
    revalidatePath("/admin/buses");
    return { success: true, message: "Bus deleted" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Delete failed",
    };
  }
};