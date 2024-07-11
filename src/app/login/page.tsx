"use client"; /*usually now nextjs consider everything as server side(backend) to make it frontend, use this */

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold">{loading ? "Processing" : "Login"}</h1>
                        <hr className="mt-4 mb-6" />
                        <div className="space-y-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-pink-200 focus:border-pink-500"
                                id="email"
                                type="text"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="email"
                            />
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-pink-200 focus:border-pink-500"
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="password"
                            />
                            <button
                                onClick={onLogin}
                                disabled={buttonDisabled}
                                className={`w-full px-4 py-2 text-white rounded-lg shadow-lg focus:outline-none focus:ring focus:ring-pink-200 ${
                                    buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"
                                }`}
                            >
                                {loading ? "Logging in..." : "Login Here"}
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <Link href="/signup" className="text-pink-500 hover:underline">Visit Sign Up Page</Link></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
