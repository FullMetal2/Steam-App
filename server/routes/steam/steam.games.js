import express from "express";
import { GetOwnedGames } from "../../controllers/steam/steamGamesController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// Récupération des jeux
router.get("/", authMiddleware, GetOwnedGames);

export default router;
