const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    minimize: () => ipcRenderer.send('window-minimize'),
    maximize: () => ipcRenderer.send('window-maximize'),
    close: () => ipcRenderer.send('window-close'),
});

contextBridge.exposeInMainWorld('api', {
    onSystemStats: (callback) => ipcRenderer.on('system-stats', (event, stats) => callback(stats)),
    toggleNetwork: () => ipcRenderer.send('toggle-network'),
});
