import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Link
        href="/dashboard"
        className="rounded-md bg-blue-600 px-6 py-3 text-white"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
