import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Zap, Server, LayoutDashboard } from 'lucide-react'
import teletraanLogo from '../assets/teletraan.svg'

const Loading = () => {

    const [progress, setProgress] = useState(0)
    const [phaseIndex, setPhaseIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    // "Silicon Valley" style phrasing: Professional, clear, sophisticated, human-centric not robotic
    const phases = [
        { text: "Establishing Secure Connection", icon: ShieldCheck },
        { text: "Verifying User Credentials", icon: Zap },
        { text: "Synchronizing Data Feeds", icon: Server },
        { text: "Preparing Your Command Center", icon: LayoutDashboard },
    ]

    useEffect(() => {
        // Phase Cycling (slower, more deliberate)
        const phaseInterval = setInterval(() => {
            setPhaseIndex(prev => {
                if (prev >= phases.length - 1) {
                    clearInterval(phaseInterval)
                    return phases.length - 1
                }
                return prev + 1
            })
        }, 1100)

        // Progress Logic (Smooth acceleration curve)
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsComplete(true)
                    return 100
                }
                // Ease-out simulation
                const remaining = 100 - prev
                const increment = Math.max(0.4, remaining * 0.05)
                const noise = Math.random() * 0.3
                return Math.min(prev + increment + noise, 100)
            })
        }, 55)

        return () => {
            clearInterval(interval)
            clearInterval(phaseInterval)
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50 overflow-hidden font-sans text-white">

            {/* 1. ATMOSPHERIC BACKGROUND LAYERS */}

            {/* Deep Radial Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1a1a1a_0%,#000000_70%)] opacity-80 pointer-events-none" />

            {/* Subtle Animated Mesh/Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Cinematic Noise */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }}
            />

            {/* 2. MAIN CENTERAL CONTENT */}
            <div className="relative z-10 flex flex-col items-center w-full max-w-[500px] px-6">

                {/* LOGO: Breathing Animation */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative mb-16"
                >
                    <div className="absolute -inset-20 bg-white/5 filter blur-[50px] rounded-full animate-pulse px-4" />
                    <img
                        src={teletraanLogo}
                        alt="Teletraan OS"
                        className="w-[280px] md:w-[320px] relative z-20 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    />
                </motion.div>


                {/* LOADING BAR: High-End "Capsule" Design */}
                <div className="w-full flex flex-col gap-6">

                    {/* Top Row: Phase Text & Percentage (High Contrast) */}
                    <div className="flex justify-between items-end px-1">
                        <div className="flex flex-col h-8 justify-end overflow-hidden">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={phaseIndex}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -15 }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                    className="flex items-center gap-3"
                                >
                                    {/* Icon for Phase */}
                                    <div className="text-white/80">
                                        {React.createElement(phases[phaseIndex].icon, { size: 16, strokeWidth: 2 })}
                                    </div>
                                    <span className="text-[15px] md:text-[16px] font-medium tracking-wide text-white drop-shadow-md">
                                        {phases[phaseIndex].text}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <span className="text-[16px] font-bold text-white tracking-widest tabular-nums font-mono opacity-90">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    {/* THE BAR ITSELF */}
                    <div className="relative h-[10px] w-full bg-[#111] rounded-full p-[2px] shadow-[0_4px_20px_rgba(0,0,0,0.8)] border border-white/10 overflow-hidden">
                        {/* Inner Gradient Track */}
                        <motion.div
                            className="h-full rounded-full relative overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.05 }}
                            style={{
                                background: 'linear-gradient(90deg, #444 0%, #AAA 50%, #FFFFFF 100%)', // Silver/Titanium Gradient
                                boxShadow: '0 0 20px rgba(255, 255, 255, 0.4)'
                            }}
                        >
                            {/* Moving Shine Effect on Bar */}
                            <div className="absolute top-0 right-0 bottom-0 w-[40px] bg-gradient-to-r from-transparent via-white to-transparent opacity-50 skew-x-[-20deg]" />
                        </motion.div>
                    </div>

                    {/* Completion Flash */}
                    <AnimatePresence>
                        {isComplete && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute -bottom-12 left-0 right-0 flex justify-center"
                            >
                                <span className="text-[12px] font-bold tracking-[0.3em] text-[#00FF41] uppercase glow-text">
                                    System Ready
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>

            </div>

            {/* DECORATIVE ELEMENTS (Clean, minimal, high-tech) */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center opacity-30">
                <div className="flex gap-2">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
                            className="w-1.5 h-1.5 rounded-full bg-white"
                        />
                    ))}
                </div>
            </div>

            <style>{`
                .glow-text {
                    text-shadow: 0 0 15px rgba(0, 255, 65, 0.8);
                }
            `}</style>
        </div>
    )
}

export default Loading
