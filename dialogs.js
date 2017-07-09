const { app, dialog, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

function showMessage(browserWindow){
    dialog.showMessageBox(browserWindow, {
        type: 'info'
        , icon: nativeImage.createFromPath(path.join(__dirname, 'tt.jpg'))
        , message: 'Message'
        , detail: 'Message body'
        , buttons: ['Info message', 'OK', 'Cancel']
        , defaultId: 0
    }, (clickedIndex) => {
        console.log(clickedIndex);
    });
}

function showSaveDialog(browserWindow){
    dialog.showSaveDialog(browserWindow,{
        defaultPath: path.join(app.getPath('downloads'), 'memory-usage.txt')
    }, (filename) => {
        if(filename){
            try{
                const memInfo = process.getProcessMemoryInfo();
                fs.writeFile(filename, JSON.stringify(memInfo || {'mesage': null}), 'utf-8', (err)=> {
                    if(err){
                        dialog.showErrorBox('Error saving', err.message);
                    }
                });
            }catch(err){
                dialog.showErrorBox('Error saving', err.message);
            }
        }
    });
}

function showOpenDialog(browserWindow){
    dialog.showOpenDialog(browserWindow, {
        defaultPath: app.getPath('downloads')
        , filters: [{
            name: 'text files'
            , extensions: ['txt']
        }]
    }, (filepaths) => {
        if(filepaths){
            console.log(filepaths);
        }
    })
}

module.exports = { showMessage, showSaveDialog, showOpenDialog };