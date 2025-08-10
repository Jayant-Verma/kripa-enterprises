// src/app/contact/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactPage() {

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for your message! This form is a demo.');
    };

    return (
        <div className="bg-neutral-900 text-white">
            <div className="container mx-auto px-6 py-20">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-4"
                >
                    Get In Touch
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-16"
                >
                    We&apos;re here to answer any questions. Reach out and we&apos;ll respond as soon as we can.
                </motion.p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-black p-8 rounded-xl border border-white/10"
                    >
                        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <input type="text" placeholder="Your Name" required className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            </div>
                            <div>
                                <input type="email" placeholder="Your Email" required className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" />
                            </div>
                            <div>
                                <textarea rows={5} placeholder="Your Message" required className="w-full px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"></textarea>
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300">
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Info & Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <div className="bg-black p-8 rounded-xl border border-white/10">
                            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                            <div className="space-y-5 text-lg">
                                <p className="flex items-center"><MapPin className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />Gokul Dham Colony, Pilibhit, UP</p>
                                <p className="flex items-center"><Phone className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />+91 12345 67890</p>
                                <p className="flex items-center"><Mail className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />kripaenterprises@gmail.com</p>
                            </div>
                        </div>
                        <div className="w-full h-72 rounded-xl overflow-hidden">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d218.8584570265186!2d79.81931909787866!3d28.637694021737758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a03f3621923b1f%3A0x928fa104bb49363c!2sBen-Hur%20Public%20School!5e0!3m2!1sen!2sin!4v1754824727379!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                // This filter inverts the map colors for a dark mode look
                                className="filter invert(1) hue-rotate(180deg)"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}