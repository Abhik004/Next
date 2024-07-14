"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4">Verify Email</h1>
        <h2 className="text-lg mb-4">
          {token ? `${token}` : "No token"}
        </h2>

        {verified && (
          <div className="text-center">
            <h2 className="text-green-600 text-xl font-semibold mb-4">Email Verified</h2>
            <Link href="/login">
                Login
              
            </Link>
          </div>
        )}

        {error && (
          <div className="text-center">
            <h2 className="text-red-600 text-xl font-semibold">Error</h2>
          </div>
        )}
      </div>
    </div>
  );
}
