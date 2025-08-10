// src/app/dashboard/invoices/page.tsx
import { createClient } from '@/lib/supabase/server'; // Import the new server helper
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function PastInvoicesPage() {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore); // Create the server client

    const { data: { session } } = await supabase.auth.getSession();

    const { data: invoices, error } = await supabase
        .from('invoices')
        .select('*')
        .eq('user_id', session?.user?.id)
        .order('created_at', { ascending: false });

    // ... rest of the component remains the same
    if (error) {
        return <p className="text-red-500">Error loading invoices: {error.message}</p>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Past Invoices</h1>
            <div className="space-y-4">
                {invoices?.map(invoice => (
                    // WRAP with a Link component
                    <Link
                        key={invoice.id}
                        href={`/dashboard/invoices/${invoice.id}`}
                        className="block bg-black p-4 rounded-lg border border-white/10 hover:border-blue-500/50 transition-colors duration-300"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-bold text-lg text-white">{invoice.customer_name}</p>
                                <p className="text-sm text-gray-400">Date: {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                            </div>
                            <p className="font-semibold text-xl text-green-400">₹{invoice.total_amount}</p>
                        </div>
                    </Link>
                ))}
                {invoices?.length === 0 && <p className="text-gray-400">You haven&apos;t created any invoices yet.</p>}
            </div>
        </div>
    );
}