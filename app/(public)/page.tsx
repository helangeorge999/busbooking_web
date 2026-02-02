export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to BusBooking 🚍
        </h1>

        <p className="text-lg text-gray-600 mb-6">
          Book your bus tickets easily, quickly, and securely.
          Travel smarter with real-time seat availability and instant confirmation.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </a>

          <a
            href="/about"
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </main>
  );
}
