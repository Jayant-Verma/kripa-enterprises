// src/app/dashboard/invoices/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import InvoiceTemplate from '@/app/components/InvoiceTemplate';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

// Define the type for a single invoice
type Invoice = {
    id: string;
    customer_name: string;
    customer_address: string | null;
    invoice_date: string;
    items: { description: string; quantity: number; rate: number }[];
    total_amount: number;
};

export default function SingleInvoicePage({ params }: { params: { id: string } }) {
    const [invoice, setInvoice] = useState<Invoice | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchInvoice = async () => {
            const { data, error } = await supabase
                .from('invoices')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error("Error fetching invoice:", error);
                setInvoice(null);
            } else {
                setInvoice(data);
            }
            setLoading(false);
        };

        fetchInvoice();
    }, [params.id, supabase]);

    const handleDownloadPdf = () => {
        const input = document.getElementById('invoice-to-print');
        if (!input) {
            console.error("Invoice element not found!");
            return;
        }

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`invoice-${invoice?.id.substring(0, 8)}.pdf`);
        });
    };

    if (loading) return <p className="text-white">Loading invoice...</p>;
    if (!invoice) return <p className="text-red-500">Invoice not found.</p>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-white">Invoice Details</h1>
                <button
                    onClick={handleDownloadPdf}
                    className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                    <Download size={18} />
                    Download PDF
                </button>
            </div>

            {/* Render the printable template */}
            <div className="rounded-lg overflow-hidden">
                <InvoiceTemplate invoice={invoice} />
            </div>
        </div>
    );
}