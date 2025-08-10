// src/app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { outfit } from './fonts'; // Import the new font

export const metadata: Metadata = {
  title: 'Krip Enterprises: Aluminum & Glass Works',
  description: 'Modern solutions in aluminum, glass, and PVC fabrication in Pilibhit.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply the font class to the body */}
      <body className={`${outfit.className} bg-gray-50 text-gray-800`}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}