// src/app/services/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Shrub, DoorOpen, Wind, Layers3 } from 'lucide-react';

const services = [
    {
        icon: <Wind className="w-10 h-10 text-blue-400" />,
        title: 'Aluminum Windows & Doors',
        description: 'We design and install a wide range of high-performance aluminum products, including sliding windows, casement doors, and fixed frames, known for their strength and sleek profiles.'
    },
    {
        icon: <Layers3 className="w-10 h-10 text-cyan-400" />,
        title: 'Toughened Glass Work',
        description: 'From elegant office partitions and staircase railings to durable shower enclosures and facades, our toughened glass solutions offer safety without compromising on style.'
    },
    {
        icon: <DoorOpen className="w-10 h-10 text-emerald-400" />,
        title: 'PVC & UPVC Solutions',
        description: 'Discover our waterproof and termite-proof PVC doors, kitchen cabinets, and wall paneling. Our UPVC systems provide excellent thermal and sound insulation for a peaceful home.'
    },
    {
        icon: <Shrub className="w-10 h-10 text-amber-400" />,
        title: 'Custom Fabrication',
        description: 'Have a unique design in mind? We offer bespoke fabrication services to bring your custom ideas for both residential and commercial projects to life with precision engineering.'
    },
]

export default function ServicesPage() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    return (
        <div className="bg-black text-white">
            {/* Page Header */}
            <div className="pt-16 pb-12 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-5xl font-bold"
                >
                    Our Craft & Expertise
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto px-4"
                >
                    We deliver a comprehensive range of services built on quality, durability, and modern design.
                </motion.p>
            </div>

            {/* Services Grid */}
            <div className="py-20 bg-neutral-900">
                <motion.div
                    className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="bg-neutral-800/50 p-8 rounded-xl border border-white/10 group hover:border-blue-500/50 transition-colors duration-300"
                            variants={itemVariants}
                        >
                            <div className="mb-5">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-100">{service.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{service.description}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}