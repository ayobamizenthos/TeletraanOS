import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Zap, Server, LayoutDashboard } from 'lucide-react'
import teletraanLogo from '../assets/teletraan.svg'

const Loading = () => {

    const [progress, setProgress] = useState(0)
    const [phaseIndex, setPhaseIndex] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    // Tactical / Professional Phrasing - User Provided
    const phases = [
        { text: "MAXIMUM PROTECTION" },
        { text: "ACCESS CONTROL" },
        { text: "AI-POWERED SURVEILLANCE" },
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
                {/* LOGO: Breathing Animation via Morph */}
                <div className="relative mb-16 flex justify-center items-center">
                    <div className="absolute -inset-20 bg-white/5 filter blur-[50px] rounded-full animate-pulse px-4" />
                    <motion.img
                        layoutId="teletraan-hero-logo"
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        src={teletraanLogo}
                        alt="Teletraan"
                        className="w-[380px] md:w-[480px] relative z-20 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    />
                </div>


                {/* LOADING BAR: HEAVY DUTY TACTICAL */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                    className="w-full max-w-[800px] flex flex-col gap-4 relative z-30"
                >

                    {/* Status Text - BIG & BOLD */}
                    <div className="flex justify-between items-end px-2 mb-2">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={phaseIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="font-mono text-[16px] md:text-[20px] font-bold tracking-[0.15em] text-white uppercase"
                            >
                                {phases[phaseIndex]?.text || "SYSTEM INITIALIZED"}
                            </motion.span>
                        </AnimatePresence>
                        <span className="font-mono text-[24px] font-bold tracking-widest">{Math.round(progress)}%</span>
                    </div>

                    {/* Heavy Bar Container */}
                    <div className="relative h-[24px] w-full bg-[#0A0A0A] border-2 border-white/30 flex items-center p-[2px]">

                        {/* The Fill - Solid Block */}
                        <motion.div
                            className="h-full bg-white relative"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        >
                            {/* Leading Edge Glare */}
                            <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-black" />
                        </motion.div>

                        {/* Tactical Markers on Top/Bottom */}
                        <div className="absolute top-[-6px] left-0 w-2 h-[2px] bg-white" />
                        <div className="absolute top-[-6px] right-0 w-2 h-[2px] bg-white" />
                        <div className="absolute bottom-[-6px] left-0 w-2 h-[2px] bg-white" />
                        <div className="absolute bottom-[-6px] right-0 w-2 h-[2px] bg-white" />

                        {/* Center Marker */}
                        <div className="absolute top-[-4px] left-1/2 w-[2px] h-[4px] bg-white/50" />
                        <div className="absolute bottom-[-4px] left-1/2 w-[2px] h-[4px] bg-white/50" />
                    </div>

                </motion.div>

                {/* VERSION BADGE - V1.1.0 CONFIRMATION */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="mt-12 flex flex-col items-center gap-2"
                >
                    <div className="px-3 py-1 bg-white border border-white text-black text-[10px] font-black tracking-[0.3em] uppercase rounded-[2px] shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                        V1.1.0 PRO
                    </div>
                </motion.div>

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
