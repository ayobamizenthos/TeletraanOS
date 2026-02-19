import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, Lock, Mail, User, RotateCw } from 'lucide-react';
import WindowControls from './WindowControls';
import teletraanLogo from '../assets/teletraan.svg';

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

            {/* Background Gradient */}
            <div className="absolute inset-0 bg-black z-0" />

            <div className="w-full max-w-[1400px] h-[800px] flex flex-col lg:flex-row items-center justify-center lg:justify-between relative z-10 px-10 lg:px-20">

                {/* LEFT SIDE: VISUALIZATION (Maintained) */}
                <div className="hidden lg:flex flex-col items-center justify-start pt-[160px] ml-[-70px] w-[650px] h-[750px] relative origin-center rounded-[30px] border border-white/10 bg-white/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.03),inset_0_0_20px_rgba(255,255,255,0.02)] backdrop-blur-sm overflow-hidden group">

                    {/* Titanium Glow Effect */}
                    <div className="absolute inset-0 rounded-[30px] border border-white/20 opacity-50 pointer-events-none" />
                    <div className="absolute -inset-[1px] rounded-[31px] bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-30 pointer-events-none" />

                    <div className="relative w-full h-full flex items-center justify-center scale-[0.85] origin-top">

                        {/* CENTRAL HUB - THE DIAL */}
                        <div className="relative w-[360px] h-[360px] rounded-full bg-[#111] shadow-[0_30px_60px_rgba(0,0,0,0.8)] flex items-center justify-center mt-10">

                            {/* Outer Glow */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-[#1a1a1a] to-[#080808] shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),0_10px_30px_rgba(0,0,0,1)]" />

                            {/* ROTATING RING BACKGROUND - CINEMATIC ROLL */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1.8 }}
                            >
                                {/* Inner Letter Track (The Rolling Grey Shape) */}
                                <div className="absolute inset-[46px] rounded-full bg-[#050505] shadow-[inset_0_12px_24px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center">

                                    {/* Conic Gradient for Metallic Sheen */}
                                    <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,255,255,0.05)_25%,transparent_50%,rgba(255,255,255,0.05)_75%,transparent_100%)] opacity-50" />

                                    {/* Mechanical Ticks / Turbine Pattern */}
                                    <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1" strokeDasharray="1 4" />
                                        <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="0.5" strokeDasharray="4 8" />
                                    </svg>

                                    {/* Asymmetric Highlights */}
                                    <div className="absolute top-0 w-[2px] h-[30px] bg-white/20 blur-[1px]" />
                                    <div className="absolute bottom-0 w-[2px] h-[30px] bg-white/20 blur-[1px]" />
                                    <div className="absolute left-0 w-[30px] h-[2px] bg-white/10 blur-[1px]" />
                                    <div className="absolute right-0 w-[30px] h-[2px] bg-white/10 blur-[1px]" />

                                </div>
                            </motion.div>

                            {/* LETTERS - TELETRAAN - STATIC FOREGROUND */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                {/* Radius ~112px from center to hit the track middle */}
                                {[
                                    { char: 'T', deg: -72 },
                                    { char: 'E', deg: -54 },
                                    { char: 'L', deg: -36 },
                                    { char: 'E', deg: -18 },
                                    { char: 'T', deg: 0 },
                                    { char: 'R', deg: 18 },
                                    { char: 'A', deg: 36 },
                                    { char: 'A', deg: 54 },
                                    { char: 'N', deg: 72 }
                                ].map((item, i) => (
                                    <span
                                        key={i}
                                        className="absolute text-[32px] font-sans text-white font-black tracking-widest drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)]"
                                        style={{
                                            transform: `rotate(${item.deg}deg) translateY(-112px)`,
                                        }}
                                    >
                                        {item.char}
                                    </span>
                                ))}
                            </div>

                            {/* Center Button with TELETRAAN LOGO (Static Container, Animated Logo) */}
                            <div className="absolute z-20 w-[100px] h-[100px] bg-[#161616] rounded-[24px] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/[0.05] flex items-center justify-center overflow-visible">
                                <motion.img
                                    layoutId="teletraan-hero-logo"
                                    src={teletraanLogo}
                                    className="w-[64px] h-[64px] opacity-90 object-contain"
                                    alt="Teletraan"
                                    initial={{ x: 400, y: 400, opacity: 0, scale: 0.5 }}
                                    animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                    transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                />
                            </div>

                            {/* CONNECTING LINES - SVG - Centered */}
                            {/* CONNECTING LINES - LASER BEAMS */}
                            <svg className="absolute top-[-215px] left-1/2 transform -translate-x-1/2 w-[580px] h-[400px] pointer-events-none z-0 overflow-visible">
                                <defs>
                                    <linearGradient id="beam-gradient" x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
                                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                                        <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
                                    </linearGradient>
                                    <filter id="laser-glow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                                        <feColorMatrix in="blur" type="matrix" values="0 0 0 0 1   0 0 0 0 1   0 0 0 0 1  0 0 0 0.6 0" result="glow" />
                                        <feMerge>
                                            <feMergeNode in="glow" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Left Line */}
                                <motion.path
                                    d="M 90,0 V 130 L 190,240 V 245"
                                    fill="none"
                                    stroke="url(#beam-gradient)"
                                    strokeWidth="2.5"
                                    strokeLinecap="square"
                                    strokeLinejoin="miter"
                                    style={{ filter: 'url(#laser-glow)' }}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                                />

                                {/* Right Line */}
                                <motion.path
                                    d="M 490,0 V 130 L 390,240 V 245"
                                    fill="none"
                                    stroke="url(#beam-gradient)"
                                    strokeWidth="2.5"
                                    strokeLinecap="square"
                                    strokeLinejoin="miter"
                                    style={{ filter: 'url(#laser-glow)' }}
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.7, ease: "circOut" }}
                                />

                                {/* Middle Line: ACCESS CONTROL */}
                                <motion.rect
                                    x="289"
                                    y="90"
                                    width="2"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 125, opacity: 1 }}
                                    transition={{ duration: 1.5, delay: 0.9, ease: "circOut" }}
                                    fill="url(#beam-gradient)"
                                    style={{ filter: 'url(#laser-glow)' }}
                                />
                            </svg>

                            {/* LABELS */}
                            {/* Left Label - Aligned with x=-200px line start */}
                            <div className="absolute top-[-250px] left-[calc(50%-200px)] transform -translate-x-1/2">
                                <div className="relative min-w-[220px] py-3 bg-[#111111] border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden group">
                                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                                    <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
                                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />
                                    {/* Corners: Top-Left & Bottom-Right Only */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />
                                    <span className="text-[12px] font-bold font-mono text-white tracking-[0.2em] uppercase relative z-10 whitespace-nowrap">Maximum Protection</span>
                                </div>
                            </div>

                            {/* Center Label - Aligned with x=0px line start */}
                            <div className="absolute top-[-160px] left-1/2 transform -translate-x-1/2">
                                <div className="relative min-w-[180px] py-3 bg-[#111111] border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden group">
                                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                                    <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
                                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />
                                    {/* Corners: Top-Left & Bottom-Right Only */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />
                                    <span className="text-[12px] font-bold font-mono text-white tracking-[0.2em] uppercase relative z-10 whitespace-nowrap">Access Control</span>
                                </div>
                            </div>

                            {/* Right Label - Aligned with x=+200px line start */}
                            <div className="absolute top-[-250px] left-[calc(50%+200px)] transform -translate-x-1/2">
                                <div className="relative min-w-[240px] py-3 bg-[#111111] border border-white/10 flex items-center justify-center shadow-2xl overflow-hidden group">
                                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                                    <div className="absolute inset-x-0 top-0 h-[1px] bg-white/20" />
                                    <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/20" />
                                    {/* Corners: Top-Left & Bottom-Right Only */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/50" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/50" />
                                    <span className="text-[12px] font-bold font-mono text-white tracking-[0.2em] uppercase relative z-10 whitespace-nowrap">AI-Powered Surveillance</span>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Footer Text - Impressively Positioned */}
                    <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none">
                        <span className="text-[14px] font-sans font-black text-white tracking-[0.5em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">The Future of AI-Powered Security</span>
                    </div>

                    {/* Reload Button for Testing Animation */}
                    <motion.button
                        onClick={() => window.location.reload()}
                        className="absolute bottom-8 left-8 flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-colors z-[100] group"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2 }}
                    >
                        <RotateCw className="w-4 h-4 text-white/50 group-hover:text-white group-hover:rotate-180 transition-all duration-500" />
                        <span className="text-[10px] font-mono text-white/30 tracking-widest uppercase group-hover:text-white/70 transition-colors">Reset Viz</span>
                    </motion.button>

                </div>

                {/* RIGHT SIDE: LOGIN FORM (RESTORED) */}
                <div className="flex-1 flex flex-col items-end justify-center pr-0 mr-[-60px]">

                    <div className="w-full max-w-[550px] flex flex-col gap-5">

                        {/* Centered Heading */}
                        <div className="text-center mb-8">
                            <h1 className="text-[48px] font-sans font-bold tracking-[0.2em] text-white uppercase mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">TELETRAAN</h1>

                            {/* Sign In Header Box - Tactical */}
                            <div className="w-full relative py-4 flex items-center justify-center">
                                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                <span className="text-[16px] font-mono font-bold text-white tracking-[0.2em] uppercase">System Access</span>
                            </div>
                        </div>

                        {/* Inputs */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-mono text-[#888] tracking-[0.1em] uppercase ml-1">User ID</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <User size={18} className="text-[#555] group-focus-within:text-white transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-[64px] bg-[#0F0F0F] text-white pl-16 pr-6 text-[15px] font-mono outline-none border border-white/10 focus:border-white/40 focus:bg-[#141414] rounded-[2px] placeholder:text-[#333] transition-all"
                                        placeholder="ENTER EMAIL"
                                    />
                                    {/* Corner Accents */}
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-focus-within:border-white/60 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-focus-within:border-white/60 transition-colors" />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-mono text-[#888] tracking-[0.1em] uppercase ml-1">Passkey</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <Lock size={18} className="text-[#555] group-focus-within:text-white transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-[64px] bg-[#0F0F0F] text-white pl-16 pr-16 text-[15px] font-mono outline-none border border-white/10 focus:border-white/40 focus:bg-[#141414] rounded-[2px] tracking-[0.2em] placeholder:text-[#333] transition-all"
                                        placeholder="••••••••••••"
                                    />
                                    {/* Corner Accents */}
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-focus-within:border-white/60 transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-focus-within:border-white/60 transition-colors" />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-6 flex items-center text-[#555] hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-start mt-[-5px]">
                                <a href="#" className="text-[11px] font-mono text-[#666] hover:text-white transition-colors uppercase tracking-widest hover:underline decoration-white/20">
                                    [ RESET CREDENTIALS ]
                                </a>
                            </div>

                            {/* Sign In Button - PREMIUM REDESIGN - Previous Size */}
                            <div className="flex justify-center mt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`relative group w-[240px] h-[54px] border border-white overflow-hidden rounded-[2px] cursor-pointer ${isLoading ? 'opacity-80' : ''}`}
                                >
                                    {/* Solid White Sliding Background - Default Visible, Slides Right on Hover */}
                                    <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />

                                    {/* Content Layer */}
                                    <span className="relative z-10 font-bold font-mono text-[13px] tracking-[0.25em] uppercase text-black group-hover:text-white transition-colors duration-300">
                                        {isLoading ? 'INITIALIZING...' : 'SIGN IN'}
                                    </span>

                                    {/* Tactical Corners (Visible on Hover/Transparent state) */}
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
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
