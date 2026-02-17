import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Shield, Lock, Mail, User } from 'lucide-react';
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
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-0 font-sans text-white overflow-hidden relative selection:bg-[#333] selection:text-white">

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

                            {/* Inner Letter Track */}
                            <div className="absolute inset-[46px] rounded-full bg-[#050505] shadow-[inset_0_12px_24px_rgba(0,0,0,1),0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">
                                <div className="absolute top-[-20px] left-1/2 transform -translate-x-1/2 w-[140px] h-[50px] bg-white opacity-5 blur-xl rounded-full pointer-events-none" />
                            </div>

                            {/* Center Button with TELETRAAN LOGO */}
                            <div className="absolute z-20 w-[72px] h-[72px] bg-[#161616] rounded-[18px] shadow-[0_4px_10px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] border border-white/[0.05] flex items-center justify-center overflow-hidden">
                                <img src={teletraanLogo} className="w-[40px] h-[40px] opacity-90" alt="Teletraan" />
                            </div>

                            {/* LETTERS - TELETRAAN - Perfectly Curved & Centered */}
                            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                                {/* Radius ~112px from center to hit the track middle */}
                                {[
                                    { char: 'T', deg: -80 },
                                    { char: 'E', deg: -60 },
                                    { char: 'L', deg: -40 },
                                    { char: 'E', deg: -20 },
                                    { char: 'T', deg: 0 },
                                    { char: 'R', deg: 20 },
                                    { char: 'A', deg: 40 },
                                    { char: 'A', deg: 60 },
                                    { char: 'N', deg: 80 }
                                ].map((item, i) => (
                                    <span
                                        key={i}
                                        className="absolute text-[15px] font-sans text-white font-bold"
                                        style={{
                                            transform: `rotate(${item.deg}deg) translateY(-112px)`,
                                        }}
                                    >
                                        {item.char}
                                    </span>
                                ))}
                            </div>

                            {/* CONNECTING LINES - SVG - Centered */}
                            <svg className="absolute top-[-220px] left-1/2 transform -translate-x-1/2 w-[580px] h-[400px] pointer-events-none z-0 overflow-visible">
                                <path d="M 90,0 V 130 L 180,240 V 270" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="6 6" className="opacity-50" />
                                <path d="M 490,0 V 130 L 400,240 V 270" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="6 6" className="opacity-50" />
                                <path d="M 290,90 V 220" fill="none" stroke="#555" strokeWidth="1" strokeDasharray="6 6" className="opacity-50" />
                            </svg>

                            {/* LABELS */}
                            {/* Left Label - Aligned with x=-200px line start */}
                            <div className="absolute top-[-250px] left-[calc(50%-200px)] transform -translate-x-1/2 bg-[#1A1A1A] px-5 py-3 min-w-[180px] flex items-center justify-center border border-white/5 shadow-2xl">
                                <span className="text-[14px] text-[#E0E0E0] font-sans tracking-wide whitespace-nowrap">Maximum Protection</span>
                            </div>

                            {/* Center Label - Aligned with x=0px line start */}
                            <div className="absolute top-[-160px] left-1/2 transform -translate-x-1/2 bg-[#1A1A1A] px-5 py-3 min-w-[160px] flex items-center justify-center border border-white/5 shadow-2xl">
                                <span className="text-[14px] text-[#E0E0E0] font-sans tracking-wide whitespace-nowrap">Access Control</span>
                            </div>

                            {/* Right Label - Aligned with x=+200px line start */}
                            <div className="absolute top-[-250px] left-[calc(50%+200px)] transform -translate-x-1/2 bg-[#1A1A1A] px-5 py-3 min-w-[200px] flex items-center justify-center border border-white/5 shadow-2xl">
                                <span className="text-[14px] text-[#E0E0E0] font-sans tracking-wide whitespace-nowrap">AI-Powered Surveillance</span>
                            </div>

                        </div>
                    </div>
                    {/* Footer Text - Impressively Positioned */}
                    <div className="absolute bottom-24 left-0 right-0 text-center pointer-events-none">
                        <span className="text-[16px] font-medium text-white/50 tracking-[0.3em] uppercase glow-text">The Future of AI-Powered Security</span>
                    </div>

                </div>

                {/* RIGHT SIDE: LOGIN FORM (UPDATED TO DARK THEME & SIZING) */}
                <div className="flex-1 flex flex-col items-end justify-center pr-0 mr-[-60px]">

                    <div className="w-full max-w-[550px] flex flex-col gap-5">

                        {/* Centered Heading */}
                        <div className="text-center mb-8">
                            <h1 className="text-[48px] font-sans font-medium tracking-[0.2em] text-white uppercase mb-6">TELETRAAN</h1>

                            {/* Sign In Header Box */}
                            <div className="w-full border-t border-b border-white/20 bg-[#111] py-4 flex items-center justify-center">
                                <span className="text-[18px] font-medium text-white tracking-[0.05em]">Sign In</span>
                            </div>
                        </div>

                        {/* Inputs */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                            {/* Email */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[14px] text-[#CCC] font-medium font-sans ml-1">Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <User size={20} className="text-[#666] group-focus-within:text-[#999] transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-[64px] bg-[#161616] text-white pl-16 pr-6 text-[16px] font-medium outline-none border border-white/10 focus:border-white/30 rounded-[2px] placeholder:text-[#444] transition-all"
                                        placeholder="Enter Email"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-3">
                                <label className="text-[14px] text-[#CCC] font-medium font-sans ml-1">Password</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                                        <Lock size={20} className="text-[#666] group-focus-within:text-[#999] transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-[64px] bg-[#161616] text-white pl-16 pr-16 text-[16px] font-medium outline-none border border-white/10 focus:border-white/30 rounded-[2px] tracking-widest placeholder:text-[#444] transition-all"
                                        placeholder="Enter Password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-6 flex items-center text-[#666] hover:text-[#AAA] transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-start mt-[-10px]">
                                <a href="#" className="text-[13px] text-[#888] hover:text-[#CCC] transition-colors underline decoration-white/10 hover:decoration-white/50">
                                    Forgot Password?
                                </a>
                            </div>

                            {/* Sign In Button - PREMIUM REDESIGN - Previous Size */}
                            <div className="flex justify-center mt-6">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255,255,255,0.4)" }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-[220px] h-[50px] bg-gradient-to-r from-[#E0E0E0] via-[#F5F5F5] to-[#E0E0E0] text-black font-bold text-[15px] tracking-[0.1em] uppercase shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-center rounded-[4px] border border-white/50 transition-all ${isLoading ? 'opacity-80' : ''}`}
                                >
                                    {isLoading ? 'Loading...' : 'Sign In'}
                                </motion.button>
                            </div>

                        </form>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Login;
