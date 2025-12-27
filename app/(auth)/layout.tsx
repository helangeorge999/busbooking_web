import Image from "next/image";
import React from "react";

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

            {/* 🔹 Background Image */}
            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/bus.png"
                    alt="Background"
                    fill
                    priority
                    className="object-cover blur-sm scale-105"
                />
                {/* Optional dark overlay for better contrast */}
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* 🔹 Content Container (NOT blurred) */}
            <div className="w-full max-w-md rounded-xl border border-black/10 dark:border-white/10 bg-background/80 supports-[backdrop-filter]:backdrop-blur p-6 shadow-sm">
                {children}
            </div>

        </section>
    );
}
