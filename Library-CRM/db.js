const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "library_crm"
});

db.connect((err) => {
    if (err) {
        console.error("Database Connection Failed!");
        console.error(err);
    } else {
        console.log("MySQL Connected Successfully!");
    }
});

module.exports = db;