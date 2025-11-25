import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import { GetFriendsList } from "../../controllers/steam/steamFriendscontrollers.js";

const router = express.Router();

// Récupération de la liste d'amis
router.get("/", authMiddleware, GetFriendsList);

export default router;
