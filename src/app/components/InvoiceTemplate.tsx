// src/app/components/InvoiceTemplate.tsx

// Define types for clarity
type InvoiceItem = {
    description: string;
    quantity: number;
    rate: number;
};

type Invoice = {
    id: string;
    customer_name: string;
    customer_address: string | null;
    invoice_date: string;
    items: InvoiceItem[];
    total_amount: number;
};

// The component itself
export default function InvoiceTemplate({ invoice }: { invoice: Invoice }) {
    return (
        // We give it a fixed ID to easily grab it from the DOM
        <div id="invoice-to-print" className="bg-white p-12 text-black font-sans">
            <div className="flex justify-between items-start mb-12 border-b-2 border-gray-200 pb-6">
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">INVOICE</h1>
                    <p className="text-gray-500">Invoice #: {invoice.id.substring(0, 8)}</p>
                    <p className="text-gray-500">Date: {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                    <h2 className="text-2xl font-semibold text-gray-700">Kripa Enterprises</h2>
                    <p className="text-gray-500">Gokul Dham Colony, Pilibhit, UP</p>
                    <p className="text-gray-500">sachinrathore@gmail.com</p>
                </div>
            </div>

            <div className="mb-10">
                <h3 className="font-semibold text-gray-500 mb-1">Bill To:</h3>
                <p className="font-bold text-gray-800 text-lg">{invoice.customer_name}</p>
                <p className="text-gray-600">{invoice.customer_address}</p>
            </div>

            <table className="w-full mb-10">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left p-3 font-semibold text-gray-600">Description</th>
                        <th className="text-center p-3 font-semibold text-gray-600">Quantity</th>
                        <th className="text-right p-3 font-semibold text-gray-600">Rate</th>
                        <th className="text-right p-3 font-semibold text-gray-600">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {invoice.items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-200">
                            <td className="p-3">{item.description}</td>
                            <td className="text-center p-3">{item.quantity}</td>
                            <td className="text-right p-3">₹{item.rate.toFixed(2)}</td>
                            <td className="text-right p-3 font-medium">₹{(item.quantity * item.rate).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-end">
                <div className="w-1/3">
                    <div className="flex justify-between text-lg text-gray-700 border-t pt-2">
                        <span>Total</span>
                        <span className="font-bold">₹{invoice.total_amount.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}