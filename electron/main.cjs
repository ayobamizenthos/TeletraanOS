const { app, BrowserWindow, ipcMain, screen, powerMonitor } = require('electron');
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
}

const os = require('os');

// ─── SYSTEM METRICS: REAL-TIME FEED ──────────────────────────────────────────
const { exec } = require('child_process');

function startSystemMetrics() {
    const sendStats = async () => {
        if (!mainWindow || mainWindow.isDestroyed()) return;

        try {
            // 1. Get REAL Battery Percentage (Robust PowerShell)
            exec('powershell -Command "(Get-CimInstance -ClassName Win32_Battery).EstimatedChargeRemaining"', (err, stdout) => {
                let batteryLevel = 100;
                if (!err && stdout) {
                    const match = stdout.trim().match(/^\d+$/);
                    if (match) batteryLevel = parseInt(match[0]);
                }

                // 2. Get REAL Wi-Fi Signal Strength (Detailed netsh with Fallback)
                exec('netsh wlan show interfaces', (err, stdout) => {
                    let signalStrength = 100; // Default to full (Ethernet/Stable)

                    if (!err && stdout) {
                        const match = stdout.match(/Signal\s*:\s*(\d+)%/);
                        if (match) {
                            signalStrength = parseInt(match[1]);
                        }
                    } else if (err) {
                        // Fallback: If netsh fails (elevation/location), check if interface is at least up
                        exec('powershell -Command "(Get-NetAdapter -Name * -ErrorAction SilentlyContinue | Where-Object Status -eq \'Up\').Length"', (pErr, pStdout) => {
                            if (!pErr && pStdout.trim() !== '0') {
                                signalStrength = 90; // Connected but can't see exact %
                            } else {
                                signalStrength = 0; // Disconnected
                            }
                        });
                    }

                    const stats = {
                        battery: Math.max(0, Math.min(100, batteryLevel)),
                        net: Math.max(0, Math.min(100, signalStrength)),
                        uptime: os.uptime()
                    };

                    // BROADCAST LOG (So user can see real data in terminal if needed)
                    console.log(`[TELEMETRY] BAT: ${stats.battery}% | NET: ${stats.net}% | UPTIME: ${Math.floor(stats.uptime / 3600)}h`);

                    if (mainWindow && !mainWindow.isDestroyed()) {
                        mainWindow.webContents.send('system-stats', stats);
                    }
                });
            });
        } catch (err) {
            // Silent catch
        }
    };

    setInterval(sendStats, 3000);
    setTimeout(sendStats, 1000);
}

// ─── APP LIFECYCLE ───────────────────────────────────────────────────────────
app.whenReady().then(() => {
    createWindow();
    setupAutoUpdater();
    startSystemMetrics();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
            startSystemMetrics();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
