    const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const { setMainMenu } = require('./main-menu');

//let mainWindow;
let windows = [];

function sendWindowMessage(){
    windows.forEach(function(item){
        item.webContents.send('window-message', {
            count: windows.length
        })
    });
}

function createBrowserWindow(windowOptions){
    let mainWindow = new BrowserWindow(Object.assign({ width: 400
        , height: 400
        , show: false 
    }, windowOptions));
    mainWindow.loadURL(path.join('file://', __dirname, 'index.html'));
    mainWindow.on('ready-to-show', () => { 
        mainWindow.show();
    });
    setMainMenu(mainWindow);
    mainWindow.on('close', () => {
        windows.splice(windows.indexOf(mainWindow), 1);
        sendWindowMessage();
    });
    windows.push(mainWindow);
}

app.on('ready', () => {
    createBrowserWindow();
    ipcMain.on('create-new-window', (evt, data) => {
        createBrowserWindow(data);
    });
    ipcMain.on('get-window-count', (evt, data) => {
        sendWindowMessage();
    });
});