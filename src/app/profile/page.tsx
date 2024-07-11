"use client"
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import Link from "next/link";

export default function ProfilePage() {
    const router=useRouter();
    const logout=()=>{
        try {
            axios.get('/api/users/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error:any) {
            console.log(error.message);
            toast.error(error.message);
        }
    }
    const handleLogout = () => {
        
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gradient-to-r from-blue-500 to-teal-400">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full sm:w-3/4 md:w-2/4 lg:w-1/3">
            <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-800">Profile</h1>
            <hr className="mb-6 border-gray-300" />
            <p className="text-lg text-gray-600 text-center mb-8">Welcome to your Profile Page</p>
            <hr className="mb-6 border-gray-300" />
            <div className="flex justify-center">
                <button
                    onClick={logout}
                    className="flex items-center bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    <FiLogOut className="mr-2" /> Logout
                </button>
            </div>
        </div>
    </div>
    );
}


/*any route needed for id - create another folder named [id] under profile */