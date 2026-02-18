const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');
const { autoUpdater } = require('electron-updater');
const isDev = process.env.NODE_ENV === 'development';

let mainWindow = null;

// ─── AUTO-UPDATER: FULLY SILENT ──────────────────────────────────────────────
// No notifications, no prompts. Downloads in background, restarts automatically.
autoUpdater.autoDownload = true;
autoUpdater.autoInstallOnAppQuit = true;
autoUpdater.autoRunAppAfterInstall = true;

function setupAutoUpdater() {
    if (isDev) {
        console.log('[AutoUpdater] Skipped — running in development mode');
        return;
    }

    // Check immediately on launch
    autoUpdater.checkForUpdates().catch((err) => {
        console.log('[AutoUpdater] Initial check error:', err.message);
    });

    // Check every 5 seconds so updates arrive almost instantly after publish
    setInterval(() => {
        autoUpdater.checkForUpdates().catch((err) => {
            console.log('[AutoUpdater] Periodic check error:', err.message);
        });
    }, 4800); // 4.8s frequency check

    // Logging only — no UI notifications
    autoUpdater.on('checking-for-update', () => {
        console.log('[AutoUpdater] Checking for update...');
    });

    autoUpdater.on('update-available', (info) => {
        console.log('[AutoUpdater] Update available:', info.version, '— downloading silently...');
    });

    autoUpdater.on('update-not-available', () => {
        console.log('[AutoUpdater] App is up to date.');
    });

    autoUpdater.on('download-progress', (progress) => {
        console.log(`[AutoUpdater] Downloading: ${Math.round(progress.percent)}%`);
    });

    // ★ THE KEY: once downloaded, immediately quit and install — no user action needed
    autoUpdater.on('update-downloaded', (info) => {
        console.log('[AutoUpdater] Update downloaded:', info.version, '— restarting now...');
        // isSilent = true (no dialog), isForceRunAfter = true (relaunch immediately)
        autoUpdater.quitAndInstall(true, true);
    });

    autoUpdater.on('error', (err) => {
        console.log('[AutoUpdater] Error:', err.message);
    });
}

// ─── WINDOW CREATION ─────────────────────────────────────────────────────────
function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    const iconPath = path.join(__dirname, 'teletraan.png');

    mainWindow = new BrowserWindow({
        width: width,
        height: height,
        x: 0,
        y: 0,
        icon: iconPath,
        backgroundColor: '#0A0A0A',
        frame: false,
        show: false,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.cjs'),
        },
    });

    mainWindow.maximize();

    // Dev mode shortcuts
    if (isDev) {
        mainWindow.webContents.on('before-input-event', (event, input) => {
            if ((input.control && input.key === 'r') || input.key === 'F5') {
                mainWindow.webContents.reloadIgnoringCache();
                event.preventDefault();
            }
            if (input.control && input.shift && input.key === 'I') {
                mainWindow.webContents.toggleDevTools();
                event.preventDefault();
            }
        });
    }

    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    if (isDev) {
        mainWindow.webContents.session.clearCache().then(() => {
            mainWindow.loadURL('http://localhost:5173');
        });
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }

    // Window controls
    ipcMain.on('window-minimize', () => mainWindow.minimize());
    ipcMain.on('window-maximize', () => {
        if (mainWindow.isMaximized()) {
            mainWindow.unmaximize();
        } else {
            mainWindow.maximize();
        }
    });
    ipcMain.on('window-close', () => mainWindow.close());

    // SYSTEM LOGIC: Network & Stats
    let isOffline = false;
    let batteryLevel = 100;
    const startTime = Date.now();

    ipcMain.on('toggle-network', () => {
        isOffline = !isOffline;
        console.log(`[System] Network status: ${isOffline ? 'OFFLINE' : 'ONLINE'}`);
        // Immediate broadcast of new state
        broadcastStats();
    });

    function broadcastStats() {
        if (!mainWindow) return;

        const stats = {
            battery: batteryLevel,
            net: isOffline ? 0 : 1, // 0 = Offline, 1 = Connected
            uptime: Math.floor((Date.now() - startTime) / 1000)
        };

        mainWindow.webContents.send('system-stats', stats);
    }

    // Emit stats every 2 seconds
    const statsInterval = setInterval(() => {
        // Subtle battery drain simulation
        if (batteryLevel > 1) {
            batteryLevel -= Math.random() * 0.05;
        }
        broadcastStats();
    }, 2000);

    mainWindow.on('closed', () => {
        clearInterval(statsInterval);
        mainWindow = null;
    });
}

// ─── APP LIFECYCLE ───────────────────────────────────────────────────────────
app.whenReady().then(() => {
    createWindow();
    setupAutoUpdater();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
