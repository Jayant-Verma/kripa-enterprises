// app/components/Footer.tsx
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-6 text-center">
                <p>&copy; {new Date().getFullYear()} Kripa Enterprises. All Rights Reserved.</p>
                <p className="mt-2 text-sm text-gray-400">Serving Pilibhit, Uttar Pradesh</p>
            </div>
        </footer>
    );
};

export default Footer;