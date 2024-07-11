"use client"; /*usually now nextjs consider everything as server side(backend) to make it frontend, use this */

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; /*suggestion will be wrong */
import axios from "axios";
import { toast } from "react-hot-toast";


export default function SignupPage() {
    const router=useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled,setButtonDisabled]=React.useState(false);

    const [loading,setloading]=React.useState(false);

    const onSignup = async () => {
        try {
            setloading(true);
            const response=await axios.post("/api/users/signup",user);
            console.log("Signup success", response.data);
            toast.success("Signup successful!");
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed ",error.message);
            
            toast.error("Signup failed: " + error.message);
        } finally{
            setloading(false);
        }
    };

    useEffect(()=>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    },[user]);//whenever a change is made in user, it will work
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 py-6 sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <h1 className="text-2xl font-semibold">{loading?"Processing":"SignUp"}</h1>
                        <hr className="mt-4 mb-6" />
                        <div className="space-y-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                                id="username"
                                type="text"
                                value={user.username}
                                onChange={(e) => setUser({ ...user, username: e.target.value })}
                                placeholder="username"
                            />
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                                id="email"
                                type="text"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                                placeholder="email"
                            />
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200 focus:border-blue-500"
                                id="password"
                                type="password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                placeholder="password"
                            />
                            <button
                                onClick={onSignup}
                                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
                            >
                                {buttonDisabled?"No Signup":"Signup Here"}
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <Link href="/login" className="text-blue-500 hover:underline">Visit Login Page</Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}