"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        const verifyUserEmail = async () => {
            try {
                const response = await axios.post("/api/users/verifyemail", { token });
                setVerified(true);
                setIsAdmin(response.data.isAdmin);
            } catch (error: unknown) {
                setError(true);
                if (axios.isAxiosError(error) && error.response) {
                    console.log(error.response.data);
                } else {
                    console.log('An error occurred');
                }
            }
        }

        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    const getDashboardLink = () => {
        return isAdmin ? "/admin" : "/dashboard";
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-950">
            <div className="w-full max-w-md p-8 space-y-6 rounded-lg border border-zinc-800 bg-zinc-900/30 backdrop-blur-xl">
                <h1 className="text-3xl font-bold text-center text-zinc-100">Email Verification</h1>
                
                {!verified && !error && (
                    <div className="animate-pulse flex flex-col items-center space-y-4">
                        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"/>
                        <p className="text-zinc-400">Verifying your email...</p>
                    </div>
                )}

                {verified && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center text-teal-500">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                            </svg>
                        </div>
                        <h2 className="text-xl text-center text-zinc-100">Email Verified Successfully!</h2>
                        <Link 
                            href={getDashboardLink()}
                            className="w-full flex items-center justify-center px-4 py-2 rounded-md bg-teal-500 text-zinc-900 hover:bg-teal-400 transition-colors font-medium"
                        >
                            Go to {isAdmin ? 'Admin Panel' : 'Dashboard'}
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center text-rose-500">
                            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </div>
                        <h2 className="text-xl text-center text-rose-500">Verification Failed</h2>
                        <p className="text-center text-zinc-400">Please try again or contact support</p>
                    </div>
                )}
            </div>
        </div>
    )
}