import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, RefreshCw, CheckCircle, X } from 'lucide-react';

const UpdateNotification = () => {
    const [updateInfo, setUpdateInfo] = useState(null);
    const [dismissed, setDismissed] = useState(false);

    useEffect(() => {
        // Only wire up if running in Electron
        if (window.api && window.api.onUpdateStatus) {
            window.api.onUpdateStatus((data) => {
                setUpdateInfo(data);
                setDismissed(false); // Re-show on new status
            });
        }
    }, []);

    // Don't render if no update info, dismissed, or just "checking"/"up-to-date"
    const shouldShow =
        updateInfo &&
        !dismissed &&
        ['available', 'downloading', 'ready'].includes(updateInfo.status);

    if (!shouldShow) return null;

    const handleRestart = () => {
        if (window.api && window.api.restartForUpdate) {
            window.api.restartForUpdate();
        }
    };

    const getContent = () => {
        switch (updateInfo.status) {
            case 'available':
                return {
                    icon: <Download size={16} className="text-cyan-400" />,
                    text: `Update v${updateInfo.version} available — downloading...`,
                    showProgress: false,
                    showRestart: false,
                };
            case 'downloading':
                return {
                    icon: <Download size={16} className="text-cyan-400 animate-pulse" />,
                    text: `Downloading update... ${updateInfo.percent}%`,
                    showProgress: true,
                    showRestart: false,
                };
            case 'ready':
                return {
                    icon: <CheckCircle size={16} className="text-emerald-400" />,
                    text: `Update v${updateInfo.version} ready`,
                    showProgress: false,
                    showRestart: true,
                };
            default:
                return null;
        }
    };

    const content = getContent();
    if (!content) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -60, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto"
            >
                <div className="flex items-center gap-3 bg-[#111111]/95 backdrop-blur-xl border border-white/10 rounded-lg px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
                    {/* Icon */}
                    {content.icon}

                    {/* Text */}
                    <span className="text-[13px] text-white/80 font-medium tracking-wide whitespace-nowrap">
                        {content.text}
                    </span>

                    {/* Progress Bar */}
                    {content.showProgress && (
                        <div className="w-[100px] h-[4px] bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: `${updateInfo.percent}%` }}
                                transition={{ ease: 'linear', duration: 0.3 }}
                            />
                        </div>
                    )}

                    {/* Restart Button */}
                    {content.showRestart && (
                        <button
                            onClick={handleRestart}
                            className="relative group px-4 py-2 border border-white overflow-hidden rounded-[2px] cursor-pointer flex items-center gap-2 ml-4"
                        >
                            <div className="absolute inset-0 bg-white z-0 w-full h-full transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:translate-x-full" />
                            <div className="relative z-10 flex items-center gap-1.5">
                                <RefreshCw size={12} className="text-black group-hover:text-white transition-colors duration-300" />
                                <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-black group-hover:text-white transition-colors duration-300">
                                    Restart Now
                                </span>
                            </div>
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-transparent group-hover:border-white/50 transition-colors delay-100" />
                            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-transparent group-hover:border-white/50 transition-colors delay-100" />
                        </button>
                    )}

                    {/* Dismiss */}
                    <button
                        onClick={() => setDismissed(true)}
                        className="text-white/30 hover:text-white/70 transition-colors ml-1"
                    >
                        <X size={14} />
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default UpdateNotification;
