const electron = window.require('electron');
const { ipcRenderer } = electron;

export function sendQuery(sqlQuery, dbName) {
    return new Promise((resolve) => {
        ipcRenderer.once('query-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('query-message', sqlQuery, dbName);
    });
}

export function createDB(totalR, asilR, dbName) {
  ipcRenderer.send('create-db', totalR, asilR, dbName);
};
