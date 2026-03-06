"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { revalidatePath } from "next/cache";

export const handleGetAllBuses = async () => {
  try {
    const res = await axios.get(API.BUSES.GET_ALL);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch buses",
    };
  }
};

export const handleGetBusById = async (id: string) => {
  try {
    const res = await axios.get(API.BUSES.GET_BY_ID(id));
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || "Failed to fetch bus",
    };
  }
};

export const handleCreateBus = async (data: any) => {
  try {
    const res = await axios.post(API.BUSES.CREATE, data);
    revalidatePath("/admin/buses");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to create bus",
    };
  }
};

export const handleUpdateBus = async (id: string, data: any) => {
  try {
    const res = await axios.patch(API.BUSES.UPDATE(id), data);
    revalidatePath("/admin/buses");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to update bus",
    };
  }
};

export const handleDeleteBus = async (id: string) => {
  try {
    await axios.delete(API.BUSES.DELETE(id));
    revalidatePath("/admin/buses");
    return { success: true, message: "Bus deleted" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Delete failed",
    };
  }
};

export const handleSearchBuses = async (from: string, to: string) => {
  try {
    const res = await axios.get(`${API.BUSES.SEARCH}?from=${from}&to=${to}`);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to search buses",
    };
  }
};