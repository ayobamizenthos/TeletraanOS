import React, { useState } from 'react'
import { Minus, Square, X, RefreshCw } from 'lucide-react'

const WindowControls = ({ color = '#6E6E73', className = "", onReload, showReload = true }) => {
    const [isRefreshing, setIsRefreshing] = useState(false)

    const handleReload = () => {
        setIsRefreshing(true)
        if (onReload) {
            onReload()
        } else {
            window.location.reload()
        }

        // Reset animation after 1s
        setTimeout(() => setIsRefreshing(false), 1000)
    }

    return (
        <div className={`flex items-center gap-1 no-drag ${className}`}>
            {showReload && (
                <>
                    <button
                        onClick={handleReload}
                        className={`
                            w-8 h-8 grid place-items-center rounded-md transition-all duration-300
                            ${isRefreshing ? 'bg-white/10 text-white' : 'hover:bg-white/5 hover:text-white text-[#888]'}
                        `}
                        title="Refresh System"
                    >
                        <RefreshCw
                            strokeWidth={2.5}
                            size={16}
                            className={`${isRefreshing ? 'animate-spin text-[#00FF41]' : ''} transition-all`}
                        />
                    </button>

                    <div className="w-[1px] h-4 bg-white/10 mx-1" /> {/* Separator */}
                </>
            )}

            <button onClick={() => window.electron?.minimize()} className="hover:text-white transition-colors w-10 h-8 grid place-items-center opacity-60 hover:opacity-100">
                <Minus strokeWidth={1.5} style={{ width: 14, height: 14, color }} />
            </button>
            <button onClick={() => window.electron?.maximize()} className="hover:text-white transition-colors w-10 h-8 grid place-items-center opacity-60 hover:opacity-100">
                <Square strokeWidth={1.5} style={{ width: 12, height: 12, color }} />
            </button>
            <button onClick={() => window.electron?.close()} className="hover:bg-red-500/20 hover:text-red-500 transition-colors w-10 h-8 grid place-items-center text-red-500/80 rounded-sm">
                <X strokeWidth={1.5} style={{ width: 14, height: 14 }} />
            </button>
        </div>
    )
}

export default WindowControls
