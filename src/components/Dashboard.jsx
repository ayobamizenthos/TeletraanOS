import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    MapPin, Minus, Square, X, Bell, RefreshCw, Key, MessageCircle, Wrench, Loader2, Wifi, Activity, CheckCircle2,
    LayoutGrid, FileText, Shield, Users, Settings, LogOut, Video, Radio, WifiOff, FileWarning, MessageSquareMore, Paperclip, Mic, ArrowRight, Plus, Cctv, Search, ChevronDown, Edit2, ChevronLeft, ChevronRight, AlertTriangle, ScanFace, DoorOpen, Sofa, Car, TreePine, Utensils, Camera, BatteryMedium, Link, Maximize, Power
} from 'lucide-react'

import zenthosImg from '../assets/Zenthos.png'
import dmIcon from '../assets/dm.svg'
import rfIcon from '../assets/rf.svg'
import saIcon from '../assets/sa.svg'
import teletraanLogo from '../assets/teletraan.svg'
import secCamSvg from '../assets/sec-cam.svg'

import WindowControls from './WindowControls'

// === GLOBAL TYPOGRAPHY ===
const font = {
    header: "'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', monospace",
}

const RfIcon = ({ size, className }) => <img src={rfIcon} className={className} style={{ width: size, height: size }} alt="RF" />
const SaIcon = ({ size, className }) => <img src={saIcon} className={className} style={{ width: size, height: size }} alt="SA" />
const DmIcon = ({ size, className }) => <img src={dmIcon} className={className} style={{ width: size, height: size }} alt="DM" />

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   FEED CELL
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const FeedCell = ({ label, active = true, alert = false, offline = false, systemNet = 100 }) => {
    const camId = useRef(`OX-${Math.random().toString(36).substr(2, 4).toUpperCase()}-${Math.random().toString(10).substr(2, 2)}`);

    // Previous signal bar simulation - now scaled by real system net
    const [signal, setSignal] = useState(4);
    const isActuallyOffline = offline || systemNet === 0;

    useEffect(() => {
        if (isActuallyOffline) return;
        const interval = setInterval(() => {
            // Local jitter but capped by system net
            const maxBars = systemNet > 80 ? 4 : systemNet > 50 ? 3 : systemNet > 20 ? 2 : 1;
            setSignal(prev => {
                const jitter = Math.random() > 0.5 ? 1 : -1;
                return Math.max(1, Math.min(maxBars, prev + jitter));
            });
        }, 8000);
        return () => clearInterval(interval);
    }, [isActuallyOffline, systemNet]);

    return (
        <div className="relative w-full h-full bg-[#050505] overflow-hidden flex flex-col border border-white/[0.08] rounded-[4px] group transition-all duration-500 hover:border-white/20">
            {/* VIGNETTE & GRAIN LAYER */}
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.15]"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10 pointer-events-none" />

            {isActuallyOffline ? (
                <>
                    {/* OFFLINE STATE - CRT STATIC */}
                    <div className="absolute inset-0 bg-[#080808]">
                        <div className="w-full h-full opacity-[0.2]"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
                            <motion.div
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="flex flex-col items-center"
                            >
                                <WifiOff size={42} className="text-white/40 mb-3" strokeWidth={1.5} />
                                <span className="text-white/50 font-mono text-[11px] tracking-[0.4em] uppercase font-bold">
                                    {systemNet === 0 ? 'Scanning...' : 'Signal Lost'}
                                </span>
                            </motion.div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    {/* ONLINE STATE - SCANNING & GRID */}
                    <div className="absolute inset-0 opacity-[0.25]"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
                    />

                    {/* Animated Scanline - Ultra-Slow Cinematic Sweep */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.05] to-transparent h-[10%] w-full animate-scan pointer-events-none" style={{ animationDuration: '24s' }} />

                    {/* Crosshair (Subtle) */}
                    <div className="absolute top-1/2 left-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-20 pointer-events-none bg-white/[0.05] rounded-full">
                        <div className="w-[1px] h-4 bg-white/40" />
                        <div className="absolute h-[1px] w-4 bg-white/40" />
                    </div>

                    {/* TOP INFO BAR */}
                    <div className="absolute top-4 left-6 right-6 flex justify-between items-start z-20">
                        <div className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${alert ? 'bg-red-500 animate-pulse' : 'bg-[#00FF41] shadow-[0_0_8px_#00FF41]'}`} />
                            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/90 uppercase">{label || 'SOURCE-01'}</span>
                        </div>

                        {/* SIGNAL BARS - NOW REACTIVE TO SYSTEM NET */}
                        <div className="flex items-end gap-[3px] h-3 pb-0.5">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: `${25 + (i * 18.75)}%`,
                                        backgroundColor: (signal >= i && systemNet > 0) ? "#00FF41" : "rgba(255, 255, 255, 0.08)",
                                        boxShadow: (signal >= i && systemNet > 0) ? "0 0 10px rgba(0, 255, 65, 0.5)" : "none"
                                    }}
                                    className="w-[2.5px] rounded-[0.5px] transition-colors"
                                />
                            ))}
                        </div>
                    </div>

                    {/* BOTTOM STATUS */}
                    <div className="absolute bottom-4 left-6 right-6 flex justify-end items-end z-20 transition-opacity duration-300 group-hover:opacity-0">
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-white/[0.03] border border-white/10 rounded-[2px]">
                            <Cctv size={10} className="text-white/40" />
                            <span className="text-[8px] font-mono font-bold text-white/60 uppercase tracking-widest">Live Link</span>
                        </div>
                    </div>

                    {alert && <div className="absolute inset-0 border-2 border-red-500/20 bg-red-500/5 animate-pulse z-10 pointer-events-none" />}
                </>
            )}

            {/* Tactical Corner Brackets */}
            <div className={`absolute top-3 left-3 w-4 h-4 border-t border-l ${isActuallyOffline ? 'border-white/10' : 'border-white/20'} z-20 transition-colors group-hover:border-white/50`} />
            <div className={`absolute top-3 right-3 w-4 h-4 border-t border-r ${isActuallyOffline ? 'border-white/10' : 'border-white/20'} z-20 transition-colors group-hover:border-white/50`} />
            <div className={`absolute bottom-3 left-3 w-4 h-4 border-b border-l ${isActuallyOffline ? 'border-white/10' : 'border-white/20'} z-20 transition-colors group-hover:border-white/50`} />
            <div className={`absolute bottom-3 right-3 w-4 h-4 border-b border-r ${isActuallyOffline ? 'border-white/10' : 'border-white/20'} z-20 transition-colors group-hover:border-white/50`} />
        </div>
    );
};

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
   DASHBOARD
   â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
const Dashboard = ({ onLogout }) => {
    const [time, setTime] = useState('')
    const [sidebarHover, setSidebarHover] = useState(false)
    const [refreshKey, setRefreshKey] = useState(0) // Soft reload key
    const [currentLocation, setCurrentLocation] = useState('All locations')
    const [isLocationOpen, setIsLocationOpen] = useState(false)
    const [currentCamera, setCurrentCamera] = useState('All cameras')
    const [isCameraOpen, setIsCameraOpen] = useState(false)
    const [isCameraDetailOpen, setIsCameraDetailOpen] = useState(false) // New Detail Modal State
    const [isReloading, setIsReloading] = useState(false) // System Resync State
    const [activeGridCamera, setActiveGridCamera] = useState('Living Room')
    const [activeTab, setActiveTab] = useState("Security Cameras")
    const [isSetupOpen, setIsSetupOpen] = useState(false)
    const [setupMethod, setSetupMethod] = useState(null) // 'smart' | 'manual' | null
    const [setupStep, setSetupStep] = useState(1) // 1: Method, 2: Manual Form
    const [isMessagesOpen, setIsMessagesOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const [userProfile, setUserProfile] = useState({
        name: 'AYOBAMI ZENTHOS',
        email: 'ayobamizenthos@gmail.com',
        phone: '+2348115383780',
        image: zenthosImg,
        securityKey: '............'
    })
    const [inputMessage, setInputMessage] = useState('')
    const [deviceType, setDeviceType] = useState('Select Hardware...')
    const [isDeviceTypeOpen, setIsDeviceTypeOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('') // Global Search State
    const [activeEditField, setActiveEditField] = useState(null)
    const [isRecording, setIsRecording] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [playbackProgress, setPlaybackProgress] = useState(40) // Default 40% playback position
    const [cameraRegistry, setCameraRegistry] = useState({
        'Living Room': { label: 'LIVING_ROOM', offline: true },
        'Front Door': { label: 'FRONT_DOOR', alert: true },
        'Backyard': { label: 'BACKYARD', offline: false },
        'Garage': { label: 'GARAGE', offline: true }
    })
    const nameInputRef = useRef(null)
    const emailInputRef = useRef(null)
    const securityKeyInputRef = useRef(null)
    const phoneInputRef = useRef(null)

    useEffect(() => {
        if (!activeEditField) return;
        const timer = setTimeout(() => {
            if (activeEditField === 'name') nameInputRef.current?.focus()
            if (activeEditField === 'email') emailInputRef.current?.focus()
            if (activeEditField === 'securityKey') securityKeyInputRef.current?.focus()
            if (activeEditField === 'phone') phoneInputRef.current?.focus()
        }, 50)
        return () => clearTimeout(timer)
    }, [activeEditField])

    const [activeChat, setActiveChat] = useState('System Admin')
    const [isPrimusConnectOpen, setIsPrimusConnectOpen] = useState(false)
    const [primusConnectStep, setPrimusConnectStep] = useState(1)
    const [primusForm, setPrimusForm] = useState({ site: '', label: '', location: '', description: '' })
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
    const [systemStats, setSystemStats] = useState({ battery: 100, net: 0, uptime: 0 })

    const [securityLogs, setSecurityLogs] = useState([
        { id: 1, time: '04:19:39', title: 'Unknown face detected', type: 'alert' },
        { id: 2, time: '04:15:33', title: 'Signal restored', type: 'system' },
        { id: 3, time: '04:10:22', title: 'Motion detected', type: 'alert' },
        { id: 4, time: '04:05:15', title: 'Door locked', type: 'system' },
        { id: 5, time: '04:00:10', title: 'Scan approved', type: 'system' },
        { id: 6, time: '03:55:08', title: 'Signal lost', type: 'alert' },
        { id: 7, time: '03:50:55', title: 'Link success', type: 'system' },
    ])

    const [logoutHover, setLogoutHover] = useState(false);
    const [netHover, setNetHover] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    // CTRL Shortcut Handler
    useEffect(() => {
        const handleKeyDown = (e) => {
            // CTRL+L to sign out automatically
            if (e.ctrlKey && e.key.toLowerCase() === 'l') {
                e.preventDefault();
                onLogout();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onLogout]);

    const [chatHistory, setChatHistory] = useState({
        'System Admin': [
            { id: 1, sender: "System Admin", role: "admin", text: "A new security camera has been integrated into the system.", time: "10:23 AM" },
            { id: 2, sender: "ZENTHOS", role: "user", text: "Great, will check it out.", time: "07:33 AM" }
        ],
        'Security Bot': [
            { id: 1, sender: "Security Bot", role: "security", text: "Motion detected in Sector 7. Perimeter analysis initiating.", time: "10:15 AM" },
            { id: 2, sender: "Security Bot", role: "security", text: "Facial recognition scan pending authorization. Target ID: UNKNOWN.", time: "10:18 AM" }
        ]
    })

    const locationRef = useRef(null)
    const cameraRef = useRef(null)
    const messagesEndRef = useRef(null)

    // Click Outside Handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (locationRef.current && !locationRef.current.contains(event.target)) {
                setIsLocationOpen(false)
            }
            if (cameraRef.current && !cameraRef.current.contains(event.target)) {
                setIsCameraOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    // System Stats Listener
    useEffect(() => {
        if (window.api && window.api.onSystemStats) {
            window.api.onSystemStats((stats) => {
                setSystemStats(stats)
            })
        }
    }, [])

    const handleSoftReload = () => {
        setIsReloading(true)
        // Set to exactly 3 seconds for perfect tactical pacing
        setTimeout(() => {
            setRefreshKey(prev => prev + 1)
            setIsReloading(false)
        }, 3000)
    }

    const toggleFullscreen = () => {
        const element = document.getElementById('camera-full-view');
        if (!document.fullscreenElement) {
            element?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    }

    // Fullscreen change listener
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    const getPlaybackTime = (progress) => {
        const totalSeconds = (progress / 100) * 24 * 3600;
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
    }

    const handleSliderInteraction = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const update = (clientX) => {
            const x = clientX - rect.left;
            const newProgress = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setPlaybackProgress(newProgress);
        };

        update(e.clientX);

        const onMouseMove = (moveEvent) => update(moveEvent.clientX);
        const onMouseUp = () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
    }

    const toggleCameraConnection = (cameraName) => {
        setCameraRegistry(prev => ({
            ...prev,
            [cameraName]: {
                ...prev[cameraName],
                offline: !prev[cameraName].offline
            }
        }))
    }

    const handleSendMessage = () => {
        if (!inputMessage.trim() || activeChat === 'Security Bot') return

        const newMessage = {
            id: Date.now(),
            sender: "ZENTHOS",
            role: "user",
            text: inputMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }

        setChatHistory(prev => ({
            ...prev,
            [activeChat]: [...prev[activeChat], newMessage]
        }))
        setInputMessage('')
    }

    // Scroll to bottom of chat
    useEffect(() => {
        if (isMessagesOpen && messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [chatHistory, isMessagesOpen])

    useEffect(() => {
        const update = () => {
            const d = new Date()
            // Technical Format: YYYY.MM.DD HH:MM:SS
            const date = d.toLocaleDateString('en-CA', { timeZone: 'Africa/Lagos' }).replace(/-/g, '.')
            const time = d.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Africa/Lagos'
            })
            setTime(`${date} ${time}`)
        }
        const t = setInterval(update, 1000)
        update()
        return () => clearInterval(t)
    }, [])

    // LIVE LOG GENERATOR - HYPER SPEED
    useEffect(() => {
        const logPool = [
            { title: 'Unknown face detected', type: 'alert' },
            { title: 'Signal lost', type: 'alert' },
            { title: 'Signal restored', type: 'system' },
            { title: 'Motion detected', type: 'alert' },
            { title: 'Door locked', type: 'system' },
            { title: 'Scan approved', type: 'system' },
            { title: 'Link success', type: 'system' },
            { title: 'Sync complete', type: 'system' },
            { title: 'Access denied', type: 'alert' },
            { title: 'Key updated', type: 'system' },
            { title: 'Scan active', type: 'system' },
            { title: 'System ready', type: 'system' },
        ]

        let timeoutId

        const addLog = () => {
            const randomLog = logPool[Math.floor(Math.random() * logPool.length)]
            const newLog = {
                id: Date.now() + Math.random(), // Ensure unique ID
                time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                ...randomLog
            }

            setSecurityLogs(prev => [newLog, ...prev.slice(0, 8)]) // Keep 9 items max for density

            // Deep slowdown for high-end feel (10s to 30s range)
            const nextDelay = Math.floor(Math.random() * 20000) + 10000
            timeoutId = setTimeout(addLog, nextDelay)
        }

        addLog()

        return () => clearTimeout(timeoutId)
    }, [])

    const locations = ["All locations", "Living Room", "Front Door", "Backyard", "Garage"]
    const cameras = ["All cameras", "7368770-b53e-4b3b-9096-c81cbd852edb"]

    const navGroups = [
        {
            header: "Surveillance",
            items: [
                { icon: Cctv, label: "Security Cameras" },
                { icon: Radio, label: "Primus" },
                { icon: RfIcon, label: "Recorded Footage" }
            ]
        },
        {
            header: "Alerts & Log",
            items: [
                { icon: SaIcon, label: "Security Alerts" },
                { icon: FileText, label: "Alert Log" }
            ]
        },
        {
            header: "Access Control",
            items: [
                { icon: Key, label: "Manage Access" }
            ]
        },
        {
            header: "Teams",
            items: [
                { icon: Users, label: "User & Roles" }
            ]
        },
        {
            header: "Settings",
            items: [
                { icon: Settings, label: "System Settings" },
                { icon: DmIcon, label: "Device Management" }
            ]
        }
    ]

    const activeItem = navGroups.flatMap(group => group.items).find(item => item.label === activeTab)
    const ActiveIcon = activeItem?.icon

    return (
        <div className="w-full h-full flex bg-void text-[#F2F2F7] font-sans overflow-hidden">

            {/* KINETIC SIDEBAR */}
            <motion.nav
                onHoverStart={() => setSidebarHover(true)}
                onHoverEnd={() => setSidebarHover(false)}
                initial={{ width: 72 }}
                animate={{ width: sidebarHover ? 260 : 72 }}
                transition={{ type: "spring", stiffness: 120, damping: 24 }}
                className="h-full bg-[#050505] flex flex-col pt-8 pb-6 shrink-0 z-40 relative shadow-[2px_0_20px_rgba(0,0,0,0.5)] rounded-r-2xl"
            >
                {/* Custom Split-Level Border with Curve */}
                <div className="absolute top-20 right-0 bottom-0 left-0 border-r border-t border-white/[0.06] rounded-tr-[40px] pointer-events-none" />
                {/* Logo Area */}
                <div className={`pl-[24px] ${sidebarHover ? 'mb-28' : 'mb-28'} flex items-center gap-4 whitespace-nowrap min-w-[max-content] transition-all duration-300 z-50`}>
                    <img src={teletraanLogo} className="h-11 w-auto object-contain shrink-0 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" alt="Teletraan" />
                    <span className="text-[24px] font-bold tracking-[0.1em] uppercase text-[#F2F2F7] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                        Teletraan
                    </span>
                </div>

                {/* Nav Items Scroll Area */}
                <div className={`flex-1 overflow-y-auto overflow-x-hidden flex flex-col ${sidebarHover ? 'gap-6' : 'gap-4'} px-3 scrollbar-hide transition-all duration-300`}>
                    {navGroups.map((group, i) => (
                        <div key={i} className={`flex flex-col ${sidebarHover ? 'gap-1' : 'gap-2'}`}>
                            {/* Section Header */}
                            <motion.div
                                animate={{ opacity: sidebarHover ? 1 : 0, height: sidebarHover ? 'auto' : 0 }}
                                className="px-3 text-[13px] font-mono text-[#444] uppercase tracking-widest mb-1 whitespace-nowrap overflow-hidden"
                            >
                                {group.header}
                            </motion.div>

                            {/* Items */}
                            {group.items.map((item, j) => {
                                const isActive = activeTab === item.label
                                return (
                                    <div key={j} className="relative group/item">
                                        <div
                                            onClick={() => setActiveTab(item.label)}
                                            className={`
                                        relative flex items-center gap-4 px-3 py-3 rounded-[2px] cursor-pointer overflow-hidden transition-all duration-300 whitespace-nowrap
                                        ${isActive
                                                    ? 'bg-white/[0.08] text-white shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]'
                                                    : 'text-[#888] hover:text-[#F2F2F7] hover:bg-white/[0.05] border border-transparent hover:border-white/[0.1] hover:shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                                }
                                    `}>
                                            {/* Titanium Corner Brackets (Hover Only) */}
                                            {!isActive && (
                                                <>
                                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
                                                </>
                                            )}

                                            <item.icon size={24} strokeWidth={1.5} className={`shrink-0 z-10 transition-transform duration-300 group-hover/item:scale-110 
                                                ${item.label === 'Primus'
                                                    ? (systemStats.net > 0 ? '!text-[#00FF41] drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]' : '!text-[#FF3B30] drop-shadow-[0_0_15px_rgba(255,59,48,0.8)]')
                                                    : (isActive ? 'text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'group-hover/item:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]')}`} />

                                            <motion.span
                                                animate={{ opacity: sidebarHover ? 1 : 0, x: sidebarHover ? 0 : -10 }}
                                                className={`text-[16px] font-medium tracking-wide z-10 ${isActive ? 'font-semibold tracking-wider' : ''}`}
                                            >
                                                {item.label}
                                            </motion.span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ))}

                    {/* Primus Status - Now part of main nav flow */}
                    <div className="flex flex-col gap-1 px-3">
                        <div
                            className={`
                                relative flex items-center gap-4 px-3 py-2 rounded-[2px] transition-all duration-300 whitespace-nowrap overflow-hidden
                                ${sidebarHover && systemStats.net > 0
                                    ? 'bg-gradient-to-r from-[#00FF41]/[0.1] to-transparent border border-[#00FF41]/20 shadow-[inset_0_0_15px_rgba(0,255,65,0.05)]'
                                    : 'bg-white/[0.03] border border-transparent'}
                            `}
                        >
                            {/* Status Icon Area - ORBITAL DESIGN */}
                            <div className="relative flex items-center justify-center w-6 h-6 shrink-0 z-10">
                                {/* Orbital Ring 1 */}
                                <div className={`absolute inset-0 rounded-full border-[1.5px] ${sidebarHover
                                    ? (systemStats.net > 0 ? 'border-[#00FF41]/30 border-t-[#00FF41] animate-[spin_3s_linear_infinite]' : 'border-white/10 border-t-white/40 animate-[spin_6s_linear_infinite]')
                                    : 'border-white/10'}`} />

                                {/* Core Core */}
                                <div className={`w-1.5 h-1.5 rounded-full z-10 ${sidebarHover
                                    ? (systemStats.net > 0 ? 'bg-[#00FF41] shadow-[0_0_10px_#00FF41]' : 'bg-white/40')
                                    : 'bg-white/20'}`} />

                                {/* Signal Wave */}
                                {sidebarHover && systemStats.net > 0 && (
                                    <div className="absolute inset-[-2px] rounded-full border border-[#00FF41] opacity-0 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                                )}
                            </div>

                            {/* Text Content */}
                            <motion.div
                                animate={{ opacity: sidebarHover ? 1 : 0, x: sidebarHover ? 0 : -10 }}
                                className="flex flex-col items-start overflow-hidden z-10"
                            >
                                <span className={`text-[12px] font-black font-mono tracking-[0.1em] uppercase whitespace-nowrap leading-none mb-1 transition-colors ${systemStats.net > 0 ? 'text-[#00FF41]' : 'text-white/40'}`}>
                                    PRIMUS
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[9px] font-bold font-mono tracking-widest uppercase whitespace-nowrap leading-none ${systemStats.net > 0 ? 'text-white/60' : 'text-white/30'}`}>
                                        {systemStats.net > 0 ? 'CONNECTED' : 'OFFLINE'}
                                    </span>
                                </div>
                            </motion.div>

                            {/* Side Active Mark */}
                            {sidebarHover && systemStats.net > 0 && (
                                <div className="absolute left-0 top-1/4 bottom-1/4 w-[2px] bg-[#00FF41] shadow-[0_0_10px_#00FF41]" />
                            )}
                        </div>
                    </div>
                </div>

                {/* SYSTEM POWER CONTROLLER */}
                <div className="px-4 mt-4 mb-2 whitespace-nowrap overflow-hidden">
                    <div
                        onClick={() => setIsLogoutModalOpen(true)}
                        onMouseEnter={() => setLogoutHover(true)}
                        onMouseLeave={() => setLogoutHover(false)}
                        onMouseMove={handleMouseMove}
                        className="group relative flex items-center h-11 bg-red-500/[0.03] border border-red-500/10 hover:border-red-500/40 rounded-[2px] cursor-pointer transition-all duration-500 overflow-hidden"
                    >
                        {/* Internal Glow Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        {/* Tactical Corner (Active State) */}
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-red-500/20 group-hover:border-red-500/60 transition-colors" />

                        {/* Power Icon Container */}
                        <div className="relative flex items-center justify-center w-12 h-full shrink-0">
                            <div className="absolute inset-0 bg-red-500/5 group-hover:bg-red-500/20 transition-colors duration-500" />
                            <Power
                                size={20}
                                strokeWidth={2.5}
                                className="text-red-500/60 group-hover:text-red-500 transition-all duration-500 group-hover:scale-110 drop-shadow-[0_0_10px_#ef444466]"
                            />
                            {/* Pulse Core */}
                            <div className="absolute w-1 h-1 bg-red-500 rounded-full animate-pulse blur-[1px] opacity-40 group-hover:opacity-100" />
                        </div>

                        {/* Label */}
                        <motion.div
                            animate={{ opacity: sidebarHover ? 1 : 0, x: sidebarHover ? 0 : -10 }}
                            className="flex flex-col ml-3 pointer-events-none"
                        >
                            <span className="text-[14px] font-black text-white/40 group-hover:text-white tracking-[0.2em] uppercase transition-colors">
                                Power
                            </span>
                        </motion.div>

                        {/* Hover Overlay Scanline */}
                        <motion.div
                            animate={{ x: ['100%', '-200%'] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"
                        />
                    </div>

                    <AnimatePresence>
                        {logoutHover && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                style={{
                                    position: 'fixed',
                                    left: mousePos.x + 12,
                                    top: mousePos.y + 12,
                                    zIndex: 9999,
                                    pointerEvents: 'none'
                                }}
                                className="px-3 py-0.5 bg-[#050505] border border-white/10 rounded-[2px] backdrop-blur-md"
                            >
                                <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#F2F2F7]/60">Ctrl + L</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col relative h-full bg-void">
                {/* Header */}
                <header className="h-24 w-full border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-md shrink-0 z-20 electron-draggable relative">

                    {/* ALIGNMENT LAYER: Mimics Main Grid to Center Title over Matrix */}
                    <div className="absolute inset-0 px-6 grid grid-cols-[1fr_260px] gap-6 pointer-events-none">
                        <div className="flex items-center justify-center">
                            <div className="flex items-center gap-4 select-none">
                                {ActiveIcon && (
                                    <ActiveIcon
                                        size={28}
                                        className={`${(activeTab === 'Primus' || systemStats.net === 0)
                                            ? (systemStats.net > 0 ? 'text-[#00FF41] drop-shadow-[0_0_12px_rgba(0,255,65,0.4)]' : 'text-[#FF3B30] drop-shadow-[0_0_12px_rgba(255,59,48,0.4)]')
                                            : 'text-[#F2F2F7] drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]'} transition-all duration-300`}
                                    />
                                )}
                                <span className={`text-[24px] font-bold tracking-[0.15em] uppercase transition-colors duration-500 ${systemStats.net === 0 ? 'text-[#FF3B30] drop-shadow-[0_0_15px_rgba(255,59,48,0.3)]' : 'text-[#F2F2F7] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]'}`}>
                                    {systemStats.net > 0 ? activeTab : 'OFFLINE'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* ACTIONS LAYER */}
                    <div className="absolute right-6 top-0 bottom-0 flex items-center gap-6 no-drag">
                        {/* Search Bar */}

                        {/* Clock removed from here */}

                        {/* Divider */}
                        <div className="h-8 w-[1px] bg-white/[0.1]" />

                        {/* Messages */}
                        <div
                            className="h-full px-4 flex items-center gap-2 border-r border-white/[0.1] cursor-pointer group hover:bg-white/[0.03] transition-colors"
                            onClick={() => setIsMessagesOpen(true)}
                        >
                            <div className="relative">
                                <MessageSquareMore size={24} className="text-[#888] group-hover:text-[#F2F2F7] transition-all group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]" strokeWidth={1.5} />
                                <div className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] rounded-full bg-[#F2F2F7] flex items-center justify-center px-0.5">
                                    <span className="text-[10px] font-bold text-black leading-none">3</span>
                                </div>
                            </div>
                            <span className="text-[16px] font-medium text-[#F2F2F7] w-0 overflow-hidden group-hover:w-[85px] opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                                Messages
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="h-8 w-[1px] bg-white/[0.1]" />

                        {/* Profile */}
                        <div
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => setIsProfileOpen(true)}
                        >
                            <div className="w-7 h-7 rounded-full bg-[#111] border border-white/10 flex items-center justify-center overflow-hidden group-hover:border-[#F2F2F7] transition-all">
                                <img
                                    src={zenthosImg}
                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                    alt="Profile"
                                />
                            </div>
                            <span className="text-[16px] text-[#888] font-medium group-hover:text-[#F2F2F7] transition-colors">
                                My Profile
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="h-8 w-[1px] bg-white/[0.1]" />

                        {/* SYSTEM TELEMETRY - TACTICAL ARRAY V2 */}
                        <div className="flex items-center gap-2 px-1.5 h-10 bg-white/[0.03] border border-white/[0.08] rounded-[4px] backdrop-blur-xl shadow-2xl mr-2">
                            <div
                                onClick={() => window.api?.toggleNetwork?.()}
                                onMouseEnter={() => setNetHover(true)}
                                onMouseLeave={() => setNetHover(false)}
                                onMouseMove={handleMouseMove}
                                className="flex items-center justify-center w-9 h-8 rounded-[2px] hover:bg-white/[0.05] transition-all duration-300 group/net cursor-pointer"
                            >
                                <div className="relative">
                                    <Wifi
                                        size={16}
                                        className={`${systemStats.net > 0 ? 'text-[#00FF41]' : 'text-[#FF3B30] animate-pulse'} transition-colors duration-500`}
                                        strokeWidth={2.5}
                                    />
                                    {systemStats.net > 0 && (
                                        <div className="absolute inset-0 bg-[#00FF41] opacity-20 blur-md rounded-full animate-pulse group-hover/net:opacity-40" />
                                    )}
                                </div>
                            </div>

                            {/* Inner Vertical Divider */}
                            <div className="w-[1px] h-4 bg-white/10" />

                            {/* Power Node (Battery) */}
                            <div
                                className="flex items-center gap-2 px-3 h-8 rounded-[2px] hover:bg-white/[0.05] transition-all duration-300 group/pwr cursor-pointer"
                            >
                                <div className="relative flex items-center justify-center">
                                    <BatteryMedium
                                        size={18}
                                        className={`${systemStats.battery > 20 ? 'text-white/60 group-hover/pwr:text-white' : 'text-[#FF3B30] animate-pulse'} transition-colors duration-300`}
                                        strokeWidth={2}
                                    />
                                    <motion.div
                                        initial={false}
                                        animate={{ width: `${Math.max(2, (systemStats.battery / 100) * 11)}px` }}
                                        transition={{ duration: 0.15, ease: "linear" }}
                                        className="absolute left-[3px] top-[6px] h-[6px] bg-white rounded-[1px] opacity-80"
                                    />
                                </div>
                                <span className="text-[12px] font-black text-white/40 group-hover/pwr:text-white/90 font-mono tracking-tighter tabular-nums transition-colors">
                                    {Math.floor(systemStats.battery)}%
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="h-8 w-[1px] bg-white/[0.1]" />

                        <WindowControls onReload={handleSoftReload} />

                        {/* Connection Label */}
                        <AnimatePresence>
                            {netHover && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                    style={{
                                        position: 'fixed',
                                        left: mousePos.x + 12,
                                        top: mousePos.y + 12,
                                        zIndex: 9999,
                                        pointerEvents: 'none'
                                    }}
                                    className="px-3 py-0.5 bg-[#050505] border border-white/10 rounded-[2px] backdrop-blur-md"
                                >
                                    <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#F2F2F7]/60">
                                        {systemStats.net > 0 ? 'Disconnect' : 'Connect'}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </header>

                {/* Toolbar / Action Bar */}
                <div className="h-16 w-full flex items-center justify-between px-6 shrink-0 z-10">
                    {/* Search - FUNCTIONAL & IMPRESSIVE */}
                    <div className="relative w-72 h-10 group z-50">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444] group-focus-within:text-[#F2F2F7] transition-colors pointer-events-none">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search System..."
                            className="w-full h-full pl-10 pr-4 bg-[#080808]/50 border border-white/[0.08] rounded-[4px] text-[14px] text-[#F2F2F7] placeholder-[#444] focus:outline-none focus:border-[#F2F2F7] focus:bg-[#0A0A0A] focus:shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all font-sans tracking-wide"
                        />
                        {/* Titanium Corners for Search */}
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors" />
                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors" />

                        {/* IMPRESSIVE SEARCH DROPDOWN */}
                        <AnimatePresence>
                            {searchQuery && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 right-0 mt-2 bg-[#050505]/95 backdrop-blur-xl border border-white/[0.1] rounded-[4px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden"
                                >
                                    <div className="px-3 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                                        <span className="text-[10px] font-bold text-[#666] tracking-widest uppercase">Best Matches</span>
                                    </div>
                                    <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                                        {[
                                            { type: 'Location', label: 'Living Room', icon: MapPin, action: () => { setActiveGridCamera('Living Room'); setIsCameraDetailOpen(true); setSearchQuery('') } },
                                            { type: 'Camera', label: 'Front Door', icon: Video, action: () => { setCurrentCamera('Front Door'); setSearchQuery('') } },
                                            { type: 'Camera', label: 'Backyard', icon: Video, action: () => { setCurrentCamera('Backyard'); setSearchQuery('') } },
                                            { type: 'System', label: 'Security Logs', icon: FileText, action: () => { setActiveTab('Alerts & Log'); setSearchQuery('') } },
                                            { type: 'Admin', label: 'My Profile', icon: Users, action: () => { setIsProfileOpen(true); setSearchQuery('') } }
                                        ].filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase())).map((item, i) => (
                                            <div
                                                key={i}
                                                onClick={item.action}
                                                className="px-4 py-3 flex items-center justify-between hover:bg-white/[0.06] cursor-pointer group border-b border-white/[0.02] last:border-0 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-[2px] bg-white/[0.05] flex items-center justify-center border border-white/10 group-hover:border-[#F2F2F7]/50 group-hover:bg-[#F2F2F7]/10 transition-all">
                                                        <item.icon size={14} className="text-[#888] group-hover:text-[#F2F2F7]" />
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-[14px] font-medium text-[#ccc] group-hover:text-white">{item.label}</span>
                                                        <span className="text-[10px] text-[#555] uppercase tracking-wider group-hover:text-[#888]">{item.type}</span>
                                                    </div>
                                                </div>
                                                <ArrowRight size={14} className="text-[#444] group-hover:text-[#F2F2F7] -translate-x-2 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all" />
                                            </div>
                                        ))}
                                        {['Living Room', 'Front Door', 'Backyard', 'Security Logs', 'My Profile'].filter(l => l.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                            <div className="p-6 flex flex-col items-center justify-center gap-2 opacity-50">
                                                <Search size={20} className="text-[#666]" />
                                                <span className="text-[12px] text-[#666] font-mono">NO RESULTS FOUND</span>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Filters & Actions */}
                    <div className="flex items-center gap-3">
                        <div className="relative" ref={locationRef}>
                            <button
                                onClick={() => {
                                    setIsLocationOpen(!isLocationOpen)
                                    setIsCameraOpen(false)
                                }}
                                className={`h-9 px-4 flex items-center gap-2 bg-[#080808] border rounded-[2px] transition-colors text-[15px] font-medium min-w-[140px] justify-between cursor-pointer
                                   ${isLocationOpen ? 'border-white/30 text-[#F2F2F7]' : 'border-white/[0.06] text-[#888] hover:bg-[#111] hover:text-[#F2F2F7]'}
                                `}
                            >
                                <span className="truncate max-w-[100px]">{currentLocation}</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`opacity-50 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                            </button>

                            {/* Location Modal Triggered */}
                        </div>

                        <div className="relative" ref={cameraRef}>
                            <button
                                onClick={() => {
                                    setIsCameraOpen(!isCameraOpen)
                                    setIsLocationOpen(false)
                                }}
                                className={`h-9 px-4 flex items-center gap-2 bg-[#080808] border rounded-[2px] transition-colors text-[15px] font-medium min-w-[140px] justify-between cursor-pointer
                                   ${isCameraOpen ? 'border-white/30 text-[#F2F2F7]' : 'border-white/[0.06] text-[#888] hover:bg-[#111] hover:text-[#F2F2F7]'}
                                `}
                            >
                                <span className="truncate max-w-[120px]">{currentCamera}</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`opacity-50 transition-transform ${isCameraOpen ? 'rotate-180' : ''}`}><path d="m6 9 6 6 6-6" /></svg>
                            </button>

                            {/* Camera Modal Triggered */}
                        </div>

                        <button
                            onClick={() => setIsSetupOpen(true)}
                            className="relative group h-9 px-6 border border-white overflow-hidden rounded-[2px] cursor-pointer flex items-center gap-2"
                        >
                            <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                            <div className="relative z-10 flex items-center gap-2">
                                <Plus size={14} strokeWidth={4} className="text-black group-hover:text-white transition-colors duration-300" />
                                <span className="text-[12px] font-mono font-bold tracking-wider uppercase text-black group-hover:text-white transition-colors duration-300">
                                    Add camera
                                </span>
                            </div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                        </button>
                    </div>
                </div>

                {/* CONTENT AREA: 80% Grid + 20% Intel */}
                <motion.div
                    key={refreshKey}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-1 p-6 overflow-hidden ${activeTab === 'Security Cameras' ? 'grid grid-cols-[1fr_260px] gap-6' : 'flex flex-col items-center justify-center'}`}
                >

                    {/* MAIN SURVEILLANCE GRID */}
                    {activeTab === 'Security Cameras' && (
                        <>
                            {/* VISUAL MATRIX (Magnetic Assembly) - BOLDER DESIGN */}
                            <div className="bg-black rounded-[4px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.9)] relative h-[calc(100%-80px)]">
                                {/* Top Highlight */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10 z-20 pointer-events-none" />

                                {(currentCamera !== 'All cameras' || currentLocation !== 'All locations') ? (
                                    // Single Camera / Location View - Unified Tactical Design
                                    <div className="relative w-full h-full bg-[#020202] p-2">
                                        {/* Background Tech Pattern */}
                                        <div className="absolute inset-0 opacity-[0.08]"
                                            style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                                        />

                                        <motion.div
                                            key={currentCamera !== 'All cameras' ? currentCamera : currentLocation}
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6 }}
                                            className="w-full h-full relative group"
                                        >
                                            <FeedCell
                                                label={cameraRegistry[currentCamera !== 'All cameras' ? currentCamera : currentLocation]?.label || (currentCamera !== 'All cameras' ? currentCamera : currentLocation)}
                                                offline={cameraRegistry[currentCamera !== 'All cameras' ? currentCamera : currentLocation]?.offline}
                                                alert={cameraRegistry[currentCamera !== 'All cameras' ? currentCamera : currentLocation]?.alert}
                                                systemNet={systemStats.net}
                                            />
                                        </motion.div>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full bg-[#020202] p-2">
                                        {/* Background Tech Pattern */}
                                        <div className="absolute inset-0 opacity-[0.08]"
                                            style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                                        />

                                        <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-2 relative z-10">
                                            {/* Top Left - Living Room */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.1 }}
                                                className="relative group cursor-pointer"
                                                onClick={() => { setActiveGridCamera('Living Room'); setIsCameraDetailOpen(true); }}
                                                style={{ display: (!searchQuery || 'Living Room'.toLowerCase().includes(searchQuery.toLowerCase())) ? 'block' : 'none' }}
                                            >
                                                <FeedCell label={cameraRegistry['Living Room'].label} offline={cameraRegistry['Living Room'].offline} systemNet={systemStats.net} />
                                                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-[2px] relative overflow-hidden group/btn">
                                                        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                                                        <Maximize size={10} className="text-white/70" />
                                                        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/90 uppercase relative z-10">Expand Feed</span>
                                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30" />
                                                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30" />
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Top Right - Front Door */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                                className="relative group cursor-pointer"
                                                onClick={() => { setActiveGridCamera('Front Door'); setIsCameraDetailOpen(true); }}
                                                style={{ display: (!searchQuery || 'Front Door'.toLowerCase().includes(searchQuery.toLowerCase())) ? 'block' : 'none' }}
                                            >
                                                <FeedCell label={cameraRegistry['Front Door'].label} alert={cameraRegistry['Front Door'].alert} systemNet={systemStats.net} />
                                                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-[2px] relative overflow-hidden group/btn">
                                                        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                                                        <Maximize size={10} className="text-white/70" />
                                                        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/90 uppercase relative z-10">Expand Feed</span>
                                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30" />
                                                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30" />
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Bottom Left - Backyard */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.3 }}
                                                className="relative group cursor-pointer"
                                                onClick={() => { setActiveGridCamera('Backyard'); setIsCameraDetailOpen(true); }}
                                                style={{ display: (!searchQuery || 'Backyard'.toLowerCase().includes(searchQuery.toLowerCase())) ? 'block' : 'none' }}
                                            >
                                                <FeedCell label={cameraRegistry['Backyard'].label} systemNet={systemStats.net} />
                                                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-[2px] relative overflow-hidden group/btn">
                                                        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                                                        <Maximize size={10} className="text-white/70" />
                                                        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/90 uppercase relative z-10">Expand Feed</span>
                                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30" />
                                                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30" />
                                                    </div>
                                                </div>
                                            </motion.div>

                                            {/* Bottom Right - Garage */}
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.98 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                                className="relative group cursor-pointer"
                                                onClick={() => { setActiveGridCamera('Garage'); setIsCameraDetailOpen(true); }}
                                                style={{ display: (!searchQuery || 'Garage'.toLowerCase().includes(searchQuery.toLowerCase())) ? 'block' : 'none' }}
                                            >
                                                <FeedCell
                                                    label={cameraRegistry['Garage'].label}
                                                    offline={cameraRegistry['Garage'].offline}
                                                    systemNet={systemStats.net}
                                                />
                                                <div className="absolute bottom-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-[2px] relative overflow-hidden group/btn">
                                                        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                                                        <Maximize size={10} className="text-white/70" />
                                                        <span className="text-[9px] font-mono font-bold tracking-[0.2em] text-white/90 uppercase relative z-10">Expand Feed</span>
                                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/30" />
                                                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/30" />
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </div>

                                        {/* Matrix Center focus crosshair */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 z-20 pointer-events-none flex items-center justify-center opacity-10">
                                            <div className="w-[2px] h-full bg-white/40" />
                                            <div className="absolute h-[2px] w-full bg-white/40" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* INTELLIGENCE (Slide In) */}
                            <motion.div
                                initial={{ x: 60, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, ease: "circOut", delay: 0.4 }}
                                className="flex flex-col gap-6 pt-0 h-[calc(100%-80px)] overflow-hidden relative"
                            >

                                {/* CLOCK & DATE - TACTICAL SYNC */}
                                <div className="flex flex-col gap-6 p-6 rounded-[4px] border border-white/[0.06] bg-[#050505] relative overflow-hidden shadow-2xl">
                                    <div className="flex flex-col gap-2 relative z-10 py-1">
                                        <div className="flex flex-col">
                                            <span className="text-[42px] font-bold text-white tracking-[-0.05em] font-mono leading-none">
                                                {time.split(' ')[1]}
                                            </span>
                                            <div className="flex items-center gap-3 mt-3">
                                                <div className="h-[1px] w-8 bg-white/20" />
                                                <span className="text-[14px] font-bold text-white/40 tracking-[0.3em] uppercase font-mono">
                                                    {time.split(' ')[0]}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-6 gap-1.5 mt-6">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                                                    <motion.div
                                                        animate={{ x: ["-100%", "100%"] }}
                                                        transition={{ duration: 4, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
                                                        className="h-full w-full bg-white/20"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Security Logs - CLEAN LIST DESIGN */}
                                {/* EVENT STREAM - TACTICAL SURVEILLANCE DESIGN */}
                                <div className="flex-1 flex flex-col overflow-hidden rounded-[4px] border border-white/10 shadow-2xl bg-[#030303] relative group">
                                    {/* Scanline Overlay */}
                                    <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                                    {/* Header */}
                                    <div className="h-12 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.03] shrink-0 z-30">
                                        <div className="flex items-center">
                                            <span className="text-[13px] font-black text-white/90 tracking-[0.2em] font-mono uppercase">SYSTEM LOGS</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 opacity-40">
                                            <div className="w-1 h-1 bg-white rounded-full" />
                                            <div className="w-1 h-1 bg-white rounded-full" />
                                            <div className="w-1 h-1 bg-white rounded-full" />
                                        </div>
                                    </div>

                                    {/* Tactical Corner Brackets */}
                                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/20 z-30" />
                                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/20 z-30" />
                                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/20 z-30" />
                                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/20 z-30" />

                                    {/* Event List */}
                                    <div className="flex-1 overflow-hidden p-1.5 relative z-10">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 pointer-events-none z-20" />
                                        <AnimatePresence initial={false}>
                                            {securityLogs.map((item) => (
                                                <motion.div
                                                    layout
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.1 } }}
                                                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                                                    key={item.id}
                                                    className="flex items-center justify-between px-4 py-2.5 rounded-[2px] mb-1 hover:bg-white/[0.04] transition-all cursor-crosshair group/item border-l-2 border-transparent hover:border-white/20"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col gap-0">
                                                            <span className="text-[13px] font-bold font-mono tracking-tight text-white/90">
                                                                {item.title}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="flex flex-col items-end gap-1.5 min-w-[70px]">
                                                        <span className="text-[12px] text-white/50 font-black font-mono tracking-tight tabular-nums group-hover/item:text-white/80 transition-colors">
                                                            {item.time}
                                                        </span>
                                                        <div className="flex gap-[2px] opacity-20">
                                                            <div className="w-[10px] h-[1.5px] bg-white" />
                                                            <div className={`w-[10px] h-[1.5px] ${item.type === 'alert' ? 'bg-white' : 'bg-white/20'}`} />
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>

                                    {/* Bottom Fade Mask */}
                                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black to-transparent pointer-events-none z-30" />
                                </div>
                            </motion.div>

                            {/* FLOATING PAGINATION BAR - BOLDER DESIGN */}
                            <motion.div
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.5 }}
                                className="absolute bottom-6 left-6 right-6 h-14 bg-black border border-white/20 rounded-[4px] flex items-center justify-between px-6 z-30 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                            >
                                {/* Top Highlight for defined edge */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/10" />

                                <span className="text-[13px] text-[#888] font-medium tracking-wide lowercase">
                                    organization cameras - page 1 of 1
                                </span>

                                <div className="flex items-center gap-1">
                                    <button className="h-9 px-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#666] hover:text-white transition-colors hover:bg-white/[0.05] rounded-[4px] disabled:opacity-30">
                                        <ChevronLeft size={14} /> Prev
                                    </button>

                                    <div className="h-4 w-[1px] bg-white/[0.1] mx-2" />

                                    <button className="w-9 h-9 flex items-center justify-center text-[13px] font-bold bg-[#F2F2F7] text-black rounded-[4px] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:scale-105 transition-transform">
                                        1
                                    </button>

                                    <div className="h-4 w-[1px] bg-white/[0.1] mx-2" />

                                    <button className="h-9 px-4 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#666] hover:text-white transition-colors hover:bg-white/[0.05] rounded-[4px]">
                                        Next <ChevronRight size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}

                    {/* PRIMUS VIEW (Empty State) */}
                    {activeTab === 'Primus' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-col items-center justify-center text-center max-w-lg"
                        >
                            <img src={secCamSvg} className="w-[320px] mb-6 opacity-60 invert select-none pointer-events-none" alt="Camera Setup" />
                            <h2 className="text-[24px] text-[#F2F2F7] font-medium mb-3 tracking-wide">No Camera connected yet.</h2>
                            <p className="text-[#888] text-[15px] mb-10 leading-relaxed font-light">
                                {systemStats.net > 0
                                    ? "Let's set up your first camera for live monitoring"
                                    : "Hardware link lost. Please restore connectivity to provision new devices."}
                            </p>
                            <button
                                onClick={() => {
                                    if (systemStats.net > 0) {
                                        setIsPrimusConnectOpen(true)
                                        setPrimusConnectStep(1)
                                    }
                                }}
                                disabled={systemStats.net === 0}
                                className={`relative group px-8 py-3 bg-transparent border overflow-hidden rounded-[2px] flex items-center gap-4 transition-all duration-500 
                                    ${systemStats.net > 0
                                        ? 'border-white cursor-pointer'
                                        : 'border-white/10 cursor-not-allowed'}`}
                            >
                                {/* Solid White Sliding Background - Only active if online */}
                                {systemStats.net > 0 && (
                                    <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                )}

                                {/* Content Layer */}
                                <div className="relative z-10 flex items-center gap-3">
                                    <span className={`text-[14px] font-mono font-bold tracking-[0.2em] uppercase transition-colors duration-300 
                                        ${systemStats.net > 0 ? 'text-black group-hover:text-white' : 'text-white/20'}`}>
                                        {systemStats.net > 0 ? 'Connect' : 'System Offline'}
                                    </span>
                                    <ArrowRight size={18} className={`transition-all duration-300 
                                        ${systemStats.net > 0 ? 'text-black group-hover:text-white group-hover:translate-x-1' : 'text-white/10'}`} />
                                </div>

                                {/* Tactical Corners */}
                                {systemStats.net > 0 && (
                                    <>
                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                    </>
                                )}
                            </button>
                        </motion.div>
                    )}

                    {/* COMING SOON VIEW - TACTICAL INDUSTRIAL DESIGN */}
                    {!['Security Cameras', 'Primus'].includes(activeTab) && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center text-center max-w-2xl relative"
                        >
                            {/* Background Atmosphere */}
                            <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-[0.03]">
                                <img src={teletraanLogo} className="w-[500px] grayscale invert animate-pulse duration-[5s]" alt="" />
                            </div>

                            {/* Scanline / HUD Effect */}
                            <div className="w-16 h-1 bg-white/20 rounded-full mb-8 relative overflow-hidden">
                                <motion.div
                                    animate={{ x: [-64, 64] }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 bg-white/80 blur-[2px]"
                                />
                            </div>

                            <div className="relative mb-10">
                                <motion.div
                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute -inset-10 bg-white/5 blur-[60px] rounded-full"
                                />
                                <div className="relative px-8 py-3 border border-white/20 bg-black/40 backdrop-blur-md rounded-[2px] shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                    <span className="text-[11px] font-mono font-bold tracking-[0.4em] uppercase text-white/40 mb-2 block">Restricted Access</span>
                                    <h1 className="text-[42px] font-black text-white tracking-[0.3em] uppercase mb-1 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                                        Coming Soon
                                    </h1>
                                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                </div>

                                {/* Industrial Corners */}
                                <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-white/20" />
                                <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-white/20" />
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                <p className="text-[#888] text-[18px] leading-relaxed max-w-xl font-mono font-bold tracking-[0.15em]">
                                    This interface is currently undergoing development.
                                </p>
                            </div>

                        </motion.div>
                    )}
                </motion.div>

                {/* PRIMUS CONNECT MODAL - CLEAN GRID DESIGN */}
                <AnimatePresence>
                    {isPrimusConnectOpen && (
                        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 font-sans">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsPrimusConnectOpen(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="w-full max-w-xl bg-[#09090b] border border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl relative overflow-hidden flex flex-col"
                            >
                                {/* Header with Close Button */}
                                <div className="h-16 border-b border-white/[0.06] flex items-center justify-between px-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41]" />
                                        <span className="text-white text-[15px] font-medium tracking-wide">Connect Primus</span>
                                    </div>
                                    <button
                                        onClick={() => setIsPrimusConnectOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={20} className="group-hover:scale-110 transition-transform" />
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-8">
                                    {/* Step 1: Welcome Modal */}
                                    {primusConnectStep === 1 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex flex-col items-center py-10 px-4 text-center"
                                        >
                                            <div className="w-20 h-20 mb-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center relative">
                                                <Wrench size={32} className="text-white" />
                                                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center text-black">
                                                    <Settings size={16} strokeWidth={2.5} />
                                                </div>
                                            </div>
                                            <h2 className="text-[24px] font-bold text-white mb-4">Welcome to Teletraan</h2>
                                            <p className="text-[#888] text-[15px] leading-relaxed max-w-sm mb-10">
                                                Before you can start using Teletraan, you need to connect your Primus device. This powers your security alerts, video intelligence, and everything else.
                                            </p>
                                            <button
                                                onClick={() => {
                                                    setPrimusConnectStep(2)
                                                    // Auto-transition to Form after loader
                                                    setTimeout(() => {
                                                        setPrimusConnectStep(3)
                                                    }, 2500)
                                                }}
                                                className="relative group px-8 py-3.5 border border-white overflow-hidden rounded-[2px] cursor-pointer"
                                            >
                                                <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                                <span className="relative z-10 text-[14px] font-mono font-bold tracking-[0.2em] uppercase text-black group-hover:text-white transition-colors duration-300">
                                                    Connect Primus
                                                </span>
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                            </button>
                                        </motion.div>
                                    )}

                                    {/* Step 2: Establishing Link (Loader) */}
                                    {primusConnectStep === 2 && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="flex flex-col items-center py-12"
                                        >
                                            <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                                                <div className="absolute inset-0 border-t-2 border-white rounded-full animate-spin" />
                                                <div className="absolute inset-2 border-r-2 border-white/20 rounded-full animate-spin [animation-direction:reverse]" />
                                                <Loader2 size={32} className="text-white animate-spin" />
                                            </div>
                                            <h3 className="text-[16px] font-medium text-white tracking-wide mb-2">Connecting...</h3>
                                            <p className="text-[#666] text-[14px]">Establishing secure connection to device</p>
                                        </motion.div>
                                    )}

                                    {/* Step 3: Configuration Form */}
                                    {primusConnectStep === 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="w-full text-left"
                                        >
                                            <div className="mb-8">
                                                <h2 className="text-[20px] font-medium text-white mb-1">Configure Device</h2>
                                                <p className="text-[#666] text-[14px]">Enter the details for your new Primus unit.</p>
                                            </div>

                                            <div className="flex flex-col gap-5">
                                                {/* Site */}
                                                <div className="group">
                                                    <label className="block text-[13px] text-[#888] mb-2 font-medium">Site Reference</label>
                                                    <input
                                                        type="text"
                                                        value={primusForm.site}
                                                        onChange={(e) => setPrimusForm({ ...primusForm, site: e.target.value })}
                                                        placeholder="e.g. Main HQ"
                                                        className="w-full h-11 bg-[#111] border border-white/[0.08] focus:border-white/30 rounded-lg px-4 text-[14px] text-white placeholder-[#333] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                {/* Label */}
                                                <div className="group">
                                                    <label className="block text-[13px] text-[#888] mb-2 font-medium">Device Label</label>
                                                    <input
                                                        type="text"
                                                        value={primusForm.label}
                                                        onChange={(e) => setPrimusForm({ ...primusForm, label: e.target.value })}
                                                        placeholder="e.g. Camera-01"
                                                        className="w-full h-11 bg-[#111] border border-white/[0.08] focus:border-white/30 rounded-lg px-4 text-[14px] text-white placeholder-[#333] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                {/* Location */}
                                                <div className="group">
                                                    <label className="block text-[13px] text-[#888] mb-2 font-medium">Location</label>
                                                    <input
                                                        type="text"
                                                        value={primusForm.location}
                                                        onChange={(e) => setPrimusForm({ ...primusForm, location: e.target.value })}
                                                        placeholder="e.g. North Hallway"
                                                        className="w-full h-11 bg-[#111] border border-white/[0.08] focus:border-white/30 rounded-lg px-4 text-[14px] text-white placeholder-[#333] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                {/* Description */}
                                                <div className="group">
                                                    <label className="block text-[13px] text-[#888] mb-2 font-medium">Description <span className="opacity-50 font-normal">(Optional)</span></label>
                                                    <input
                                                        type="text"
                                                        value={primusForm.description}
                                                        onChange={(e) => setPrimusForm({ ...primusForm, description: e.target.value })}
                                                        placeholder="e.g. Monitoring main entrance"
                                                        className="w-full h-11 bg-[#111] border border-white/[0.08] focus:border-white/30 rounded-lg px-4 text-[14px] text-white placeholder-[#333] focus:outline-none transition-all"
                                                    />
                                                </div>

                                                <div className="mt-4 pt-6">
                                                    <button
                                                        onClick={() => setPrimusConnectStep(4)}
                                                        className="w-full h-12 relative group border border-white overflow-hidden rounded-[2px] cursor-pointer flex items-center justify-center"
                                                    >
                                                        <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                                        <div className="relative z-10 flex items-center gap-3">
                                                            <span className="text-[14px] font-mono font-bold tracking-[0.2em] uppercase text-black group-hover:text-white transition-colors duration-300">
                                                                Connect
                                                            </span>
                                                            <ArrowRight size={18} className="text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                                        </div>
                                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Step 4: Success */}
                                    {primusConnectStep === 4 && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="flex flex-col items-center py-10"
                                        >
                                            <div className="w-20 h-20 mb-6 rounded-full bg-[#00FF41]/10 border border-[#00FF41]/20 flex items-center justify-center">
                                                <Users size={32} className="text-[#00FF41]" />
                                            </div>
                                            <h2 className="text-[22px] font-bold text-white mb-2">Connected</h2>
                                            <p className="text-[#888] text-[15px] mb-8 text-center max-w-xs leading-relaxed">
                                                Primus is now active and successfully monitoring the grid.
                                            </p>
                                            <button
                                                onClick={() => setIsPrimusConnectOpen(false)}
                                                className="relative group w-full max-w-[200px] h-11 border border-white overflow-hidden rounded-[2px] cursor-pointer flex items-center justify-center"
                                            >
                                                <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                                <span className="relative z-10 text-[14px] font-mono font-bold tracking-[0.2em] uppercase text-black group-hover:text-white transition-colors duration-300">
                                                    Continue
                                                </span>
                                                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                            </button>
                                        </motion.div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
                {/* PROFILE MODAL */}
                <AnimatePresence>
                    {isProfileOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsProfileOpen(false)}
                                className="absolute inset-0 bg-black/20 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                onClick={() => setActiveEditField(null)}
                                className="w-full max-w-4xl bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.08] shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
                            >
                                {/* Titanium Gradient Light Effect */}
                                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent opacity-70 shadow-[0_0_15px_#00FF41]" />

                                {/* Header */}
                                <div className="px-10 py-8 flex items-center justify-between border-b border-white/[0.06] bg-white/[0.01]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-6 bg-[#00FF41] rounded-full shadow-[0_0_15px_#00FF41]" />
                                        <div className="flex flex-col justify-center">
                                            <h2 className="text-[24px] font-bold text-[#F2F2F7] tracking-[0.15em] uppercase leading-none">Identity Profile</h2>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsProfileOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={20} className="group-hover:scale-110 transition-transform" />
                                            {/* Tactical Corners */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                {/* Content */}
                                <div className="p-10 overflow-y-auto custom-scrollbar flex-1 flex flex-col gap-10">

                                    {/* Top Section: Avatar & BADGE */}
                                    <div className="flex items-center gap-10">
                                        {/* Avatar */}
                                        <div className="relative group cursor-pointer shrink-0">
                                            <div className="w-40 h-40 rounded-full border-[3px] border-white/10 p-1.5 group-hover:border-[#00FF41]/50 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                                                <div className="w-full h-full rounded-full bg-[#111] overflow-hidden relative">
                                                    {userProfile.image ? (
                                                        <img src={userProfile.image} className="w-full h-full object-cover" alt="Profile" />
                                                    ) : (
                                                        <Users size={48} className="text-[#333]" />
                                                    )}
                                                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                                                        <RefreshCw size={24} className="text-[#00FF41] mb-2" />
                                                        <span className="text-[10px] font-bold text-[#F2F2F7] uppercase tracking-widest">Update</span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* Status Dot */}
                                            <div className="absolute bottom-3 right-3 w-6 h-6 bg-[#00FF41] rounded-full border-[4px] border-[#080808] shadow-[0_0_15px_#00FF41]" />
                                        </div>

                                        {/* Identity Info */}
                                        <div className="flex-1 space-y-2">
                                            <h3 className="text-4xl font-bold text-[#F2F2F7] tracking-[0.05em] uppercase">{userProfile.name}</h3>
                                            <div className="flex items-center gap-4">
                                                <span className="px-3 py-1 bg-[#00FF41]/10 border border-[#00FF41]/30 rounded text-[#00FF41] text-xs font-bold tracking-widest uppercase">
                                                    Commander
                                                </span>

                                            </div>
                                            <p className="text-[#888] text-sm leading-relaxed max-w-lg pt-2">
                                                Primary system administrator with full clearance access to all surveillance grids, Primus core, and device management protocols.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Form Grid */}
                                    <div className="grid grid-cols-2 gap-x-12 gap-y-8">
                                        {/* Name */}
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[11px] text-[#888] font-bold tracking-[0.2em] uppercase pl-1">Name</label>
                                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="text"
                                                    value={userProfile.name}
                                                    readOnly={activeEditField !== 'name'}
                                                    ref={nameInputRef}
                                                    onChange={e => setUserProfile({ ...userProfile, name: e.target.value })}
                                                    className={`w-full h-14 bg-white/[0.03] border rounded-[2px] px-5 text-[15px] font-medium tracking-wide focus:outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]
                                                        ${activeEditField === 'name'
                                                            ? 'border-[#F2F2F7] text-white bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.01]'
                                                            : 'border-white/[0.08] text-[#888] hover:border-white/20'}
                                                    `}
                                                />
                                                {/* Corners */}
                                                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-white/40" />
                                                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-white/40" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setActiveEditField(activeEditField === 'name' ? null : 'name')
                                                    }}
                                                    className={`absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors border-l border-white/[0.05] hover:bg-white/[0.05] cursor-pointer
                                                        ${activeEditField === 'name' ? 'text-[#F2F2F7]' : 'text-[#444] hover:text-[#F2F2F7]'}
                                                    `}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[11px] text-[#888] font-bold tracking-[0.2em] uppercase pl-1">Email</label>
                                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="email"
                                                    value={userProfile.email}
                                                    readOnly={activeEditField !== 'email'}
                                                    ref={emailInputRef}
                                                    onChange={e => setUserProfile({ ...userProfile, email: e.target.value })}
                                                    className={`w-full h-14 bg-white/[0.03] border rounded-[2px] px-5 text-[15px] font-medium tracking-wide focus:outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]
                                                        ${activeEditField === 'email'
                                                            ? 'border-[#F2F2F7] text-white bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.01]'
                                                            : 'border-white/[0.08] text-[#888] hover:border-white/20'}
                                                    `}
                                                />
                                                {/* Corners */}
                                                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-white/40" />
                                                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-white/40" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setActiveEditField(activeEditField === 'email' ? null : 'email')
                                                    }}
                                                    className={`absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors border-l border-white/[0.05] hover:bg-white/[0.05] cursor-pointer
                                                        ${activeEditField === 'email' ? 'text-[#F2F2F7]' : 'text-[#444] hover:text-[#F2F2F7]'}
                                                    `}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Password */}
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[11px] text-[#888] font-bold tracking-[0.2em] uppercase pl-1">Security Key</label>
                                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="password"
                                                    value={userProfile.securityKey || '............'}
                                                    placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                                                    readOnly={activeEditField !== 'securityKey'}
                                                    ref={securityKeyInputRef}
                                                    onChange={e => setUserProfile({ ...userProfile, securityKey: e.target.value })}
                                                    className={`w-full h-14 bg-white/[0.03] border rounded-[2px] pl-5 pr-32 text-2xl font-bold tracking-widest focus:outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]
                                                        ${activeEditField === 'securityKey'
                                                            ? 'border-[#00FF41] text-white bg-[#00FF41]/[0.05] shadow-[0_0_20px_rgba(0,255,65,0.25)] scale-[1.01]'
                                                            : 'border-white/[0.08] text-[#F2F2F7] group-hover:border-[#00FF41]/50'}
                                                    `}
                                                />
                                                {/* Corners */}
                                                <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/10 group-hover:border-[#00FF41]/30" />
                                                <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/10 group-hover:border-[#00FF41]/30" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setActiveEditField(activeEditField === 'securityKey' ? null : 'securityKey')
                                                    }}
                                                    className={`absolute right-3 top-1/2 -translate-y-1/2 px-4 py-2 border rounded-[2px] text-[10px] font-bold tracking-[0.15em] transition-all duration-300
                                                        ${activeEditField === 'securityKey'
                                                            ? 'bg-[#00FF41]/10 border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41]/20'
                                                            : 'bg-white/[0.02] border-white/[0.1] text-[#666] hover:text-[#F2F2F7] hover:border-white/[0.2] hover:bg-white/[0.05]'}
                                                    `}
                                                >
                                                    {activeEditField === 'securityKey' ? 'SAVE KEY' : 'REKEY NODE'}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="flex flex-col gap-3">
                                            <label className="text-[11px] text-[#888] font-bold tracking-[0.2em] uppercase pl-1">Contact</label>
                                            <div className="relative group" onClick={(e) => e.stopPropagation()}>
                                                <input
                                                    type="text"
                                                    placeholder=""
                                                    value={userProfile.phone}
                                                    readOnly={activeEditField !== 'phone'}
                                                    ref={phoneInputRef}
                                                    onChange={e => setUserProfile({ ...userProfile, phone: e.target.value })}
                                                    className={`w-full h-14 bg-white/[0.03] border rounded-[2px] px-5 text-[15px] font-medium tracking-wide focus:outline-none transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]
                                                        ${activeEditField === 'phone'
                                                            ? 'border-[#F2F2F7] text-white bg-white/[0.08] shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.01]'
                                                            : 'border-white/[0.08] text-[#888] hover:border-white/20'}
                                                    `}
                                                />
                                                {/* Corners */}
                                                <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-white/40" />
                                                <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-white/40" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        setActiveEditField(activeEditField === 'phone' ? null : 'phone')
                                                    }}
                                                    className={`absolute right-0 top-0 bottom-0 w-12 flex items-center justify-center transition-colors border-l border-white/[0.05] hover:bg-white/[0.05] cursor-pointer
                                                        ${activeEditField === 'phone' ? 'text-[#F2F2F7]' : 'text-[#444] hover:text-[#F2F2F7]'}
                                                    `}
                                                >
                                                    <Edit2 size={18} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Action Footer */}
                                <div className="px-10 py-6 border-t border-white/[0.06] bg-[#020202]/50 backdrop-blur-md flex justify-end">
                                    <button
                                        onClick={() => setIsLogoutModalOpen(true)}
                                        className="group relative px-8 py-3 bg-[#C43E3E]/5 hover:bg-[#C43E3E] border border-[#C43E3E]/20 hover:border-[#C43E3E] rounded-[6px] transition-all duration-300 overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_5px,rgba(0,0,0,0.1)_5px,rgba(0,0,0,0.1)_10px)] opacity-50" />
                                        <div className="flex items-center gap-3 relative z-10">
                                            <LogOut size={16} className="text-[#C43E3E] group-hover:text-white transition-colors" />
                                            <span className="text-[12px] font-bold text-[#C43E3E] group-hover:text-white tracking-[0.2em] uppercase transition-colors">Terminate Session</span>
                                        </div>
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* LOCATION SELECTION MODAL */}
                <AnimatePresence>
                    {isLocationOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsLocationOpen(false)}
                                className="absolute inset-0 bg-black/40 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-4xl bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.08] shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-2xl overflow-hidden relative z-10 flex flex-col"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2F2F7] to-transparent opacity-20" />

                                <div className="px-8 py-6 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.01]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-[#00FF41] rounded-full shadow-[0_0_15px_#00FF41]" />
                                        <h2 className="text-[20px] font-bold text-[#F2F2F7] tracking-[0.2em] uppercase">Select Sector</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsLocationOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={20} className="group-hover:scale-110 transition-transform" />
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {locations.map((loc) => {
                                        const Icon = loc === 'Living Room' ? Sofa
                                            : loc === 'Front Door' ? DoorOpen
                                                : loc === 'Backyard' ? TreePine
                                                    : loc === 'Garage' ? Car
                                                        : loc === 'Kitchen' ? Utensils
                                                            : MapPin

                                        return (
                                            <button
                                                key={loc}
                                                onClick={() => {
                                                    setCurrentLocation(loc)
                                                    setIsLocationOpen(false)
                                                    if (loc !== 'All locations') {
                                                        setCurrentCamera('All cameras')
                                                    }
                                                }}
                                                className={`relative group w-full aspect-video bg-[#0A0A0A] border border-white/[0.08] hover:border-[#F2F2F7]/50 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                                                ${currentLocation === loc ? 'border-[#F2F2F7] shadow-[0_0_20px_rgba(255,255,255,0.05)]' : ''}
                                            `}
                                            >
                                                {/* Tech Grid Background */}
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                                                <div className={`relative z-10 p-4 border border-white/10 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:border-[#F2F2F7]/30
                                                ${currentLocation === loc ? 'bg-[#F2F2F7] text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/[0.03] text-[#666] group-hover:text-[#F2F2F7]'}
                                            `}>
                                                    <Icon size={24} strokeWidth={1.5} />
                                                </div>

                                                {/* Label Reveal */}
                                                <div className="absolute bottom-4 opacity-100 transition-all duration-300 transform translate-y-0">
                                                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#F2F2F7] uppercase bg-black/80 px-3 py-1 border border-white/10 rounded-[2px] backdrop-blur-md">
                                                        {loc}
                                                    </span>
                                                </div>

                                            </button>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* CAMERA SELECTION MODAL */}
                <AnimatePresence>
                    {isCameraOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsCameraOpen(false)}
                                className="absolute inset-0 bg-black/40 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-4xl bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.08] shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-2xl overflow-hidden relative z-10 flex flex-col"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2F2F7] to-transparent opacity-20" />

                                <div className="px-8 py-6 border-b border-white/[0.06] flex justify-between items-center bg-white/[0.01]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1.5 h-6 bg-[#00FF41] rounded-full shadow-[0_0_15px_#00FF41]" />
                                        <h2 className="text-[20px] font-bold text-[#F2F2F7] tracking-[0.2em] uppercase">Select Feed</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsCameraOpen(false)}
                                        className="w-10 h-10 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={20} className="group-hover:scale-110 transition-transform" />
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6">
                                    {cameras.map((cam) => (
                                        <button
                                            key={cam}
                                            onClick={() => {
                                                setCurrentCamera(cam)
                                                setIsCameraOpen(false)
                                                if (cam !== 'All cameras') setCurrentLocation('All locations')
                                            }}
                                            className={`relative group w-full aspect-video bg-[#0A0A0A] border border-white/[0.08] hover:border-[#F2F2F7]/50 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden
                                                ${currentCamera === cam ? 'border-[#F2F2F7] shadow-[0_0_20px_rgba(255,255,255,0.05)]' : ''}
                                            `}
                                        >
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                                            <div className={`relative z-10 p-4 border border-white/10 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:border-[#F2F2F7]/30
                                                ${currentCamera === cam ? 'bg-[#F2F2F7] text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/[0.03] text-[#666] group-hover:text-[#F2F2F7]'}
                                            `}>
                                                {cam === 'All cameras' ? (
                                                    <Video size={24} />
                                                ) : (
                                                    <div className="relative w-6 h-6 flex items-center justify-center">
                                                        {/* Rotating Focus Ring */}
                                                        <div className="absolute inset-[-6px] border border-current rounded-full opacity-20 border-t-transparent border-l-transparent animate-[spin_4s_linear_infinite]" />
                                                        <div className="absolute inset-[-6px] border border-current rounded-full opacity-10 border-b-transparent border-r-transparent animate-[spin_4s_linear_infinite_reverse]" />

                                                        {/* Lens Assembly SVG */}
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full relative z-10">
                                                            <circle cx="12" cy="12" r="10" strokeOpacity="0.5" />
                                                            <circle cx="12" cy="12" r="4" />
                                                            <path d="M12 2v2" />
                                                            <path d="M12 20v2" />
                                                            <path d="M2 12h2" />
                                                            <path d="M20 12h2" />
                                                            <path d="M7 7l1.5 1.5" />
                                                            <path d="M17 7l-1.5 1.5" />
                                                            <path d="M7 17l1.5-1.5" />
                                                            <path d="M17 17l-1.5-1.5" />
                                                        </svg>

                                                        {/* Central Sensor Glow */}
                                                        <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-20 rounded-full blur-md transition-opacity duration-500" />
                                                        <div className="absolute w-1.5 h-1.5 bg-current rounded-full" />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="absolute bottom-4 opacity-100 transition-all duration-300 transform translate-y-0">
                                                <span className="text-[10px] font-bold tracking-[0.2em] text-[#F2F2F7] uppercase bg-black/80 px-3 py-1 border border-white/10 rounded-[2px] backdrop-blur-md">
                                                    {cam}
                                                </span>
                                            </div>

                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* LOGOUT CONFIRMATION MODAL */}
                <AnimatePresence>
                    {isLogoutModalOpen && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 font-sans">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                className="w-full max-w-md bg-[#09090b] border border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-2xl relative overflow-hidden flex flex-col items-center text-center p-8"
                            >
                                <h2 className="text-[18px] font-medium text-white mb-2">Are you sure you want to Log Out?</h2>
                                <p className="text-[#888] text-[14px] leading-relaxed mb-8">
                                    You're about to log out of your account.<br />
                                    Make sure you've completed all ongoing activities.
                                </p>

                                <div className="flex gap-3 w-full">
                                    <button
                                        onClick={() => setIsLogoutModalOpen(false)}
                                        className="flex-1 h-10 rounded-lg border border-white/[0.08] hover:bg-white/[0.04] text-[#ccc] text-[13px] font-medium transition-colors"
                                    >
                                        Stay Logged In
                                    </button>
                                    <button
                                        onClick={onLogout}
                                        className="w-24 h-10 rounded-lg bg-[#C43E3E] hover:bg-[#C43E3E]/90 text-white text-[13px] font-medium transition-colors shadow-[0_0_15px_rgba(196,62,62,0.2)]"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* SETUP MODAL */}
                <AnimatePresence>
                    {isSetupOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-8">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsSetupOpen(false)}
                                className="absolute inset-0 bg-black/40 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-5xl bg-[#050505]/80 backdrop-blur-3xl border border-white/[0.08] shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-3xl relative overflow-hidden flex flex-col max-h-[90vh]"
                            >
                                {/* Header */}
                                <div className="px-12 py-8 border-b border-white/[0.08] flex justify-between items-center bg-white/[0.01]">
                                    <div>
                                        <h2 className="text-3xl font-bold text-[#F2F2F7] tracking-[0.1em] uppercase drop-shadow-lg">Device Integration</h2>
                                        <p className="text-[#666] text-sm tracking-widest mt-2 uppercase font-medium">Configure New Hardware Nodes</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsSetupOpen(false)
                                            setSetupMethod(null)
                                            setSetupStep(1)
                                        }}
                                        className="w-12 h-12 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={24} className="group-hover:scale-110 transition-transform" />
                                            {/* Tactical Corners */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="p-12 overflow-y-auto custom-scrollbar">
                                    {/* STEP 1: METHOD SELECTION */}
                                    {setupStep === 1 && (
                                        <div className="grid grid-cols-2 gap-8">
                                            {/* Smart Setup (Disabled) */}
                                            <button
                                                disabled
                                                className="relative group w-full aspect-video bg-[#0A0A0A] border border-white/[0.04] flex flex-col items-center justify-center overflow-hidden opacity-50 cursor-not-allowed"
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.02)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.02)_50%,rgba(255,255,255,0.02)_75%,transparent_75%,transparent)] bg-[size:20px_20px]" />
                                                <div className="relative z-10 p-5 border border-white/10 rounded-full bg-white/[0.02] mb-4">
                                                    <Radio size={32} className="text-[#666]" />
                                                </div>
                                                <span className="text-[12px] font-bold tracking-[0.2em] text-[#666] uppercase">Smart Setup</span>
                                                <div className="absolute top-4 right-4 px-2 py-1 bg-white/5 border border-white/10 text-[8px] text-[#666] font-bold uppercase tracking-wider rounded">
                                                    Unavailable
                                                </div>
                                            </button>

                                            {/* Manual Setup */}
                                            <button
                                                onClick={() => setSetupMethod('manual')}
                                                className={`relative group w-full aspect-video bg-[#0A0A0A] border border-white/[0.08] hover:border-[#F2F2F7]/50 transition-all duration-300 flex flex-col items-center justify-center overflow-hidden cursor-pointer
                                                    ${setupMethod === 'manual' ? 'border-[#F2F2F7] shadow-[0_0_20px_rgba(255,255,255,0.05)]' : ''}
                                                `}
                                            >
                                                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] opacity-20" />

                                                <div className={`relative z-10 p-5 border border-white/10 rounded-full transition-all duration-500 group-hover:scale-110 group-hover:border-[#F2F2F7]/30 mb-4
                                                    ${setupMethod === 'manual' ? 'bg-[#F2F2F7] text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-white/[0.03] text-[#666] group-hover:text-[#F2F2F7]'}
                                                `}>
                                                    <Settings size={32} strokeWidth={1.5} />
                                                </div>

                                                <span className={`text-[12px] font-bold tracking-[0.2em] uppercase transition-colors ${setupMethod === 'manual' ? 'text-[#F2F2F7]' : 'text-[#888] group-hover:text-[#F2F2F7]'}`}>
                                                    Manual Setup
                                                </span>

                                                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/10 group-hover:border-[#F2F2F7] transition-colors" />
                                                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/10 group-hover:border-[#F2F2F7] transition-colors" />
                                                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/10 group-hover:border-[#F2F2F7] transition-colors" />
                                                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/10 group-hover:border-[#F2F2F7] transition-colors" />
                                            </button>
                                        </div>
                                    )}

                                    {/* STEP 2: MANUAL FORM */}
                                    {setupStep === 2 && (
                                        <div className="flex flex-col gap-6 p-2">

                                            {/* Device Type */}
                                            <div className="flex flex-col">
                                                <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Device Type</label>
                                                <div className="relative group z-50">
                                                    <button
                                                        onClick={() => setIsDeviceTypeOpen(!isDeviceTypeOpen)}
                                                        className={`w-full h-12 bg-[#0A0A0A] border rounded-[2px] px-4 flex items-center justify-between text-sm text-[#F2F2F7] transition-all outline-none
                                                            ${isDeviceTypeOpen ? 'border-[#F2F2F7] shadow-[0_0_15px_rgba(255,255,255,0.05)]' : 'border-white/[0.1] hover:border-[#F2F2F7]/50'}
                                                        `}
                                                    >
                                                        <span className={deviceType === 'Select Hardware...' ? 'text-[#444]' : 'text-[#F2F2F7]'}>
                                                            {deviceType}
                                                        </span>
                                                        <ChevronDown size={14} className={`text-[#666] transition-transform duration-300 ${isDeviceTypeOpen ? 'rotate-180 text-[#F2F2F7]' : ''}`} />
                                                    </button>

                                                    {/* Corner Accents */}
                                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />

                                                    {/* Dropdown Menu */}
                                                    <AnimatePresence>
                                                        {isDeviceTypeOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: 5 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: 5 }}
                                                                transition={{ duration: 0.1 }}
                                                                className="absolute top-full left-0 right-0 mt-1 bg-[#050505] border border-white/[0.1] rounded-[2px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] z-50 overflow-hidden"
                                                            >
                                                                {["Select Hardware...", "IP Camera", "NVR / DVR System"].map((option, i) => (
                                                                    <div
                                                                        key={i}
                                                                        onClick={() => {
                                                                            setDeviceType(option)
                                                                            setIsDeviceTypeOpen(false)
                                                                        }}
                                                                        className={`px-4 py-3 text-[13px] cursor-pointer transition-colors flex items-center justify-between group
                                                                            ${deviceType === option ? 'bg-white/[0.08] text-[#F2F2F7]' : 'text-[#888] hover:bg-white/[0.04] hover:text-[#F2F2F7]'}
                                                                        `}
                                                                    >
                                                                        {option}
                                                                        {deviceType === option && <div className="w-1.5 h-1.5 bg-[#00FF41] rounded-full shadow-[0_0_10px_#00FF41]" />}
                                                                    </div>
                                                                ))}
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>

                                            {/* IP Address */}
                                            <div className="flex flex-col">
                                                <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">IP Address</label>
                                                <div className="relative group">
                                                    <input type="text" placeholder="192.168.1.X" className="w-full h-12 bg-[#0A0A0A] border border-white/[0.1] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm font-mono focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                </div>
                                            </div>

                                            {/* Username */}
                                            <div className="flex flex-col">
                                                <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Username <span className="text-[#333] ml-2">(OPTIONAL)</span></label>
                                                <div className="relative group">
                                                    <input type="text" placeholder="admin" className="w-full h-12 bg-[#0A0A0A] border border-white/[0.1] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                </div>
                                            </div>

                                            {/* Device Name */}
                                            <div className="flex flex-col">
                                                <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Device Name</label>
                                                <div className="relative group">
                                                    <input type="text" placeholder="e.g. Hallway Cam" className="w-full h-12 bg-[#0A0A0A] border border-white/[0.1] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                    <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                </div>
                                            </div>

                                            {/* Port & Password */}
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="flex flex-col">
                                                    <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Port</label>
                                                    <div className="relative group">
                                                        <input type="text" placeholder="8080" className="w-full h-12 bg-[#0A0A0A] border border-white/[0.1] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm font-mono focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    </div>
                                                </div>
                                                <div className="flex flex-col">
                                                    <label className="text-[10px] text-[#666] font-bold tracking-[0.2em] uppercase mb-2 pl-1">Password <span className="text-[#333] ml-2">(OPTIONAL)</span></label>
                                                    <div className="relative group">
                                                        <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢" className="w-full h-12 bg-[#0A0A0A] border border-white/[0.1] rounded-[2px] px-4 text-[#F2F2F7] placeholder-[#333] text-sm font-mono focus:outline-none focus:border-[#F2F2F7]/50 transition-all shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]" />
                                                        <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                        <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-white/20 group-hover:border-[#F2F2F7] transition-colors pointer-events-none" />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    className="relative group w-full h-14 border border-white overflow-hidden rounded-[2px] cursor-pointer"
                                                >
                                                    <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                                    <div className="relative z-10 flex items-center justify-center gap-3">
                                                        <span className="text-black group-hover:text-white text-[12px] font-mono font-bold tracking-[0.2em] uppercase transition-colors duration-300">
                                                            Connect Camera
                                                        </span>
                                                        <ArrowRight size={14} className="text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                                                    </div>
                                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Footer Action for Step 1 */}
                                {setupStep === 1 && setupMethod === 'manual' && (
                                    <div className="p-8 border-t border-white/[0.06] flex justify-end bg-black/20">
                                        <button
                                            onClick={() => setSetupStep(2)}
                                            className="relative group h-14 px-10 border border-white overflow-hidden rounded-[2px] cursor-pointer"
                                        >
                                            <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                                            <span className="relative z-10 text-black group-hover:text-white text-[12px] font-mono font-bold tracking-[0.2em] uppercase transition-colors duration-300">
                                                Proceed to Config
                                            </span>
                                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                                        </button>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>





                {/* MESSAGES MODAL */}
                <AnimatePresence>
                    {isMessagesOpen && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMessagesOpen(false)}
                                className="absolute inset-0 bg-black/40 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="w-full max-w-4xl h-[80vh] bg-[#0A0A0A] backdrop-blur-3xl border border-white/[0.15] shadow-[0_0_100px_rgba(0,0,0,0.9)] rounded-2xl relative overflow-hidden flex flex-col"
                            >
                                {/* Header */}
                                <div className="h-20 border-b border-white/[0.15] flex items-center justify-between px-10 bg-white/[0.01]">
                                    <div className="flex items-center gap-4">
                                        <div className="w-3 h-3 rounded-full bg-[#00FF41] shadow-[0_0_15px_#00FF41]" />
                                        <h2 className="text-2xl font-bold text-[#F2F2F7] tracking-[0.2em] uppercase">Messages</h2>
                                    </div>
                                    <button
                                        onClick={() => setIsMessagesOpen(false)}
                                        className="w-12 h-12 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group"
                                    >
                                        <div className="relative p-2">
                                            <X size={24} className="group-hover:scale-110 transition-transform" />
                                            {/* Tactical Corners */}
                                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                        </div>
                                    </button>
                                </div>

                                <div className="flex-1 flex overflow-hidden">
                                    {/* Sidebar */}
                                    <div className="w-[320px] border-r border-white/[0.15] flex flex-col bg-[#0F0F0F]">
                                        <div className="p-6">
                                            <div className="relative">
                                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]" size={16} />
                                                <input type="text" placeholder="SEARCH LOGS..." className="w-full h-12 bg-white/[0.03] border border-white/[0.08] rounded-xl pl-12 pr-4 text-xs font-bold text-white tracking-widest focus:outline-none focus:border-[#F2F2F7] transition-colors" />
                                            </div>
                                        </div>
                                        <div className="flex-1 overflow-y-auto">
                                            {Object.keys(chatHistory).map((chatKey, i) => {
                                                const chatMsgs = chatHistory[chatKey]
                                                const lastMsg = chatMsgs[chatMsgs.length - 1]
                                                const isActive = activeChat === chatKey

                                                return (
                                                    <div
                                                        key={i}
                                                        onClick={() => setActiveChat(chatKey)}
                                                        className={`p-6 border-b border-white/[0.02] hover:bg-white/[0.02] cursor-pointer transition-colors ${isActive ? 'bg-white/[0.04] border-l-4 border-l-[#F2F2F7] shadow-[inset_20px_0_40px_-20px_rgba(255,255,255,0.1)]' : 'border-l-4 border-l-transparent'}`}
                                                    >
                                                        <div className="flex justify-between items-center mb-2">
                                                            <span className={`text-sm font-bold tracking-wide uppercase ${isActive ? 'text-[#F2F2F7]' : 'text-[#888]'}`}>{chatKey}</span>
                                                            <span className="text-[10px] text-[#444] font-mono">{lastMsg?.time}</span>
                                                        </div>
                                                        <div className="text-xs text-[#666] truncate font-medium">{lastMsg?.text}</div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    {/* Chat Area */}
                                    <div className="flex-1 flex flex-col bg-[#050505] relative">
                                        <div className="flex-1 p-8 overflow-y-auto flex flex-col gap-6 relative z-10">
                                            {chatHistory[activeChat].map((msg) => (
                                                <div key={msg.id} className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center text-[10px] font-mono overflow-hidden shrink-0 shadow-lg
                                                         ${msg.role === 'user' ? 'bg-transparent border-white/20' : 'bg-[#111] border-white/10 text-[#F2F2F7]'}`}>
                                                        {msg.role === 'user' ? (
                                                            <img src={zenthosImg} className="w-full h-full object-cover" alt="User" />
                                                        ) : (
                                                            msg.sender === 'System Admin' ? 'SYS' : (msg.sender === 'Security Bot' ? 'SEC' : 'NET')
                                                        )}
                                                    </div>
                                                    <div className={`flex flex-col gap-2 max-w-[60%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                                                        <div className="flex items-baseline gap-3">
                                                            <span className="text-sm font-bold text-[#F2F2F7] tracking-wide uppercase">{msg.sender}</span>
                                                            <span className="text-[10px] text-[#444] font-mono">{msg.time}</span>
                                                        </div>
                                                        <div className={`p-5 border rounded-2xl text-[15px] leading-relaxed shadow-lg
                                                             ${msg.role === 'user' ? 'bg-[#F2F2F7] text-black border-[#F2F2F7] rounded-tr-none' : 'bg-[#111] border-white/10 text-[#ccc] rounded-tl-none'}`}>
                                                            {msg.text}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}<div ref={messagesEndRef} />
                                        </div>

                                        {/* Input Area - High-Performance Tactical UI */}
                                        <div className="h-24 border-t border-white/[0.15] px-8 flex gap-4 bg-[#080808] z-20 items-center">
                                            <div className="flex gap-2">
                                                <button
                                                    disabled={activeChat === 'Security Bot'}
                                                    className={`w-12 h-12 flex items-center justify-center border rounded-[4px] transition-all duration-300 group shadow-inner
                                                        ${activeChat === 'Security Bot'
                                                            ? 'text-[#222] border-white/[0.03] cursor-not-allowed'
                                                            : 'text-[#555] hover:text-[#eee] hover:bg-white/[0.03] border-white/[0.1] hover:border-white/30'}
                                                    `}
                                                    title={activeChat === 'Security Bot' ? "Read-only Channel" : "Attach File"}
                                                >
                                                    <Paperclip size={18} className={`transition-transform ${activeChat === 'Security Bot' ? 'opacity-20' : 'group-hover:rotate-12 opacity-60 group-hover:opacity-100'}`} />
                                                </button>
                                                <button
                                                    disabled={activeChat === 'Security Bot'}
                                                    onClick={() => setIsRecording(!isRecording)}
                                                    className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 rounded-[4px] group relative shadow-inner
                                                        ${activeChat === 'Security Bot'
                                                            ? 'text-[#222] border-white/[0.03] cursor-not-allowed'
                                                            : isRecording
                                                                ? 'bg-red-500/10 border-red-500/50 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                                                                : 'text-[#555] hover:text-[#eee] hover:bg-white/[0.03] border-white/[0.1] hover:border-white/30'}
                                                    `}
                                                    title={activeChat === 'Security Bot' ? "Read-only Channel" : "Voice Note"}
                                                >
                                                    <Mic size={18} className={`transition-opacity ${isRecording ? 'animate-pulse' : (activeChat === 'Security Bot' ? 'opacity-20' : 'opacity-60 group-hover:opacity-100')}`} />
                                                    {isRecording && activeChat !== 'Security Bot' && (
                                                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#080808] animate-ping" />
                                                    )}
                                                </button>
                                            </div>

                                            <div className="flex-1 relative h-12">
                                                <input
                                                    type="text"
                                                    disabled={activeChat === 'Security Bot'}
                                                    value={activeChat === 'Security Bot' ? "" : inputMessage}
                                                    onChange={(e) => setInputMessage(e.target.value)}
                                                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                                    placeholder={activeChat === 'Security Bot' ? "SECURE READ-ONLY CHANNEL" : (isRecording ? "Transcribing secure uplink..." : "Send a message...")}
                                                    className={`w-full h-full bg-black/60 border rounded-[4px] px-6 text-[14px] text-white placeholder-[#333] focus:outline-none transition-all duration-500 tracking-wide
                                                        ${activeChat === 'Security Bot'
                                                            ? 'border-white/[0.03] opacity-40 cursor-not-allowed bg-transparent'
                                                            : isRecording ? 'border-red-500/40' : 'border-white/[0.1] focus:border-white/40 focus:bg-black/80'}
                                                    `}
                                                />
                                                {/* Scanning Status Line */}
                                                {isRecording && activeChat !== 'Security Bot' && (
                                                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-950 overflow-hidden rounded-b-[4px]">
                                                        <div className="w-full h-full bg-red-500 animate-progress origin-left" />
                                                    </div>
                                                )}
                                            </div>

                                            <button
                                                disabled={activeChat === 'Security Bot'}
                                                onClick={handleSendMessage}
                                                className={`px-6 h-12 border rounded-[4px] flex items-center gap-3 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95 group
                                                    ${activeChat === 'Security Bot'
                                                        ? 'bg-transparent border-white/[0.03] text-[#444] cursor-not-allowed'
                                                        : 'bg-[#F2F2F7] hover:bg-white border-white/[0.1] text-black'}
                                                `}
                                            >
                                                <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${activeChat === 'Security Bot' ? 'text-[#333]' : 'text-black'}`}>
                                                    {activeChat === 'Security Bot' ? "LOCKED" : "SEND"}
                                                </span>
                                                <ArrowRight size={16} className={`${activeChat === 'Security Bot' ? 'text-[#222]' : 'text-black group-hover:translate-x-1 transition-transform'}`} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* CAMERA DETAIL MODAL (NEW POPUP) */}
                <AnimatePresence>
                    {isCameraDetailOpen && (
                        <div className="fixed inset-0 z-[120] flex items-center justify-center p-6 sm:p-10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsCameraDetailOpen(false)}
                                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                                className="w-full max-w-7xl h-[85vh] bg-[#050505] border border-[#F2F2F7]/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-2xl flex flex-col overflow-hidden relative z-10"
                            >
                                {/* Titanium Edge Glow */}
                                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#F2F2F7] to-transparent opacity-50 shadow-[0_0_15px_white]" />

                                {/* Header */}
                                <div className="h-24 px-10 flex items-center justify-between border-b border-white/[0.08] bg-white/[0.02] shrink-0">
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-[28px] font-bold text-[#F2F2F7] tracking-[0.15em] uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{activeGridCamera || 'Living Room'}</h2>
                                            {/* STATUS INDICATOR */}
                                            {(() => {
                                                const cam = cameraRegistry[activeGridCamera || 'Living Room']
                                                const isOffline = cam?.offline || systemStats.net === 0
                                                const isAlert = cam?.alert

                                                return (
                                                    <div className={`flex items-center gap-2 px-2.5 py-1 ${isOffline ? 'bg-white/5 border-white/10' : (isAlert ? 'bg-orange-500/10 border-orange-500/30' : 'bg-[#00FF41]/10 border-[#00FF41]/30')} border rounded-[2px] shadow-[0_0_10px_rgba(255,255,255,0.05)]`}>
                                                        <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-white/20' : (isAlert ? 'bg-orange-500 animate-pulse' : 'bg-[#00FF41] animate-pulse shadow-[0_0_8px_#00FF41]')}`} />
                                                        <span className={`text-[11px] font-bold tracking-widest uppercase ${isOffline ? 'text-white/40' : (isAlert ? 'text-orange-500' : 'text-[#00FF41]')}`}>
                                                            {systemStats.net === 0 ? 'SCANNING' : (isOffline ? 'OFFLINE' : 'LIVE FEED')}
                                                        </span>
                                                    </div>
                                                )
                                            })()}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-3">
                                            <button className="px-6 py-2.5 bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-white/30 text-[#F2F2F7] text-[12px] font-bold tracking-[0.15em] uppercase rounded-[2px] transition-all flex items-center gap-2 group">
                                                <Edit2 size={14} className="group-hover:text-[#F2F2F7] transition-colors" />
                                                Config
                                            </button>
                                            {(cameraRegistry[activeGridCamera || 'Living Room']?.offline || systemStats.net === 0) ? (
                                                <button
                                                    onClick={() => toggleCameraConnection(activeGridCamera || 'Living Room')}
                                                    className="px-6 py-2.5 bg-[#00FF41]/10 hover:bg-[#00FF41]/20 border border-[#00FF41]/20 hover:border-[#00FF41]/40 text-[#00FF41] text-[12px] font-bold tracking-[0.15em] uppercase rounded-[2px] transition-all flex items-center gap-2 group shadow-[0_0_15px_rgba(0,255,65,0.1)]"
                                                >
                                                    <Link size={14} className="group-hover:scale-110 transition-transform" />
                                                    Connect
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => toggleCameraConnection(activeGridCamera || 'Living Room')}
                                                    className="px-6 py-2.5 bg-[#FF3B30]/10 hover:bg-[#FF3B30]/20 border border-[#FF3B30]/20 hover:border-[#FF3B30]/40 text-[#F2F2F7] text-[12px] font-bold tracking-[0.15em] uppercase rounded-[2px] transition-all flex items-center gap-2 group"
                                                >
                                                    <LogOut size={14} />
                                                    Disconnect
                                                </button>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => setIsCameraDetailOpen(false)}
                                            className="w-12 h-12 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group relative ml-4"
                                        >
                                            <div className="relative p-2">
                                                <X size={24} className="group-hover:scale-110 transition-transform" />
                                                {/* Tactical Corners */}
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* SCROLLABLE CONTENT AREA */}
                                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020202]">
                                    <div className="p-10 flex flex-col gap-8">

                                        {/* VIDEO PLAYER SECTION (First Fold) */}
                                        <div
                                            id="camera-full-view"
                                            className="relative w-full aspect-video bg-black rounded-[4px] border border-white/10 overflow-hidden group shadow-2xl"
                                        >
                                            {/* Tech Overlay */}
                                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30 pointer-events-none" />

                                            {/* Status Top Right - SIGNAL DENSITY INDICATOR */}
                                            <div className="absolute top-8 right-8 flex items-end gap-1.5 z-20 h-4">
                                                {(() => {
                                                    const cam = cameraRegistry[activeGridCamera || 'Living Room']
                                                    const isOffline = cam?.offline || systemStats.net === 0
                                                    // Determine signal density based on hardware link verified %
                                                    const signalBars = systemStats.net > 80 ? 4 : systemStats.net > 50 ? 3 : systemStats.net > 20 ? 2 : 1

                                                    return [1, 2, 3, 4].map((i) => (
                                                        <motion.div
                                                            key={i}
                                                            animate={{
                                                                height: `${25 + (i * 18)}%`,
                                                                backgroundColor: (!isOffline && signalBars >= i) ? "#00FF41" : "rgba(255, 255, 255, 0.08)",
                                                                boxShadow: (!isOffline && signalBars >= i) ? "0 0 12px rgba(0, 255, 65, 0.5)" : "none"
                                                            }}
                                                            className="w-[6px] rounded-[1px] transition-colors"
                                                        />
                                                    ))
                                                })()}
                                            </div>

                                            {/* CENTER CONTENT - PROFESSIONAL SURVEILLANCE OSD */}
                                            <div className="absolute inset-0 z-10">
                                                {(() => {
                                                    const cam = cameraRegistry[activeGridCamera || 'Living Room']
                                                    const isOffline = cam?.offline || systemStats.net === 0

                                                    if (isOffline) {
                                                        return (
                                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-black/40 backdrop-blur-sm">
                                                                <WifiOff size={48} className="text-red-500/40 animate-pulse" />
                                                                <h3 className="text-[20px] font-mono font-black tracking-[0.4em] uppercase text-red-500">SIGNAL_LOST</h3>
                                                            </div>
                                                        )
                                                    } else {
                                                        return (
                                                            <>
                                                                {/* TOP BAR - SOURCE ID */}
                                                                <div className="absolute top-6 left-6 flex items-center gap-3">
                                                                    <div className="flex items-center gap-2 px-2 py-0.5 bg-red-600 rounded-[1px] animate-pulse">
                                                                        <span className="text-[9px] font-mono font-black text-white uppercase tracking-tighter">LIVE</span>
                                                                    </div>
                                                                    <div className="w-[1px] h-3 bg-white/20" />
                                                                    <span className="text-[11px] font-mono font-black text-white tracking-[0.2em] uppercase">{activeGridCamera || 'CAM_01'}</span>
                                                                </div>



                                                                {/* BOTTOM CONTROLS & SLIDER */}
                                                                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-6">
                                                                    {/* Time Tracking (YouTube style) */}
                                                                    <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/40 backdrop-blur-sm border border-white/10 rounded-[1px] shrink-0">
                                                                        <span className="text-[10px] font-mono font-black text-white tracking-widest leading-none">
                                                                            {getPlaybackTime(playbackProgress)} / 24:00
                                                                        </span>
                                                                    </div>

                                                                    {/* Multimedia Slider (White & Thicker) */}
                                                                    <div
                                                                        className="relative flex-1 h-8 flex items-center group/slider cursor-pointer"
                                                                        onMouseDown={handleSliderInteraction}
                                                                    >
                                                                        <div className="absolute inset-0 h-[4px] bg-white/10 top-1/2 -translate-y-1/2 rounded-full" />
                                                                        <div
                                                                            className="absolute left-0 h-[4px] bg-white top-1/2 -translate-y-1/2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                                                            style={{ width: `${playbackProgress}%` }}
                                                                        />
                                                                        <div
                                                                            className="absolute w-2.5 h-2.5 bg-white rounded-full top-1/2 -translate-y-1/2 group-hover/slider:scale-125 transition-transform"
                                                                            style={{ left: `${playbackProgress}%`, transform: 'translate(-50%, -50%)' }}
                                                                        />
                                                                    </div>

                                                                    {/* Expand Only */}
                                                                    <div className="flex items-center shrink-0">
                                                                        <Maximize
                                                                            size={18}
                                                                            className={`${isFullscreen ? 'text-[#00FF41]' : 'text-white/80'} hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-90`}
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                toggleFullscreen();
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                {/* Center Crosshair (Extremely Subtle) */}
                                                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 opacity-10">
                                                                    <div className="w-full h-[1px] bg-white absolute top-1/2" />
                                                                    <div className="h-full w-[1px] bg-white absolute left-1/2" />
                                                                </div>
                                                            </>
                                                        )
                                                    }
                                                })()}
                                            </div>

                                            {/* Corner Markers (Titanium Style) */}
                                            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#F2F2F7]/30" />
                                            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#F2F2F7]/30" />
                                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-[#F2F2F7]/30" />
                                            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#F2F2F7]/30" />
                                        </div>

                                        {/* ALERT HISTORY SECTION (Titanium Edition) */}
                                        <div className="mt-8 flex flex-col gap-8 pb-10">
                                            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 px-2">
                                                <h3 className="text-[18px] font-bold text-[#F2F2F7] tracking-[0.1em] uppercase drop-shadow-md">
                                                    ALERT HISTORY
                                                </h3>
                                            </div>

                                            {/* Date Group: May 27, 2025 */}
                                            <div className="flex flex-col gap-4">
                                                <span className="text-[11px] font-bold text-[#666] tracking-[0.1em] uppercase pl-1">May 27, 2026</span>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {/* Card 1: Motion Detected */}
                                                    <div className="relative flex items-center justify-between p-5 bg-[#080808] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 rounded-[2px] group cursor-pointer h-24 overflow-hidden">
                                                        {/* Titanium Corners */}
                                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.08] rounded-[2px] text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <AlertTriangle size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Motion Detected</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    - 3 mins ago
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>

                                                    {/* Card 2: Unknown Face Detected */}
                                                    <div className="relative flex items-center justify-between p-5 bg-[#080808] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 rounded-[2px] group cursor-pointer h-24 overflow-hidden">
                                                        {/* Titanium Corners */}
                                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.08] rounded-[2px] text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <ScanFace size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Unknown Face Detected</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    12:15 PM
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Date Group: May 04, 2025 */}
                                            <div className="flex flex-col gap-4">
                                                <span className="text-[11px] font-bold text-[#666] tracking-[0.1em] uppercase pl-1">May 04, 2026</span>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {/* Card 3: Door Forced Open */}
                                                    <div className="relative flex items-center justify-between p-5 bg-[#080808] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 rounded-[2px] group cursor-pointer h-24 overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.08] rounded-[2px] text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <DoorOpen size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Door Forced Open</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    10:00 AM
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>

                                                    {/* Card 4: Door Forced Open */}
                                                    <div className="relative flex items-center justify-between p-5 bg-[#080808] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 rounded-[2px] group cursor-pointer h-24 overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.08] rounded-[2px] text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <DoorOpen size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Door Forced Open</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    10:00 AM
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>

                                                    {/* Card 5: Motion Detected */}
                                                    <div className="relative flex items-center justify-between p-5 bg-[#080808] border border-white/[0.08] hover:border-white/[0.2] transition-all duration-300 rounded-[2px] group cursor-pointer h-24 overflow-hidden">
                                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />
                                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/[0.15] group-hover:border-[#F2F2F7] transition-colors duration-500" />

                                                        <div className="flex items-center gap-5 relative z-10">
                                                            <div className="w-11 h-11 flex items-center justify-center bg-white/[0.03] border border-white/[0.08] rounded-[2px] text-[#666] group-hover:text-[#F2F2F7] group-hover:border-white/[0.2] group-hover:bg-white/[0.05] transition-all duration-300">
                                                                <AlertTriangle size={18} />
                                                            </div>
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-[14px] font-bold text-[#CCC] group-hover:text-white tracking-wide transition-colors">Motion Detected</span>
                                                                <span className="text-[11px] text-[#555] font-mono group-hover:text-[#888] transition-colors flex items-center gap-2">
                                                                    3:00 PM
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2 opacity-30 group-hover:opacity-100 transition-all transform group-hover:translate-x-0 translate-x-3">
                                                            <span className="text-[10px] font-bold text-[#F2F2F7] tracking-wider uppercase hidden sm:block">View Details</span>
                                                            <ArrowRight size={14} className="text-[#F2F2F7] group-hover:-rotate-45 transition-transform duration-300" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* SIGN OUT GRID - TACTICAL POWER MENU */}
                <AnimatePresence>
                    {isLogoutModalOpen && (
                        <div className="fixed inset-0 z-[1500] flex items-center justify-center p-6">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsLogoutModalOpen(false)}
                                className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: 30 }}
                                className="w-full max-w-4xl relative z-10"
                            >
                                <div className="flex flex-col gap-10">
                                    {/* Minimal Header & Close */}
                                    <div className="flex items-center justify-between px-4">
                                        <div />
                                        <button
                                            onClick={() => setIsLogoutModalOpen(false)}
                                            className="w-12 h-12 flex items-center justify-center text-[#666] hover:text-[#F2F2F7] transition-all group relative"
                                        >
                                            <div className="relative p-2">
                                                <X size={24} className="group-hover:scale-110 transition-transform" />
                                                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#666] group-hover:border-[#F2F2F7] opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                            </div>
                                        </button>
                                    </div>

                                    {/* 2-Option Grid */}
                                    <div className="grid grid-cols-2 gap-6">
                                        {/* RESTART */}
                                        <motion.div
                                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => { setIsLogoutModalOpen(false); setIsReloading(true); setTimeout(() => setIsReloading(false), 3000); }}
                                            className="h-64 bg-white/[0.015] border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-6 cursor-pointer relative group transition-all duration-500"
                                        >
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/10 group-hover:border-white/40 transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/10 group-hover:border-white/40 transition-colors" />
                                            <div className="p-6 rounded-full bg-white/[0.03] border border-white/10 group-hover:scale-110 group-hover:bg-white/10 transition-all duration-700 shadow-[0_0_40px_rgba(255,255,255,0.02)]">
                                                <RefreshCw size={44} className="text-white group-hover:rotate-180 transition-transform duration-1000" />
                                            </div>
                                            <span className="text-[20px] font-black text-white tracking-[0.4em] uppercase">Restart</span>
                                        </motion.div>

                                        {/* SIGN OUT */}
                                        <motion.div
                                            whileHover={{ scale: 1.02, backgroundColor: 'rgba(239,68,68,0.05)', borderColor: 'rgba(239,68,68,0.3)' }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={onLogout}
                                            className="h-64 bg-red-600/[0.02] border border-red-500/20 rounded-2xl flex flex-col items-center justify-center gap-6 cursor-pointer relative group transition-all duration-500"
                                        >
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/20 group-hover:border-red-500/60 transition-colors" />
                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/20 group-hover:border-red-500/60 transition-colors" />
                                            <div className="p-6 rounded-full bg-red-500/[0.03] border border-red-500/20 group-hover:scale-110 group-hover:bg-red-500 group-hover:shadow-[0_0_50px_#ef4444] transition-all duration-700">
                                                <LogOut size={44} className="text-red-500 group-hover:text-white transition-colors" />
                                            </div>
                                            <span className="text-[20px] font-black text-red-500 tracking-[0.4em] uppercase">Sign Out</span>
                                        </motion.div>
                                    </div>

                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* SYSTEM RELOAD OVERLAY - SPECTRAL LOGO */}
                <AnimatePresence>
                    {isReloading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                            className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/40 backdrop-blur-[40px]"
                        >
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
                                animate={{
                                    scale: [0.85, 0.9, 0.85],
                                    opacity: [0.05, 0.12, 0.05],
                                    filter: ['blur(4px)', 'blur(8px)', 'blur(4px)']
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="relative"
                            >
                                <img
                                    src={teletraanLogo}
                                    className="w-[600px] h-[600px] grayscale brightness-200"
                                    alt="Teletraan Spectral Logo"
                                />

                                {/* TACTICAL SCAN LINE - RELOAD SPECIFIC */}
                                <motion.div
                                    animate={{ top: ["-10%", "110%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-[2px] bg-white/20 blur-[1px] z-10"
                                />
                            </motion.div>

                            {/* RELOAD TELEMETRY */}
                            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
                                <span className="text-white text-[11px] font-mono font-black tracking-[0.5em] uppercase animate-pulse">
                                    SYSTEM LOADING... PLEASE WAIT
                                </span>
                                <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                                    <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{ duration: 3, ease: "easeInOut" }}
                                        className="absolute inset-0 bg-white/40"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    )
}

export default Dashboard

