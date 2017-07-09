const { app, Menu } = require('electron');
const { showMessage, showSaveDialog, showOpenDialog } = require('./dialogs');

const isWindows = process.platform === 'win32';

function setMainMenu(browserWindow) {
    /*const template = [
        {
            label: isWindows ?  'File' : app.getName()
            , submenu: [
                { 
                    label: 'Exit' 
                    , accelerator: isWindows ? 'Alt+F4' : 'CmdOrCtrl+Q'
                    , click(){
                        app.quit();
                    }
                }
            ]
        }
        , {
            label: 'Edit'
            , submenu: [
                { role: 'undo' }
                , { role: 'redo' }
                , { role: 'seperator' }
                , { role: 'copy' }
                , { role: 'cut' }
                , { role: 'paste' }
                , { role: 'selectall' }
                

            ]
        }
    ];*/
    const template = [
        {
            label: app.getName()
            , submenu: [
                {
                    label: 'Exit'
                    , accelerator: isWindows ? 'Alt+F4' : 'CmdOrCtrl+Q'
                    , click(){
                        app.quit();
                    }
                }
                , {
                    label: 'Say hello'
                    , click(){
                        showMessage(browserWindow);
                    }
                }
                , {
                    label: 'Save memory usage info'
                    , click(){
                        showSaveDialog(browserWindow);
                    }
                }
                , {
                    label: 'Open file'
                    , click(){
                        showOpenDialog(browserWindow);
                    }
                }
                , { role: 'separator'}
                , { role: 'quit'}
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

module.exports = { setMainMenu };