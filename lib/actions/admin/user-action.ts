"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { revalidatePath } from "next/cache";

export const handleGetAllUsers = async () => {
  try {
    const res = await axios.get(API.ADMIN.USERS);
    return { success: true, data: res.data.data };
  } catch (error: any) {
    return {
      success: false,
      data: [],
      message: error.response?.data?.message || "Failed to fetch users",
    };
  }
};

export const handleGetUserById = async (userId: string) => {
  try {
    const res = await axios.get(API.ADMIN.USERS);
    const users = res.data.data || [];
    const user = users.find((u: any) => u._id === userId);
    if (!user) return { success: false, data: null, message: "User not found" };
    return { success: true, data: user };
  } catch (error: any) {
    return {
      success: false,
      data: null,
      message: error.response?.data?.message || "Failed to fetch user",
    };
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

export const handleAdminResetPassword = async (userId: string, newPassword: string) => {
  try {
    await axios.patch(API.ADMIN.UPDATE_USER(userId), { password: newPassword });
    return { success: true, message: "Password reset successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password",
    };
  }
};