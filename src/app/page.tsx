// src/app/page.tsx
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, Shield, Wind, Layers3, DoorOpen, HardHat, Ruler, Wrench } from 'lucide-react';

// Reusable Glow Card Component
const GlowCard = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={`relative bg-slate-900 rounded-xl p-6 overflow-hidden ${className}`}>
      <div className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <div className="relative z-10 bg-slate-900 rounded-lg h-full p-6">
        {children}
      </div>
    </div>
  );
};


export default function PremiumHomePage() {

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" as const } },
  };

  const processSteps = [
    { icon: <Ruler className="w-8 h-8" />, title: "Consult & Design", description: "We start by understanding your vision and crafting a detailed plan." },
    { icon: <Wrench className="w-8 h-8" />, title: "Fabrication", description: "Our experts use precision tools to build your components to exact specs." },
    { icon: <HardHat className="w-8 h-8" />, title: "Installation", description: "Our professional team ensures a seamless and secure installation on-site." },
    { icon: <CheckCircle className="w-8 h-8" />, title: "Quality Check", description: "We conduct a final review to guarantee perfection and your satisfaction." },
  ];

  return (
    <div className="overflow-x-hidden bg-black text-white">
      {/* 1. Hero Section (Unchanged, but now on a black background) */}
      <section className="relative h-[80vh] flex items-center justify-center text-center">
        <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url('/hero.png')` }}>
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 p-4"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            Engineering Elegance
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience the pinnacle of craftsmanship in aluminum, glass, and PVC solutions.
          </p>
          <Link href="/contact" className="bg-blue-600 text-white font-bold py-3 px-10 rounded-lg text-lg hover:bg-blue-700 transition-transform duration-300 transform hover:scale-105">
            Get a Quote
          </Link>
        </motion.div>
      </section>

      {/* 2. Bento Grid for Services */}
      <motion.section
        className="py-24"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">Our Core Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Large Card (Aluminum) using GlowCard */}
            <div className="md:col-span-2">
              <GlowCard>
                <div className="absolute top-0 right-0 -m-4 opacity-50">
                  <Wind size={128} className="text-blue-400/70" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Aluminum Fabrication</h3>
                <p className="text-gray-300 max-w-md">Sleek, strong, and durable solutions for windows, doors, and modern facades.</p>
              </GlowCard>
            </div>

            {/* Small Card (Glass) using GlowCard */}
            <div>
              <GlowCard>
                <div className="absolute top-0 right-0 -m-2 opacity-50">
                  <Layers3 size={80} className="text-cyan-400/70" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Toughened Glass</h3>
                <p className="text-gray-300">Crystal clear safety for railings, partitions, and showers.</p>
              </GlowCard>
            </div>

            {/* Small Card (PVC) using GlowCard */}
            <div>
              <GlowCard>
                <div className="absolute top-0 right-0 -m-2 opacity-50">
                  <DoorOpen size={80} className="text-emerald-400/70" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">PVC Solutions</h3>
                <p className="text-gray-300">Waterproof and elegant options for doors and interiors.</p>
              </GlowCard>
            </div>

            {/* Large Card (Why Us) using GlowCard */}
            <div className="md:col-span-2">
              <GlowCard>
                <div className="absolute top-0 right-0 -m-4 opacity-50">
                  <Shield size={128} className="text-amber-400/70" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">Unmatched Quality & Trust</h3>
                <p className="text-gray-300 max-w-md">With over 15 years of experience in Agra, we guarantee precision, durability, and customer satisfaction on every project.</p>
              </GlowCard>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. Our Process Section */}
      <motion.section
        className="py-24 bg-neutral-900"
        initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={sectionVariants}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Our Four-Step Process</h2>
          <div className="relative">
            {/* The line connecting the dots */}
            <div className="absolute left-1/2 -translate-x-1/2 top-5 h-[2px] w-[calc(100%-10rem)] bg-blue-500/30 hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center p-4">
                  <div className="relative z-10 bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center border-4 border-neutral-900">
                    {step.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials and CTA sections can remain here */}
    </div>
  );
}