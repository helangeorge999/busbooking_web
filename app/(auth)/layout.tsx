export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-700 via-green-800 to-gray-900">
      {children}
    </div>
  );
}