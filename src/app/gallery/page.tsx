// src/app/gallery/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Sample project data remains the same
const projects = [
    { id: 1, category: 'Aluminum', src: '/gallery/hero.png', alt: 'Modern Aluminum Window' },
    { id: 2, category: 'Glass', src: '/gallery/hero.png', alt: 'Toughened Glass Railing' },
    { id: 3, category: 'PVC', src: '/gallery/hero.png', alt: 'Waterproof PVC Door' },
    { id: 4, category: 'Aluminum', src: '/gallery/hero.png', alt: 'Sleek Aluminum Door' },
    { id: 5, category: 'Glass', src: '/gallery/hero.png', alt: 'Office Glass Partition' },
    { id: 6, category: 'PVC', src: '/gallery/hero.png', alt: 'Modern PVC Kitchen Cabinet' },
];

const filters = ['All', 'Aluminum', 'Glass', 'PVC'];

export default function GalleryPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);

    const filteredProjects = activeFilter === 'All'
        ? projects
        : projects.filter(p => p.category === activeFilter);

    const openLightbox = (index: number) => {
        setImageIndex(index);
        setLightboxOpen(true);
    };

    return (
        <div className="bg-black text-white min-h-screen py-16">
            <div className="container mx-auto px-6">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-6"
                >
                    Our Portfolio
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-lg text-gray-400 text-center max-w-2xl mx-auto mb-12"
                >
                    A showcase of our commitment to quality, precision, and customer satisfaction.
                </motion.p>

                {/* Updated Filter Buttons for Dark Mode */}
                <div className="flex justify-center flex-wrap gap-4 mb-12">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2 text-base font-semibold rounded-full transition-all duration-300 ${activeFilter === filter
                                    ? 'bg-blue-600 text-white shadow-lg'
                                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                {/* Image Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            className="relative w-full h-72 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500/50 transition-colors duration-300 group"
                            onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={project.src}
                                alt={project.alt}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover' }}
                                className="group-hover:scale-110 transition-transform duration-500 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 flex items-end p-4 cursor-pointer">
                                <h3 className="text-white text-lg font-bold">{project.alt}</h3>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <Lightbox
                    open={lightboxOpen}
                    close={() => setLightboxOpen(false)}
                    slides={filteredProjects.map(p => ({ src: p.src, alt: p.alt }))}
                    index={imageIndex}
                />
            </div>
        </div>
    );
}