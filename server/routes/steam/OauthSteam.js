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
    res.cookie("playtrackToken", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    next();
  },
  passport.authenticate("steam")
);

router.get(
  "/return",
  passport.authenticate("steam", { failureRedirect: "/" }),
  async (req, res) => {
    // req.user contient les infos Steam

    const token = req.cookies.playtrackToken;
    if (!token) {
      console.log("❌ Aucun token retrouvé dans le cookie !");
      return res.status(400).json({ message: "Token manquant." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const steamUser = req.user._json;
    await User.findByIdAndUpdate(
      decoded.userId,
      {
        steam: {
          steamid: steamUser.steamid,
          personaname: steamUser.personaname,
          avatar: steamUser.avatar,
        },
      },
      { new: true }
    );
    res.clearCookie("playtrackToken");

    // Tu peux soit :
    // 👉 le renvoyer dans le body
    // 👉 ou rediriger ton front avec le token dans l’URL (plus courant en dev)
    res.redirect(`http://localhost:5173/login-success`);
  }
);

export default router;
