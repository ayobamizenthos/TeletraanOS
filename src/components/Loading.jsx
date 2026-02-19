import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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

            {/* Background Grain/Noise */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Dynamic Geometric Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            />

            {/* Cinematic Lens Flares */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-20%] w-[120%] h-[40%] bg-gradient-to-b from-white/[0.04] to-transparent skew-y-[-15deg]" />
                <div className="absolute bottom-[-10%] right-[-20%] w-[120%] h-[40%] bg-gradient-to-t from-white/[0.04] to-transparent skew-y-[-15deg]" />
            </div>

            {/* ─── CENTRAL LOGO ARCHITECTURE (THE DESIGN) ─── */}
            <div className="relative z-30 flex flex-col items-center w-full max-w-5xl">

                <div className="relative mb-40 flex items-center justify-center">

                    {/* CORE NEURAL SYNC (Behind Logo) */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {/* Primary Pulse Ring */}
                        <motion.div
                            animate={{
                                scale: [1, 1.25, 1],
                                opacity: [0.1, 0.3, 0.1]
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[100px]"
                        />

                        {/* Progressive Energy Core */}
                        <motion.div
                            style={{
                                scale: 0.5 + (progress / 100) * 0.5,
                                opacity: 0.05 + (progress / 100) * 0.1
                            }}
                            className="absolute w-[600px] h-[600px] bg-white rounded-full blur-[150px]"
                        />

                        {/* Rotating Data Lattice (Outer) */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 40 - (progress / 100) * 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[750px] h-[750px] opacity-[0.06]"
                        >
                            <div className="w-full h-full rounded-full border border-dashed border-white/30" />
                        </motion.div>

                        {/* Shimmering Halo */}
                        <motion.div
                            animate={{
                                rotate: -360,
                                scale: [1, 1.05, 1]
                            }}
                            transition={{
                                rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                                scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                            }}
                            className="absolute w-[550px] h-[550px] opacity-[0.04]"
                        >
                            <div className="w-full h-full rounded-full border-[3px] border-white/20" />
                        </motion.div>
                    </div>

                    {/* NEXUS LOGO ANIMATION */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                            opacity: [0.9, 1, 0.9],
                            scale: [1, 1.02, 1],
                            filter: [`brightness(1) blur(0px)`, `brightness(1.15) blur(0px)`, `brightness(1) blur(1px)`]
                        }}
                        transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="relative z-10 flex items-center justify-center"
                    >
                        {/* THE LOGO */}
                        <img
                            src={teletraanLogo}
                            className="w-[500px] h-auto relative z-20 drop-shadow-[0_0_100px_rgba(255,255,255,0.2)]"
                            alt="Teletraan"
                        />

                        {/* REACTIVE BLOOM EFFECT */}
                        <motion.div
                            animate={{
                                scale: [1, 1.5],
                                opacity: [0.2, 0]
                            }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                            className="absolute w-[350px] h-[350px] border border-white/30 rounded-full"
                        />
                    </motion.div>

                    {/* OPTICAL BRACKETS */}
                    <div className="absolute inset-[-120px] pointer-events-none opacity-20">
                        <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-white/30" />
                        <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-white/30" />
                        <div className="absolute bottom-0 left-0 w-16 h-16 border-b border-l border-white/30" />
                        <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-white/30" />
                    </div>
                </div>

                {/* ─── MINIMALIST LOADING INTERFACE ─── */}
                <div className="w-full max-w-sm flex flex-col items-center">

                    {/* BORDERLESS LOADING BAR ASSEMBLY */}
                    <div className="relative w-full flex items-center mb-10">
                        {/* The Loading Line */}
                        <div className="relative w-full h-[4px] bg-white/[0.05] rounded-full">
                            {/* Static Track Glow */}
                            <div className="absolute inset-0 bg-white/[0.02] blur-[1px]" />

                            {/* Progress Fill */}
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-white shadow-[0_0_40px_rgba(255,255,255,0.8)]"
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        {/* THE CAMERA ICON (EDGE-MOUNTED) */}
                        <div className="absolute inset-0 pointer-events-none">
                            <motion.div
                                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                                style={{ left: `${progress}%` }}
                            >
                                <img
                                    src={dmIcon}
                                    className="w-9 h-9 text-white drop-shadow-[0_0_30px_white] filter brightness-[3]"
                                    alt="Link"
                                />
                                {/* Progressive Pulse Efficiency */}
                                <motion.div
                                    animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full border-2 border-white/50"
                                />
                            </motion.div>
                        </div>
                    </div>

                    {/* DYNAMIC STATUS TEXTS */}
                    <div className="h-8 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={progress < 33 ? 'm1' : progress < 66 ? 'm2' : 'm3'}
                                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="text-[12px] font-mono text-white tracking-[0.4em] uppercase whitespace-nowrap"
                            >
                                {progress < 33 ? 'Smart Monitoring' : progress < 66 ? 'Uncompromised Security' : 'Seamless Integration'}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                </div>
            </div>

            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.95)_100%)] pointer-events-none z-50" />
        </div>
    )
}

export default Loading
