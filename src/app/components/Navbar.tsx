// src/app/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    // ... (navLinks array remains the same)
    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/services', label: 'Services' },
        { href: '/gallery', label: 'Gallery' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        // UPDATED: Added bg-white/70 for semi-transparency and backdrop-blur-lg for the glass effect
        <header className="bg-white/70 shadow-md sticky top-0 z-50 backdrop-blur-lg">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gray-800">
                    Kripa Enterprises
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} className="text-gray-700 font-semibold hover:text-blue-600 transition-colors">
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Hamburger Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/90 backdrop-blur-lg pb-4">
                    <ul className="flex flex-col items-center space-y-4">
                        {navLinks.map(link => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className="text-lg text-gray-800 font-medium hover:text-blue-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </header>
    );
};

export default Navbar;