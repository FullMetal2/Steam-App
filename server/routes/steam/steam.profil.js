import express from "express";
import { GetPlayerSummaries } from "../../controllers/steam/steamProfilControllers.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Récupération du Profil
router.get("/", authMiddleware, GetPlayerSummaries);

export default router;
