import express from "express";
import { RecentlyPlayedGmes } from "../../controllers/steam/steamSummarizeUser.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

//Récupération des jeux
router.get("/", authMiddleware, RecentlyPlayedGmes);

export default router;