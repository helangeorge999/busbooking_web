"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { cookies } from "next/headers";
import { setAuthToken, setUserData } from "@/lib/cookie";

// ─── User Login ───────────────────────────────────────────────────────────────
export const loginAction = async (values: {
  email: string;
  password: string;
}): Promise<
  | { success: true;  data: any; role: "user" }
  | { success: false; message: string }
> => {
  try {
    const res = await axios.post(API.AUTH.LOGIN, values);
    const { token, user } = res.data;

    await setAuthToken(token);
    await setUserData(user);

    return { success: true, data: user, role: "user" };
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

// ─── Admin Login (separate endpoint → separate Admin collection) ──────────────
export const adminLoginAction = async (values: {
  email: string;
  password: string;
}): Promise<
  | { success: true;  data: any; role: "admin" }
  | { success: false; message: string }
> => {
  try {
    const res = await axios.post(API.ADMIN_AUTH.LOGIN, values);
    const { token, user } = res.data;

    await setAuthToken(token);
    await setUserData(user);

    return { success: true, data: user, role: "admin" };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Admin login failed. Please try again.",
    };
  }
};

// ─── Register ─────────────────────────────────────────────────────────────────
export const registerAction = async (values: {
  name: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const res = await axios.post(API.AUTH.REGISTER, values);
    return { success: true, data: res.data.user };
  } catch (error: any) {
    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Registration failed. Please try again.",
    };
  }
};

// ─── Who Am I ─────────────────────────────────────────────────────────────────
export const handleWhoAmI = async () => {
  try {
    const res = await axios.get(API.AUTH.WHOAMI);
    return { success: true, data: res.data };
  } catch {
    return { success: false, data: null };
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
export const handleLogout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete({ name: "auth_token", path: "/" });
    cookieStore.delete({ name: "user_data",  path: "/" });
    return { success: true };
  } catch (err: any) {
    console.error("Logout error:", err);
    return { success: false, message: "Logout failed." };
  }
};

// ─── Update Profile ───────────────────────────────────────────────────────────
export const handleUpdateProfile = async (values: any) => {
  try {
    const endpoint = API.USER?.UPDATE_PROFILE || "/api/user/profile";
    const res = await axios.patch(endpoint, values);

    if (res.data?.user) {
      await setUserData(res.data.user);
    }

    return { success: true, data: res.data };
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