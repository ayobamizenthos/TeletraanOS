import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, Lock, Mail, User } from 'lucide-react';
import WindowControls from './WindowControls';
import teletraanLogo from '../assets/teletraan.svg';
import saIcon from '../assets/sa.svg';
import rfIcon from '../assets/rf.svg';
import dmIcon from '../assets/dm.svg';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('ayobamizenthos@gmail.com');
    const [password, setPassword] = useState('zenthos@avzdax100#');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            if (onLogin) onLogin();
        }, 800);
    };

    // Component for the "Grids" (Tactical Labels)
    const DiagramGridNode = ({ icon, text, delay = 0 }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 relative"
        >
            {/* HUD Container */}
            <div className="relative bg-[#1A1A1A]/80 backdrop-blur-md px-6 py-4 border border-white/5 shadow-2xl flex items-center gap-4 group overflow-hidden">
                {/* Tactical Corners */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-white/40 group-hover:border-[#00FF41] transition-colors" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-white/40 group-hover:border-[#00FF41] transition-colors" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-white/40 group-hover:border-[#00FF41] transition-colors" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-white/40 group-hover:border-[#00FF41] transition-colors" />

                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-5 pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 0)', backgroundSize: '8px 8px' }}
                />

                {/* Icon Assembly */}
                <div className="relative w-10 h-10 flex items-center justify-center bg-white/5 rounded-sm border border-white/10 group-hover:border-[#00FF41]/30 transition-all">
                    <img src={icon} className="w-6 h-6 filter invert brightness-[2] drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" alt="Icon" />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-white/5 rounded-full"
                    />
                </div>

                {/* Text */}
                <span className="text-[13px] text-white/90 font-mono font-bold tracking-[0.15em] uppercase whitespace-nowrap drop-shadow-sm select-none">
                    {text}
                </span>
            </div>

            {/* Status Pulse */}
            <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41] animate-pulse" />
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(10px)", transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] } }}
            className="min-h-screen bg-[#050505] flex items-center justify-center p-0 font-sans text-white overflow-hidden relative selection:bg-[#333] selection:text-white"
        >

            {/* WINDOW CONTROLS - TOP RIGHT */}
            <div className="absolute top-0 right-0 p-6 z-50 scale-125 origin-top-right">
                <WindowControls showReload={false} />
            </div>

            {/* Background Atmosphere */}
            <div className="absolute inset-0 bg-black z-0" />
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#222_0%,transparent_70%)] pointer-events-none" />

            <div className="w-full max-w-[1400px] h-[800px] flex flex-col lg:flex-row items-center justify-center lg:justify-between relative z-10 px-10 lg:px-20">

                {/* LEFT SIDE: VISUALIZATION (THE DIAGRAM) */}
                <div className="hidden lg:flex flex-col items-center justify-start pt-[160px] ml-[-70px] w-[650px] h-[750px] relative origin-center rounded-[40px] border border-white/10 bg-white/[0.01] shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(255,255,255,0.01)] backdrop-blur-md overflow-hidden group">

                    {/* Industrial Bezel Effect */}
                    <div className="absolute inset-0 rounded-[40px] border border-white/20 opacity-30 pointer-events-none shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]" />

                    <div className="relative w-full h-full flex items-center justify-center scale-[0.85] origin-top">

                        {/* CENTRAL HUB - THE DIAL */}
                        <div className="relative w-[360px] h-[360px] rounded-full bg-[#080808] shadow-[0_40px_80px_rgba(0,0,0,1),inset_0_0_40px_rgba(255,255,255,0.02)] flex items-center justify-center mt-10">

                            {/* Outer Glow Ring */}
                            <div className="absolute inset-[-2px] rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-50 blur-[1px]" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#050505] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]" />

                            {/* ROTATING RING BACKGROUND - CINEMATIC ROLL */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="absolute inset-[46px] rounded-full bg-[#030303] shadow-[inset_0_15px_30px_rgba(0,0,0,1)] overflow-hidden flex items-center justify-center">
                                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.03)_25%,transparent_50%,rgba(255,255,255,0.03)_75%,transparent_100%)] opacity-40" />
                                    <svg className="absolute inset-0 w-full h-full opacity-[0.15]" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="1 3" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.3" strokeDasharray="3 6" />
                                    </svg>
                                </div>
                            </motion.div>

                            {/* LETTERS - TELETRAAN - STATIC FOREGROUND */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                {[
                                    { char: 'T', deg: -72 }, { char: 'E', deg: -54 }, { char: 'L', deg: -36 },
                                    { char: 'E', deg: -18 }, { char: 'T', deg: 0 }, { char: 'R', deg: 18 },
                                    { char: 'A', deg: 36 }, { char: 'A', deg: 54 }, { char: 'N', deg: 72 }
                                ].map((item, i) => (
                                    <span key={i} className="absolute text-[32px] font-sans text-white font-black tracking-widest drop-shadow-[0_4px_8px_rgba(0,0,0,1)]"
                                        style={{ transform: `rotate(${item.deg}deg) translateY(-112px)` }}>
                                        {item.char}
                                    </span>
                                ))}
                            </div>

                            {/* Center Button with TELETRAAN LOGO (STATIC) */}
                            <div className="absolute z-20 w-[110px] h-[110px] bg-[#0c0c0c] rounded-[28px] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_1px_3px_rgba(255,255,255,0.1)] border border-white/[0.08] flex items-center justify-center overflow-visible">
                                <motion.img
                                    layoutId="teletraan-hero-logo"
                                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                                    src={teletraanLogo}
                                    className="w-[70px] h-[70px] opacity-100 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                    alt="Teletraan"
                                />
                            </div>

                            {/* SHARP CONNECTING LINES (SVG MOTION PATHS) */}
                            <svg className="absolute top-[-260px] left-1/2 transform -translate-x-1/2 w-[700px] h-[500px] pointer-events-none z-0 overflow-visible">
                                {/* Left Line */}
                                <motion.path
                                    d="M 120,40 V 160 L 220,280 V 320"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.4 }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                />
                                {/* Right Line */}
                                <motion.path
                                    d="M 580,40 V 160 L 480,280 V 320"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.4 }}
                                    transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                                />
                                {/* Center Line */}
                                <motion.path
                                    d="M 350,140 V 260"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 0.4 }}
                                    transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
                                />
                            </svg>

                            {/* TACTICAL GRIDS (THE LABELS) */}
                            {/* Left (Smart Analysis) */}
                            <div className="absolute top-[-300px] left-[calc(50%-230px)] transform -translate-x-1/2">
                                <DiagramGridNode icon={saIcon} text="Maximum Protection" delay={1.2} />
                            </div>

                            {/* Center (Device Management) */}
                            <div className="absolute top-[-220px] left-1/2 transform -translate-x-1/2">
                                <DiagramGridNode icon={dmIcon} text="Access Control" delay={1.4} />
                            </div>

                            {/* Right (Risk Factor) */}
                            <div className="absolute top-[-300px] left-[calc(50%+230px)] transform -translate-x-1/2">
                                <DiagramGridNode icon={rfIcon} text="AI-Powered Surveillance" delay={1.6} />
                            </div>

                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none">
                        <span className="text-[14px] font-bold text-white/40 tracking-[0.4em] uppercase">Sovereign Authority Established</span>
                    </div>

                </div>

                {/* RIGHT SIDE: LOGIN FORM */}
                <div className="flex-1 flex flex-col items-end justify-center pr-0 mr-[-60px]">
                    <div className="w-full max-w-[550px] flex flex-col gap-5">
                        <div className="text-center mb-8">
                            <h1 className="text-[48px] font-sans font-bold tracking-[0.2em] text-white uppercase mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">TELETRAAN</h1>
                            <div className="w-full relative py-4 flex items-center justify-center">
                                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                <span className="text-[16px] font-mono font-bold text-white tracking-[0.3em] uppercase">System Authentication</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-mono text-white/40 tracking-[0.2em] uppercase ml-1">Operator ID</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <User size={18} className="text-white/20 group-focus-within:text-[#00FF41] transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-[64px] bg-[#0A0A0A] text-white pl-16 pr-6 text-[15px] font-mono outline-none border border-white/10 focus:border-[#00FF41]/40 focus:bg-[#0f0f0f] rounded-[2px] transition-all"
                                        placeholder="SYSTEM ACCESS KEY"
                                    />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-focus-within:border-[#00FF41]/60 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-focus-within:border-[#00FF41]/60 transition-colors" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-mono text-white/40 tracking-[0.2em] uppercase ml-1">Pass-Code</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-white/20 group-focus-within:text-[#00FF41] transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-[64px] bg-[#0A0A0A] text-white pl-16 pr-16 text-[15px] font-mono outline-none border border-white/10 focus:border-[#00FF41]/40 focus:bg-[#0f0f0f] rounded-[2px] tracking-[0.3em] transition-all"
                                        placeholder="••••••••••••"
                                    />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-focus-within:border-[#00FF41]/60 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-focus-within:border-[#00FF41]/60 transition-colors" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-6 flex items-center text-white/20 hover:text-white transition-colors">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex justify-start mt-[-5px]">
                                <a href="#" className="text-[11px] font-mono text-white/30 hover:text-[#00FF41] transition-colors uppercase tracking-widest">
                                    [ RESET SYSTEM CREDENTIALS ]
                                </a>
                            </div>

                            <div className="flex justify-center mt-6">
                                <button type="submit" disabled={isLoading}
                                    className={`relative group w-[240px] h-[54px] border border-white overflow-hidden rounded-[2px] cursor-pointer ${isLoading ? 'opacity-80' : ''}`}>
                                    <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                    <span className="relative z-10 font-bold font-mono text-[13px] tracking-[0.3em] uppercase text-black group-hover:text-white transition-colors duration-300">
                                        {isLoading ? 'INITIALIZING...' : 'AUTH SYSTEM'}
                                    </span>
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-[#00FF41] transition-colors delay-100" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-[#00FF41] transition-colors delay-100" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Login;
