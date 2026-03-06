"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { handleForgotPassword, handleResetPassword } from "@/lib/actions/auth-action";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const onRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email");
      return;
    }

    startTransition(async () => {
      const result = await handleForgotPassword(email);
      if (result.success) {
        const otpCode = result.data?.otp;
        if (otpCode) {
          setOtp(otpCode.toString());
          setSuccess(`Your OTP code is: ${otpCode}`);
        } else {
          setSuccess("OTP generated. Please enter it below.");
        }
        setStep(2);
      } else {
        setError(result.message || "Failed to request password reset");
      }
    });
  };

  const onResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!otp) {
      setError("Please enter the OTP");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const result = await handleResetPassword({ email, otp, newPassword });
      if (result.success) {
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(result.message || "Failed to reset password");
      }
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-green-700 px-8 py-8 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/20">
            <span className="text-2xl">🔑</span>
          </div>
          <h1 className="text-2xl font-bold text-white">
            {step === 1 ? "Forgot Password" : "Reset Password"}
          </h1>
          <p className="mt-1 text-sm text-green-100">
            {step === 1
              ? "Enter your email to receive a reset OTP"
              : "Enter the OTP and your new password"}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white px-8 py-8">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={onRequestOtp} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="h-11 w-full rounded-lg bg-green-600 text-sm font-semibold
                           text-white transition hover:bg-green-700 disabled:opacity-60"
              >
                {pending ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={onResetPassword} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">OTP Code</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm tracking-widest text-center
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="h-11 w-full rounded-lg border border-gray-300 px-4 text-sm
                             focus:border-green-600 focus:outline-none focus:ring-1 focus:ring-green-600"
                />
              </div>
              <button
                type="submit"
                disabled={pending}
                className="h-11 w-full rounded-lg bg-green-600 text-sm font-semibold
                           text-white transition hover:bg-green-700 disabled:opacity-60"
              >
                {pending ? "Resetting..." : "Reset Password"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setError("");
                  setSuccess("");
                }}
                className="w-full text-sm text-gray-500 hover:text-gray-700"
              >
                Back to email step
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm text-green-600 hover:text-green-700 hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
