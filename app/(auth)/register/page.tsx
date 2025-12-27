"use client";

import RegisterForm from "../_components/RegisterForm";

export default function Page() {
    return (
        <div className="space-y-6 w-full">
            <div className="text-center">
                <h1 className="text-2xl font-semibold">Sign Up</h1>
            </div>
            <RegisterForm />
        </div>
    );
}