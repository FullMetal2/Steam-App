import express from "express";
import { GetAchievements } from "../../controllers/steam/steamAchievementsController.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, GetAchievements);

export default router;