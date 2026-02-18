import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, Zap, Server, LayoutDashboard, Cpu, Database, Network, Binary } from 'lucide-react'
import teletraanLogo from '../assets/teletraan.svg'

const Loading = () => {
    const [progress, setProgress] = useState(0)
    const [phaseIndex, setPhaseIndex] = useState(0)
    const [telemetry, setTelemetry] = useState({
        packets: 0,
        voltage: 12.4,
        load: 12
    })

    const phases = [
        { text: "INITIALIZING NEURAL CORE", sub: "Establishing secure uplink..." },
        { text: "DECRYPTING SYSTEM ASSETS", sub: "Unlimited Updates sequence active" },
        { text: "CALIBRATING TACTICAL ARRAY", sub: "Synchronizing global mesh" },
        { text: "AUTHORIZING SYSTEM ACCESS", sub: "Handshake verified" }
    ]

    useEffect(() => {
        const phaseInterval = setInterval(() => {
            setPhaseIndex(prev => (prev < phases.length - 1 ? prev + 1 : prev))
        }, 1500)

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100
                const increment = Math.random() * 1.5
                return Math.min(prev + increment, 100)
            })

            // Random telemetry noise
            setTelemetry({
                packets: Math.floor(Math.random() * 10000),
                voltage: (12.2 + Math.random() * 0.4).toFixed(1),
                load: Math.floor(20 + Math.random() * 40)
            })
        }, 50)

        return () => {
            clearInterval(phaseInterval)
            clearInterval(progressInterval)
        }
    }, [])

    return (
        <div className="fixed inset-0 bg-[#020202] flex flex-col items-center justify-center z-[200] overflow-hidden font-sans text-white">
            {/* BACKGROUND EFFECTS */}
            <div className="absolute inset-0 bg-[#050505]" />
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* VIGNETTE & SCANLINES */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-10" />
            <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

            {/* MAIN CONTENT AREA */}
            <div className="relative z-30 flex flex-col items-center w-full max-w-4xl px-12">

                {/* LOGO SECTION */}
                <div className="relative mb-24 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        {/* Glow Behind Logo */}
                        <div className="absolute -inset-24 bg-white/[0.03] blur-[80px] rounded-full animate-pulse" />

                        <img src={teletraanLogo} className="w-[420px] relative z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" alt="Teletraan" />

                        {/* Scanning Bar over Logo */}
                        <motion.div
                            animate={{ top: ['-10%', '110%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute left-0 right-0 h-[2px] bg-white/20 blur-[1px] z-20"
                        />
                    </motion.div>
                </div>

                {/* TELEMETRY READOUTS (SIDE) */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-40">
                    <div className="flex flex-col gap-1 items-start">
                        <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Voltage</span>
                        <span className="text-xl font-mono text-white/80">{telemetry.voltage}V</span>
                    </div>
                    <div className="flex flex-col gap-1 items-start">
                        <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Core Load</span>
                        <span className="text-xl font-mono text-white/80">{telemetry.load}%</span>
                    </div>
                </div>

                <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-8 opacity-40 text-right">
                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Packet Stream</span>
                        <span className="text-xl font-mono text-white/80">{telemetry.packets.toLocaleString()}</span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                        <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">Link Status</span>
                        <span className="text-xl font-mono text-[#00FF41]">STABLE</span>
                    </div>
                </div>

                {/* PROGRESS SECTION */}
                <div className="w-full flex flex-col gap-8">
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-2">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={phaseIndex}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex flex-col items-start"
                                >
                                    <span className="text-[14px] font-mono font-black tracking-[0.3em] text-white uppercase mb-1">
                                        {phases[phaseIndex].text}
                                    </span>
                                    <span className="text-[11px] font-mono text-white/40 tracking-[0.1em] uppercase">
                                        {phases[phaseIndex].sub}
                                    </span>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-3xl font-mono font-black text-white">{Math.round(progress)}%</span>
                            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#00FF41] uppercase">Unlimited Updates Active</span>
                        </div>
                    </div>

                    {/* HEAVY PROGRESS BAR */}
                    <div className="relative h-[12px] w-full bg-white/5 border border-white/10 p-[2px] overflow-hidden">
                        <motion.div
                            className="h-full bg-white relative shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        />

                        {/* Scanline pattern over bar */}
                        <div className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(90deg, transparent 50%, rgba(0,0,0,0.5) 50%)', backgroundSize: '4px 100%' }}
                        />
                    </div>

                    {/* BOTTOM DECORATIVE HUD */}
                    <div className="flex justify-center items-center gap-12 pt-8 opacity-20">
                        <div className="flex items-center gap-2">
                            <Cpu size={14} />
                            <span className="text-[10px] font-mono tracking-widest uppercase">Encryption Engaged</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Binary size={14} />
                            <span className="text-[10px] font-mono tracking-widest uppercase">Syncing Registry</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Network size={14} />
                            <span className="text-[10px] font-mono tracking-widest uppercase">Grid Authorized</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* RADIAL SCAN ANIMATION */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none"
            />
        </div>
    )
}

export default Loading
