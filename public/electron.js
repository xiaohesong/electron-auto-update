const electron = require('electron')
const updater = require("electron-updater");
const autoUpdater = updater.autoUpdater;

const ipc = electron.ipcMain
const {app, dialog, Menu, BrowserWindow} = electron
const path = require('path')
const isDev = require('electron-is-dev')

let mainWindow;

function sendStatusToWindow(text) {
    log.info(text);
    win.webContents.send('message', text);
}

autoUpdater.autoDownload = true;

console.log('auto updater is', autoUpdater);


autoUpdater.setFeedURL({
    provider: "generic",
    url: "https://github.com/xiaohesong/electron-auto-update/tree/master/dist"
});

autoUpdater.on('checking-for-update', function () {
    sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', function (info) {
    sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', function (info) {
    sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', function (err) {
    sendStatusToWindow('Error in auto-updater.');
});

autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
})

autoUpdater.on('update-downloaded', (info) => {
    sendStatusToWindow('Update downloaded');
});

app.on('ready', function () {
    autoUpdater.checkForUpdatesAndNotify();
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 950,
        height: 680
    });
    mainWindow.webContents.openDevTools()

    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    // mainWindow.loadURL(isDev ? 'http://localhost:3000' : 'staging url');

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);


    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});
