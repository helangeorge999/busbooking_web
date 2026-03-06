"use server";

import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoint";
import { cookies } from "next/headers";
import { setAuthToken, setUserData } from "@/lib/cookie";

export const loginAction = async (values: { email: string; password: string }): Promise<
  | { success: true; data: any; role: "user" }
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
      message: error.response?.data?.message || error.message || "Login failed.",
    };
  }
};

export const adminLoginAction = async (values: { email: string; password: string }): Promise<
  | { success: true; data: any; role: "admin" }
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
      message: error.response?.data?.message || error.message || "Admin login failed.",
    };
  }
};

export const registerAction = async (values: {
  name: string; email: string; dob: string;
  gender: string; phone: string; password: string; confirmPassword: string;
}) => {
  try {
    const res = await axios.post(API.AUTH.REGISTER, values);
    return { success: true, data: res.data.user };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Registration failed.",
    };
  }
};

export const handleWhoAmI = async () => {
  try {
    const res = await axios.get(API.AUTH.WHOAMI);
    return { success: true, data: res.data };
  } catch {
    return { success: false, data: null };
  }
};

export const handleLogout = async () => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete({ name: "auth_token", path: "/" });
    cookieStore.delete({ name: "user_data",  path: "/" });
    return { success: true };
  } catch (err: any) {
    return { success: false, message: "Logout failed." };
  }
};

export const handleChangePassword = async (values: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const res = await axios.post(API.USER.CHANGE_PASSWORD, values);
    return { success: true, message: res.data?.message || "Password changed successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to change password.",
    };
  }
};

export const handleForgotPassword = async (email: string) => {
  try {
    const res = await axios.post(API.AUTH.FORGOT_PASSWORD, { email });
    return { success: true, data: res.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to send reset request.",
    };
  }
};

export const handleResetPassword = async (values: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  try {
    const res = await axios.post(API.AUTH.RESET_PASSWORD, values);
    return { success: true, message: res.data?.message || "Password reset successfully" };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to reset password.",
    };
  }
};

export const handleUpdateProfile = async (values: any) => {
  try {
    const { userId, ...profileData } = values;
    
    // Send userId as query parameter, not in body
    const res = await axios.patch(
      `${API.USER.UPDATE_PROFILE}?userId=${userId}`,
      profileData
    );
    
    if (res.data?.data) await setUserData(res.data.data);
    return { success: true, data: res.data };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Update failed.",
    };
  }
};