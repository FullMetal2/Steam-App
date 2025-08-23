// Import des dépendances
import express, { response } from "express";
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
app.get("/resolveVanity", (req, res) => {
  console.log(req.query.v);
  const vanity = req.query.v;
  const key = process.env.STEAM_API_KEY;
  const url =
    "https://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=" +
    key +
    "&vanityurl=" +
    vanity;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Steam api error" });
    });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
