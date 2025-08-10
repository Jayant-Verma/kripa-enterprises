// src/app/dashboard/layout.tsx
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { PlusCircle, List, User } from 'lucide-react';
import SignOutButton from './SignOutButton';

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Get the current user session
    const { data: { user } } = await supabase.auth.getUser();

    // If no user is logged in, redirect to the login page
    // Middleware should handle this, but it's a good failsafe
    if (!user) {
        redirect('/login');
    }

    return (
        <div className= "flex min-h-screen bg-neutral-900 text-gray-200" >
        {/* Sidebar Navigation */ }
        < aside className = "w-64 flex-shrink-0 bg-black p-6 border-r border-white/10 flex flex-col justify-between" >
            <div>
            <h1 className="text-2xl font-bold text-white mb-10" >
                Kripa Enterprises
                    </h1>
                    < nav className = "flex flex-col space-y-2" >
                        <Link 
              href="/dashboard/invoices/create"
    className = "flex items-center gap-3 px-3 py-2 rounded-md text-lg text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors"
        >
        <PlusCircle size={ 22 } />
            <span> Create Invoice </span>
                </Link>
                < Link
    href = "/dashboard/invoices"
    className = "flex items-center gap-3 px-3 py-2 rounded-md text-lg text-gray-300 hover:bg-neutral-800 hover:text-white transition-colors"
        >
        <List size={ 22 } />
            <span> Past Invoices </span>
                </Link>
                </nav>
                </div>

    {/* User Info and Sign Out */ }
    <div className="space-y-4" >
        <div className="flex items-center gap-3 border-t border-white/10 pt-4" >
            <div className="p-2 bg-neutral-700 rounded-full" >
                <User size={ 20 } />
                    </div>
                    <span className="text-sm font-medium truncate">{user.email}</span>
                        </div>
                        < SignOutButton />
                        </div>
                        </aside>

    {/* Main Content */ }
    <main className="flex-1 p-8 overflow-auto" >
        { children }
        </main>
        </div>
  );
}