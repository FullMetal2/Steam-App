import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      return res.status(401).json({ error: "Token manquant" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Recherche du user correspondant dans MongoDB
    const user = await User.findById(decoded.userId);

    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable" });
    }

    // Injection du user dans la requête
    req.user = user;
    return next(); // passe à la route suivante

  } catch (error) {
    console.error("Erreur middleware auth :", error);
    return res.status(401).json({ message: "Token introuvable ou expiré" });
  }
};
