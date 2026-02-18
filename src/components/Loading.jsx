import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import teletraanLogo from '../assets/teletraan.svg'
import dmIcon from '../assets/dm.svg'

const Loading = ({ onComplete }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const startTime = Date.now()
        const duration = 8000

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime
            const nextProgress = Math.min((elapsedTime / duration) * 100, 100)
            setProgress(nextProgress)

            if (nextProgress >= 100) {
                clearInterval(interval)
                setTimeout(() => {
                    onComplete?.();
                }, 500);
            }
        }, 30)

        return () => clearInterval(interval)
    }, [onComplete])

    return (
        <div className="fixed inset-0 bg-[#020202] flex flex-col items-center justify-center z-[200] overflow-hidden">

            {/* ─── TACTICAL ATMOSPHERE ─── */}
            <div className="absolute inset-0 bg-[#050505]" />

            {/* Dynamic Geometric Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Cinematic Lens Flares */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[40%] bg-gradient-to-b from-white/[0.03] to-transparent skew-y-[-15deg]" />
                <div className="absolute bottom-[-10%] right-[-20%] w-[120%] h-[40%] bg-gradient-to-t from-white/[0.03] to-transparent skew-y-[-15deg]" />
            </div>

            {/* ─── CENTRAL LOGO ARCHITECTURE (THE DESIGN) ─── */}
            <div className="relative z-30 flex flex-col items-center w-full max-w-5xl">

                <div className="relative mb-40 flex items-center justify-center">

                    {/* HOLOGRAPHIC COMPASS RINGS (TRIPLE LAYER) */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[680px] h-[680px] opacity-[0.07]"
                    >
                        <div className="w-full h-full rounded-full border border-dashed border-white/40" />
                        {/* Orbiting Tech Nodes */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 border border-white/50 rounded-sm bg-black" />
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 border border-white/50 rounded-sm bg-black" />
                    </motion.div>

                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[580px] h-[580px] opacity-[0.05]"
                    >
                        <div className="w-full h-full rounded-full border-[2px] border-white/20" />
                        {/* Dynamic Scale Markers */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-8 h-[2px] bg-white/40" />
                        <div className="absolute top-1/2 -translate-y-1/2 right-0 w-8 h-[2px] bg-white/40" />
                    </motion.div>

                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute w-[480px] h-[480px] opacity-[0.03]"
                    >
                        <div className="w-full h-full rounded-full border border-white/10" style={{ borderStyle: 'dotted' }} />
                    </motion.div>

                    {/* NEXUS LOGO ANIMATION */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                            opacity: [0.7, 1, 0.7],
                            scale: [1, 1.02, 1]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative z-10 flex items-center justify-center"
                    >
                        {/* Core Aura */}
                        <div className="absolute -inset-40 bg-white/[0.02] blur-[120px] rounded-full" />

                        {/* THE LOGO */}
                        <img src={teletraanLogo} className="w-[500px] h-auto relative z-20 drop-shadow-[0_0_80px_rgba(255,255,255,0.15)] filter brightness-110" alt="Teletraan" />

                        {/* HORIZONTAL SCANLINE (LASER) */}
                        <motion.div
                            animate={{ top: ['-20%', '120%'], opacity: [0, 1, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-0 right-0 h-[3px] bg-white shadow-[0_0_20px_white] z-30 blur-[1px]"
                        />

                        {/* DATA BURST RINGS (REACTIVE) */}
                        <motion.div
                            animate={{ scale: [1, 1.4], opacity: [0.3, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
                            className="absolute w-[300px] h-[300px] border border-white/20 rounded-full"
                        />
                    </motion.div>

                    {/* FLOATING HUD BRACKETS */}
                    <div className="absolute inset-[-100px] pointer-events-none opacity-30">
                        <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-white/20" />
                        <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-white/20" />
                        <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-white/20" />
                        <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-white/20" />
                    </div>
                </div>

                {/* ─── MINIMALIST LOADING INTERFACE (NO TEXTS) ─── */}
                <div className="w-full max-w-sm flex flex-col items-center">

                    {/* BORDERLESS LOADING BAR ASSEMBLY */}
                    <div className="relative w-full flex items-center">
                        {/* The Loading Line */}
                        <div className="relative w-full h-[4px] bg-white/[0.05] rounded-full overflow-hidden">
                            {/* Glow Track */}
                            <div className="absolute inset-0 bg-white/[0.02]" />

                            {/* Progress Fill */}
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_40px_white]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* THE CAMERA ICON (EDGE-MOUNTED REFINED) */}
                        <div className="absolute inset-0 pointer-events-none">
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                                style={{ left: `${progress}%` }}
                            >
                                <img
                                    src={dmIcon}
                                    className="w-9 h-9 text-white drop-shadow-[0_0_25px_white] filter brightness-[3]"
                                    alt="Link"
                                />
                                {/* High-Frequency Ping */}
                                <motion.div
                                    animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/40"
                                />
                            </motion.div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] pointer-events-none z-50" />
        </div>
    )
}

export default Loading
