// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert('Error logging in: ' + error.message);
        } else {
            // Redirect to the dashboard after successful login
            router.push('/dashboard/invoices');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
            <div className="w-full max-w-md p-8 space-y-6 bg-black rounded-xl border border-white/10">
                <h1 className="text-3xl font-bold text-center">Admin Login</h1>
                <form onSubmit={handleSignIn} className="space-y-6">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}