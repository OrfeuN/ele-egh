//document.querySelector('#version').innerText = process.versions.electron;
const { ipcRenderer } = require('electron');

document.getElementById('version').innerText = process.versions.electron;
document.getElementById('pid').innerText = process.pid;

document.getElementById('new-window').addEventListener('click', (e) => {
    ipcRenderer.send('create-new-window', {x: 0, y: 0, id: process.pid });
});

ipcRenderer.on('window-message', (event, data) => {
    document.getElementById('window-count').innerText = data.count;
});

ipcRenderer.send('get-window-count');