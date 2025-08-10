// src/app/dashboard/SignOutButton.tsx
'use client';

import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function SignOutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <button
            onClick={handleSignOut}
            className="w-full bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700"
        >
            Sign Out
        </button>
    );
}