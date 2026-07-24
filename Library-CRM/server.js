const express = require("express");
const path = require("path");
const db = require("./db");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Home Page (Login)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Dashboard Page
app.get("/dashboard", (req, res) => {
    db.query(
        "SELECT * FROM members ORDER BY id DESC LIMIT 5",
        (err, results) => {
            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            res.render("dashboard", { members: results });
        }
    );
});
// Login
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM admin WHERE email = ? AND password = ?",
        [email, password],
        (err, results) => {
            if (err) {
                console.log(err);
                return res.send("Database Error");
            }

            if (results.length > 0) {
                res.redirect("/dashboard");
            } else {
                res.send("Invalid Email or Password");
            }
        }
    );
});
// Add Member Page
app.get("/add-member", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "add-member.html"));
});

// Members Page
app.get("/members", (req, res) => {
    db.query("SELECT * FROM members", (err, results) => {
        if (err) {
            return res.send("Database Error");
        }

        res.render("members", { members: results });
    });
});
// Edit Member Page
app.get("/edit-member", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "edit-member.html"));
});

//Books
app.get("/books", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "books.html"));
});

//   Add Members
app.post("/add-member", (req, res) => {
    const { name, email, phone, address, membership, joining_date, status, notes } = req.body;

    const sql = `
        INSERT INTO members
        (name, email, phone, address, membership, joining_date, status, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [name, email, phone, address, membership, joining_date, status, notes],
        (err) => {
            if (err) {
                console.log(err);
                return res.send("Error saving member");
            }

            res.redirect("/members");
        }
    );
});
// Create admin table
db.query(`
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
)`, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Admin table ready");

        db.query(
            "INSERT IGNORE INTO admin (id, email, password) VALUES (1, 'admin@gmail.com', '123456')"
        );
    }
});

// Create members table
db.query(`
CREATE TABLE IF NOT EXISTS members (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    membership VARCHAR(50),
    joining_date DATE,
    status VARCHAR(50),
    notes TEXT
)`, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Members table ready");
    }
});
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
