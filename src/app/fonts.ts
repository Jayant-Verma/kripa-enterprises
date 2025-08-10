// src/app/fonts.ts
import { Outfit } from 'next/font/google';

export const outfit = Outfit({
    subsets: ['latin'],
    weight: ['300', '400', '500', '700'],
    display: 'swap',
});