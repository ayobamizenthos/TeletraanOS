import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import teletraanLogo from '../assets/teletraan.svg'
import dmIcon from '../assets/dm.svg'

const Loading = () => {
    const [progress, setProgress] = useState(0)

    // Phrases requested by the user
    const phrases = [
        "Smart Monitoring",
        "Uncompromised Security",
        "Seamless Integration"
    ]

    // Determine current phrase based on progress
    const currentPhrase = progress < 33 ? phrases[0] : progress < 66 ? phrases[1] : phrases[2]

    useEffect(() => {
        // Linear progress to take exactly 8 seconds (8000ms)
        const startTime = Date.now()
        const duration = 8000

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime
            const nextProgress = Math.min((elapsedTime / duration) * 100, 100)
            setProgress(nextProgress)

            if (nextProgress >= 100) {
                clearInterval(interval)
            }
        }, 30) // Smooth 33fps update

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="fixed inset-0 bg-[#020202] flex flex-col items-center justify-center z-[200] overflow-hidden font-sans text-white">
            {/* CLEAN BACKGROUND */}
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '80px 80px'
                }}
            />

            {/* VIGNETTE */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)] z-10" />

            {/* MAIN CONTENT AREA */}
            <div className="relative z-30 flex flex-col items-center w-full max-w-3xl px-12">

                {/* ANIMATING LOGO */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.02, 1]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="relative mb-24"
                >
                    {/* Soft Glow */}
                    <div className="absolute -inset-20 bg-white/[0.02] blur-[100px] rounded-full" />
                    <img src={teletraanLogo} className="w-[500px] relative z-20 drop-shadow-[0_0_50px_rgba(255,255,255,0.15)]" alt="Teletraan" />
                </motion.div>

                {/* PROGRESS BAR & PHRASES */}
                <div className="w-full flex flex-col items-center gap-10">

                    {/* PHRASE DISPLAY */}
                    <div className="h-8 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={currentPhrase}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                className="text-[14px] font-mono font-black tracking-[0.4em] text-white/70 uppercase"
                            >
                                {currentPhrase}
                            </motion.span>
                        </AnimatePresence>
                    </div>

                    {/* LOADING BAR DESIGN */}
                    <div className="relative w-full h-[2px] bg-white/10 rounded-full">
                        {/* Progress Fill */}
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                            style={{ width: `${progress}%` }}
                        />

                        {/* CAMERA ICON ON THE EDGE */}
                        <motion.div
                            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                            style={{ left: `${progress}%` }}
                        >
                            <div className="relative p-3 bg-[#050505] border border-white/20 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                <img src={dmIcon} className="w-5 h-5 opacity-80" alt="Node" />
                                {/* Pulsing Ring Around Icon */}
                                <div className="absolute inset-0 border border-white/40 rounded-full animate-ping opacity-20" />
                            </div>
                        </motion.div>
                    </div>

                    {/* PERCENTAGE */}
                    <div className="mt-4">
                        <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/30 uppercase">
                            SYSTEM_LOAD: {Math.round(progress)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading
