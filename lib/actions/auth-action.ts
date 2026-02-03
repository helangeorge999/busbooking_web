// lib/actions/auth-action.ts
"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { cookies } from "next/headers";
import { setAuthToken, setUserData } from "@/lib/cookie";

export const loginAction = async (values: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(API.AUTH.LOGIN, values);

    const { token, user } = res.data;

    await setAuthToken(token);
    await setUserData(user);

    return {
      success: true,
      data: user,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.",
    };
  }
};

export const handleWhoAmI = async () => {
  try {
    const res = await axios.get(API.AUTH.WHOAMI);

    return {
      success: true,
      data: res.data,
    };
  } catch {
    return {
      success: false,
      data: null,
    };
  }
};

export const handleLogout = async () => {
  try {
    // Optional backend call
    // await axios.post(API.AUTH.LOGOUT);

    const cookieStore = await cookies();   // ← critical await

    cookieStore.delete("auth_token", { path: "/" });
    cookieStore.delete("user_data",   { path: "/" });

    return { success: true };
  } catch (err: any) {
    console.error("Logout error:", err);
    return { success: false, message: "Logout failed." };
  }
};

export const handleUpdateProfile = async (values: any) => {
  try {
    // Adjust endpoint to match your actual API
    const endpoint = API.USER?.UPDATE_PROFILE || "/api/user/profile";

    const res = await axios.patch(endpoint, values);

    // If backend returns updated user → update cookie
    if (res.data?.user) {
      await setUserData(res.data.user);
    }

    return {
      success: true,
      data: res.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Profile update failed. Please try again.",
    };
  }
};