const { ipcMain } = require("electron");
const sqlite3 = require("sqlite3");

ipcMain.on("create-db", (event, totalR, asilR, dbName) => {
  const db = new sqlite3.Database(`${dbName}.sqlite3`, (err) => {
    if (err) console.error("Database opening error: ", err);
  });
  db.serialize(() => {
    db.run("CREATE TABLE parameters (projectName TEXT, totalRaffleCount TEXT, asilRaffleCount TEXT)");
    db.run(`INSERT INTO parameters (projectName, totalRaffleCount, asilRaffleCount) VALUES ('${dbName}', '${totalR}', '${asilR}')`)
});
});


ipcMain.on("query-message", (event, sqlQuery, dbName) => {
  const database = new sqlite3.Database(dbName, (err) => {
    if (err) console.error("Database opening error: ", err);
  });
  const sql = sqlQuery;
  database.all(sql, (err, rows) => {
    event.reply("query-reply", (err && err.message) || rows);
  });
});

