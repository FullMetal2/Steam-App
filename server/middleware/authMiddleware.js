import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", " ");

    if (!token) {
      return res.status(401).json({ error: "Token manquant" });
    }
    // Vérifie et décode le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Recherche du user correspondant dans MongoDB
    const user = await User.findById(decoded.id);

    if (!user) res.status(404).json({ message: "Utilisateur introuvable" });

    // Injection du user dans la requête
    req.user = user;
    next(); // passe à la route suivante
  } catch (error) {
    console.error("Erreur middleware auth :", error);
    res.status(401).json({ message: "Token introuvable ou expiré" });
  }
};
