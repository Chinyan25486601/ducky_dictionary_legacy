const { app, BrowserWindow, Tray } = require('electron');
const path = require('path');
const server_ = require("../server/server");
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

function createWindow () {
    let dictServer = new server_.dictServer();
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.setTitle("Ducky Dictionary");
    
    // to TEST comment the statement below
    // win.setMenu(null);
    win.loadURL("http://127.0.0.1:14514/");
};

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        };
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    };
});