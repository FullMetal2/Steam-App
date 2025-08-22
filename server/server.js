// Import des dépendances
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

// Initialiser l'app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Test route
app.get("/ping", (req, res) => {
  res.json({ ok: true, message: "API Steam proxy fonctionne 🚀" });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
