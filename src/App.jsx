import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import { AnimatePresence } from 'framer-motion';

function App() {
    const [stage, setStage] = useState('auth'); // STAGE: [AUTH_READY_V2.0]

    const handleLogin = () => {
        setStage('loading');
    };

    const handleLoadingComplete = () => {
        setStage('active');
    };

    return (
        <div className="bg-void w-screen h-screen overflow-hidden text-white font-sans selection:bg-[#00FF41] selection:text-black">
            <AnimatePresence>
                {stage === 'auth' && <Login onLogin={handleLogin} key="login" />}
                {stage === 'loading' && <Loading key="loading" onComplete={handleLoadingComplete} />}
                {stage === 'active' && <Dashboard key="dashboard" onLogout={() => setStage('auth')} />}
            </AnimatePresence>
        </div>
    );
}

export default App;
