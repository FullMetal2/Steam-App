import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware.js";
import passport from "passport";

const router = express.Router();

router.get("/", authMiddleware, passport.authenticate("steam"));

export default router;
