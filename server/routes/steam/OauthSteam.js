import express from "express";
import passport from "passport";
import "../../config/passportSteam.js";
import User from "../../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();

// Démarrer le flux OAuth Steam
router.get(
  "/",
  (req, res, next) => {
    const token = req.query.token;
    req.session.playTrackToken = token;
    if (!token) {
      res.redirect("http://localhost:5173/home");
    }
    next();
  },
  passport.authenticate("steam", { failureRedirect: "/" })
);

router.get(
  "/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  async (req, res) => {
    // req.user contient les infos Steam
    const token = req.session.playTrackToken;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const steamUser = req.user._json;
    await User.findByIdAndUpdate(decoded.userId, {
      steamid: steamUser.steamid,
      personaname: steamUser.personaname,
      avatar: steamUser.avatar,
    });

    // Tu peux soit :
    // 👉 le renvoyer dans le body
    // 👉 ou rediriger ton front avec le token dans l’URL (plus courant en dev)
    res.redirect(`http://localhost:5173/login-success`);
  }
);

export default router;
