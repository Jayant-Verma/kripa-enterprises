// src/app/dashboard/invoices/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Plus, Trash2 } from 'lucide-react';

type InvoiceItem = {
    description: string;
    quantity: number;
    rate: number;
};

export default function CreateInvoicePage() {
    const router = useRouter();
    const supabase = createClient();
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [items, setItems] = useState<InvoiceItem[]>([
        { description: '', quantity: 1, rate: 0 },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleAddItem = () => {
        setItems([...items, { description: '', quantity: 1, rate: 0 }]);
    };

    const handleRemoveItem = (index: number) => {
        const newItems = items.filter((_, i) => i !== index);
        setItems(newItems);
    };

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: string | number) => {
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [field]: value,
        } as InvoiceItem;
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((total, item) => total + (item.quantity * item.rate), 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            alert('You must be logged in to create an invoice.');
            setIsSubmitting(false);
            return;
        }

        const totalAmount = calculateTotal();
        const { error } = await supabase.from('invoices').insert({
            user_id: user.id,
            customer_name: customerName,
            customer_address: customerAddress,
            items: items,
            total_amount: totalAmount,
        });

        if (error) {
            alert('Error saving invoice: ' + error.message);
        } else {
            alert('Invoice created successfully!');
            router.push('/dashboard/invoices');
            router.refresh(); // Important to refresh server components
        }
        setIsSubmitting(false);
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-white">Create New Invoice</h1>
            <form onSubmit={handleSubmit} className="bg-black p-8 rounded-xl border border-white/10 space-y-8">
                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Customer Name</label>
                        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Customer Address</label>
                        <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} className="w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                </div>

                {/* Invoice Items */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">Items</h2>
                    {items.map((item, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 items-center">
                            <input type="text" placeholder="Description" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="col-span-12 md:col-span-6 w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', parseFloat(e.target.value) || 0)} className="col-span-4 md:col-span-2 w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <input type="number" placeholder="Rate" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', parseFloat(e.target.value) || 0)} className="col-span-4 md:col-span-2 w-full px-4 py-2 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <button type="button" onClick={() => handleRemoveItem(index)} className="col-span-4 md:col-span-2 text-red-500 hover:text-red-400 flex items-center justify-center gap-2">
                                <Trash2 size={18} /> Remove
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={handleAddItem} className="mt-2 text-blue-400 hover:text-blue-300 flex items-center gap-2">
                        <Plus size={18} /> Add Item
                    </button>
                </div>

                {/* Total & Submit */}
                <div className="border-t border-white/10 pt-6 flex justify-between items-center">
                    <div className="text-2xl font-bold text-white">
                        Total: <span className="text-green-400">₹{calculateTotal().toFixed(2)}</span>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed">
                        {isSubmitting ? 'Saving...' : 'Save Invoice'}
                    </button>
                </div>
            </form>
        </div>
    );
}