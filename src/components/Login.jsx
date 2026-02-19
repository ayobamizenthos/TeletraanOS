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

    // New "Image-Exact" Grid Node - No icons, just bold text in a HUD box
    const DiagramGridNode = ({ text, delay = 0, align = "center", width = "auto" }) => (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-0 relative"
            style={{ width: width === "auto" ? "auto" : width }}
        >
            {/* The Main HUD Box */}
            <div className="relative w-full bg-[#080808] px-6 py-3 border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">

                {/* 1. Internal Grid Texture */}
                <div className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                        backgroundSize: '12px 12px'
                    }}
                />

                {/* 2. Top/Bottom Gradient Fades (Glass Effect) */}
                <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />

                {/* 3. Corner Brackets (Grey/White) */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40" />

                {/* 4. Text Content */}
                <span className="relative z-10 text-[11px] text-white font-mono font-bold tracking-[0.1em] uppercase whitespace-nowrap drop-shadow-md">
                    {text}
                </span>
            </div>
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

            {/* Subtle Vignette & Grain */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]" />

            <div className="w-full max-w-[1400px] h-[800px] flex flex-col lg:flex-row items-center justify-center lg:justify-between relative z-10 px-10 lg:px-20">

                {/* LEFT SIDE: VISUALIZATION (THE DIAGRAM) */}
                <div className="hidden lg:flex flex-col items-center justify-start pt-[160px] ml-[-70px] w-[650px] h-[750px] relative origin-center rounded-[40px] border border-white/10 bg-white/[0.01] shadow-[0_0_50px_rgba(0,0,0,0.5),inset_0_0_30px_rgba(255,255,255,0.01)] backdrop-blur-md overflow-hidden group">

                    {/* Industrial Bezel Effect */}
                    <div className="absolute inset-0 rounded-[40px] border border-white/20 opacity-30 pointer-events-none shadow-[inset_0_2px_10px_rgba(255,255,255,0.05)]" />

                    <div className="relative w-full h-full flex items-center justify-center scale-[0.85] origin-top">

                        {/* CENTRAL HUB - THE DIAL */}
                        {/* Lowered closer to bottom to match image proportions */}
                        <div className="absolute bottom-[80px] w-[380px] h-[380px] rounded-full bg-[#080808] shadow-[0_40px_80px_rgba(0,0,0,1)] flex items-center justify-center z-10">

                            {/* Outer Glow Ring */}
                            <div className="absolute inset-[-2px] rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-50 blur-[1px]" />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#050505] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05)]" />

                            {/* ROTATING RING BACKGROUND */}
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
                                        style={{ transform: `rotate(${item.deg}deg) translateY(-118px)` }}>
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

                        </div>

                        {/* NEW SHARP CONNECTING LINES (SVG MATCHING IMAGE) */}
                        {/* 
                           Coordinates Logic (approx 700x600 viewBox):
                           Center X = 350
                           Dial Top Y = ~350 (Since dial is bottom aligned)
                           
                           Left Box Bottom: x=120, y=100
                           Right Box Bottom: x=580, y=100
                           Center Box Bottom: x=350, y=200
                        */}
                        <svg className="absolute w-full h-full pointer-events-none z-0 overflow-visible" viewBox="0 0 700 800">
                            <defs>
                                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur stdDeviation="2" result="blur" />
                                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                                </filter>
                                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
                                </linearGradient>
                            </defs>

                            {/* Left Line: Down -> Diagonal In -> Down */}
                            <motion.path
                                d="M 175,180 V 320 L 280,450 V 500"
                                fill="none"
                                stroke="url(#line-gradient)"
                                strokeWidth="2"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                            />

                            {/* Right Line: Down -> Diagonal In -> Down */}
                            <motion.path
                                d="M 525,180 V 320 L 420,450 V 500"
                                fill="none"
                                stroke="url(#line-gradient)"
                                strokeWidth="2"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
                            />

                            {/* Center Line: Straight Down */}
                            <motion.path
                                d="M 350,300 V 460"
                                fill="none"
                                stroke="url(#line-gradient)"
                                strokeWidth="2"
                                filter="url(#glow)"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 0.6 }}
                                transition={{ duration: 1.2, delay: 0.9, ease: "easeInOut" }}
                            />
                        </svg>

                        {/* TACTICAL GRIDS (THE LABELS) - POSITIONED TO MATCH LINES */}

                        {/* Left (Maximum Protection) - Higher up */}
                        <div className="absolute top-[135px] left-[175px] transform -translate-x-1/2">
                            <DiagramGridNode text="MAXIMUM PROTECTION" delay={1.2} width="220px" />
                        </div>

                        {/* Center (Access Control) - Middle */}
                        <div className="absolute top-[255px] left-[350px] transform -translate-x-1/2">
                            <DiagramGridNode text="ACCESS CONTROL" delay={1.4} width="200px" />
                        </div>

                        {/* Right (AI Surveillance) - Higher up */}
                        <div className="absolute top-[135px] right-[75px] transform -translate-x-1/2">
                            <DiagramGridNode text="AI SURVEILLANCE" delay={1.6} width="220px" />
                        </div>

                    </div>

                    {/* Footer Text */}
                    <div className="absolute bottom-16 left-0 right-0 text-center pointer-events-none">
                        <span className="text-[12px] font-mono font-bold text-white/30 tracking-[0.4em] uppercase">Security Protocol v9.2</span>
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
