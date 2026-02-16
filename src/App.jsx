import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import { AnimatePresence } from 'framer-motion';

function App() {
    const [stage, setStage] = useState('auth'); // 'auth', 'loading', 'active' - Force Update

    const handleLogin = () => {
        setStage('loading');
        // High-stakes sequence timing: 4.5s for the full "Neural Intent" calibration
        setTimeout(() => setStage('active'), 6500);
    };

    return (
        <div className="bg-void w-screen h-screen overflow-hidden text-white font-sans selection:bg-[#00FF41] selection:text-black">
            <AnimatePresence mode="wait">
                {stage === 'auth' && <Login onLogin={handleLogin} key="login" />}
                {stage === 'loading' && <Loading key="loading" />}
                {stage === 'active' && <Dashboard key="dashboard" onLogout={() => setStage('auth')} />}
            </AnimatePresence>
        </div>
    );
}

export default App;
