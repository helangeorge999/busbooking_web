export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Contact Us
        </h1>

        <div className="bg-white p-6 rounded-lg shadow">
          <p className="mb-2">
            <strong>Email:</strong> support@busbooking.com
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> +977 9800000000
          </p>
          <p>
            <strong>Location:</strong> Kathmandu, Nepal
          </p>
        </div>
      </div>
    </main>
  );
}
