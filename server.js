const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar ao banco SQLite
const db = new sqlite3.Database("users.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log("Conectado ao banco SQLite.");
        db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)");
    }
});

// Rota para cadastrar usuário
app.post("/register", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email e senha são obrigatórios." });
    }
    
    db.run("INSERT INTO users (email, password) VALUES (?, ?)", [email, password], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: "Usuário cadastrado com sucesso!", id: this.lastID });
    });
});

// Rota para listar usuários cadastrados
app.get("/users", (req, res) => {
    db.all("SELECT id, email FROM users", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});