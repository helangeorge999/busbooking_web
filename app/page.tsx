import LoginForm from "./(auth)/_components/LoginForm";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center">
      
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
        style={{ backgroundImage: "url('/images/bus.png')" }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="rounded-3xl bg-black/70 backdrop-blur-xl p-8 shadow-2xl">
          
          <h1 className="text-2xl font-semibold text-white text-center">
            Welcome back
          </h1>
          <p className="text-sm text-gray-400 text-center mb-6">
            Log in to your account
          </p>

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
