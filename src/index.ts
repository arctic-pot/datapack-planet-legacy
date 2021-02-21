import { app, BrowserWindow, ipcMain } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
    // eslint-disable-line global-require
    app.quit();
}

const createWindow = (): void => {
    // Create the browser window.
    const mainWindow: BrowserWindow = new BrowserWindow({
        height: 600,
        width: 800,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false,
        },
    });

    mainWindow.webContents.openDevTools();
    mainWindow.maximize();
    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then();

    ipcMain.on('close', () => {
        mainWindow.close();
    });
    ipcMain.on('minimize', () => {
        mainWindow.minimize();
    });
    ipcMain.on('devtools', () => {
        mainWindow.webContents.openDevTools();
    });
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
