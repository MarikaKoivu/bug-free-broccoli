const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const path = require('path'); // Lisää tämä rivi

const app = express();
const port = 3000;

// Middleware for handling JSON requests
app.use(express.json());

// Palvele staattisia tiedostoja (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public'))); // Lisää tämä rivi

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Database error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Create table if it doesn’t exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  email TEXT UNIQUE
)`);

// Create a new user (Create)
app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
    db.run(query, [name, email], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID, name, email });
    });
});

// Fetch all users (Read)
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Update user details (Update)
app.put('/users/:id', (req, res) => {
    const { name, email } = req.body;
    const { id } = req.params;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    db.run(query, [name, email, id], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User details updated', id });
    });
});

// Delete user (Delete)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM users WHERE id = ?`, id, function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted', id });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

