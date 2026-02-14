import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthContext";
import { getUserData } from "@/lib/cookie";

export const metadata: Metadata = {
  title: "BusBooking",
  description: "Book your bus tickets easily",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUserData();

  return (
    <html lang="en">
      <body className="min-h-screen w-full bg-gray-50 dark:bg-gray-950">
        <AuthProvider initialUser={userData}>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
      </body>
    </html>
  );
}