import Image from "next/image";

export default function DashboardPage() {
    return (
        <div className="relative min-h-screen">
            {/* Background Image */}
            <Image
                src="/images/buses.png"
                alt="Bus background"
                fill
                priority
                className="object-cover"
            />

            {/* Overlay (optional for readability) */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 flex min-h-screen items-center justify-center">
                <h1 className="text-3xl font-bold text-white">
                    Welcome to Bus Booking
                </h1>
            </div>
        </div>
    );
}
