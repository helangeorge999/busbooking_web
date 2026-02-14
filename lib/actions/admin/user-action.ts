"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { revalidatePath } from "next/cache";

export const handleGetAllUsers = async () => {
  try {
    const res = await axios.get(API.ADMIN.USERS);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return { success: false, data: [], message: error.response?.data?.message || "Failed to fetch users" };
  }
};

export const handleDeleteUser = async (userId: string) => {
  try {
    await axios.delete(API.ADMIN.DELETE_USER(userId));
    revalidatePath("/admin/users");
    return { success: true, message: "User deleted" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Delete failed",
    };
  }
};

export const handleUpdateUser = async (userId: string, data: object) => {
  try {
    const res = await axios.patch(API.ADMIN.UPDATE_USER(userId), data);
    revalidatePath("/admin/users");
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Update failed",
    };
  }
};