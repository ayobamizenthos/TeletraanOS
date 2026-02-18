import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import teletraanLogo from '../assets/teletraan.svg'
import dmIcon from '../assets/dm.svg'

const Loading = () => {
    const [progress, setProgress] = useState(0)

    const phrases = [
        "Smart Monitoring",
        "Uncompromised Security",
        "Seamless Integration"
    ]

    const currentPhrase = progress < 33 ? phrases[0] : progress < 66 ? phrases[1] : phrases[2]

    useEffect(() => {
        const startTime = Date.now()
        const duration = 8000

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime
            const nextProgress = Math.min((elapsedTime / duration) * 100, 100)
            setProgress(nextProgress)

            if (nextProgress >= 100) {
                clearInterval(interval)
            }
        }, 30)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 bg-[#030303] flex flex-col items-center justify-center z-[200] overflow-hidden">

            {/* ─── PREMIUM BACKGROUND ARCHITECTURE ─── */}
            <div className="absolute inset-0 bg-[#050505]" />

            {/* Subtle Gradient Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.01] rounded-full blur-[120px]" />
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px]" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '120px 120px'
                }}
            />

            {/* ─── CENTRAL LOGO ASSEMBLY ─── */}
            <div className="relative z-30 flex flex-col items-center w-full max-w-4xl">

                <div className="relative mb-32 group">
                    {/* HOLOGRAPHIC ROTATING RINGS BEHIND LOGO */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[580px] h-[580px] opacity-20"
                    >
                        <div className="w-full h-full rounded-full border border-dashed border-white/20" />
                    </motion.div>

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] opacity-10"
                    >
                        <div className="w-full h-full rounded-full border border-white/10" />
                    </motion.div>

                    {/* Core Logo Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                            opacity: [0.8, 1, 0.8],
                            scale: [1, 1.01, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative z-10"
                    >
                        {/* High-Intensity Glow */}
                        <div className="absolute -inset-20 bg-white/[0.03] blur-[80px] rounded-full" />
                        <img src={teletraanLogo} className="w-[520px] h-auto relative z-20" alt="Teletraan" />
                    </motion.div>
                </div>

                {/* ─── LOADING INTERFACE ─── */}
                <div className="w-full max-w-xl flex flex-col items-center gap-12">

                    {/* TACTICAL PHRASES */}
                    <div className="h-6 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentPhrase}
                                initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
                                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                                className="text-[16px] font-mono font-bold tracking-[0.4em] text-white/80 uppercase"
                            >
                                {currentPhrase}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* PROFESSIONAL BORDERLESS LOADING BAR ASSEMBLY */}
                    <div className="relative w-full max-w-sm flex items-center">
                        {/* The Loading Line / Track */}
                        <div className="relative w-full h-[4px] bg-white/[0.08] rounded-full overflow-hidden">
                            {/* High-Speed Scanline Track */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />

                            {/* Progress Fill (Premium Glow) */}
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.6)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* THE CAMERA ICON - Pinned exactly to the leading edge of the line */}
                        <div className="absolute inset-0 pointer-events-none">
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                                style={{ left: `${progress}%` }}
                            >
                                <img
                                    src={dmIcon}
                                    className="w-8 h-8 text-white drop-shadow-[0_0_20px_rgba(255,255,255,1)] filter brightness-[2.5]"
                                    alt="Uplink"
                                />
                                {/* Sub-atomic pulse */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/20 animate-ping opacity-10" />
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>

            {/* VIGNETTE OVERLAY */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-40" />
        </div>
    )
}

export default Loading
