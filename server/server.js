// Import des dépendances
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";
import passport from "passport";
import cookieParser from "cookie-parser";
import connectDB from "./config/DB.js";
import steamRoute from "./routes/steam/OauthSteam.js";
import authPlayTrackRoute from "./routes/playtrack/authPlayTrack.js";
import steamGamesRoute from "./routes/steam/steam.games.js";
import steamProfilRoute from "./routes/steam/steam.profil.js";
import steamFriendsroute from "./routes/steam/steam.friends.js";
import forgotPasswordPlaytrack from "./routes/playtrack/forgotPassword.js";
import resetPasswordPlaytrack from "./routes/playtrack/resetPassword.js";

// Charger les variables d'environnement
dotenv.config();
connectDB();

// Initialiser l'app
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Test route
app.get("/ping", (req, res) => {
  res.json({ ok: true, message: "API Steam proxy fonctionne 🚀" });
});

app.use("/api/playtrack/auth", authPlayTrackRoute);
app.use("/api/playtrack/forgotPassword", forgotPasswordPlaytrack);
app.use("/api/playtrack/resetPassword", resetPasswordPlaytrack);
app.use("/api/auth/steam", steamRoute);
app.use("/auth/steam", steamRoute);
app.use("/api/steam/profil", steamProfilRoute);
app.use("/api/steam/games", steamGamesRoute);
app.use("/api/steam/friends", steamFriendsroute);

// Lancer le serveur
app.listen(PORT, () => {
  console.log("✅ Serveur Steam OAuth prêt sur http://localhost:5000");
});
