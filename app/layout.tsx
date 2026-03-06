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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme:dark)").matches)){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 transition-colors">
        <AuthProvider initialUser={userData}>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </AuthProvider>
      </body>
    </html>
  );
}