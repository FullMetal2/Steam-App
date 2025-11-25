import express from "express";
import { forgotPassword } from "../../controllers/playtrack/forgotPasswordController.js";

const router = express.Router();

router.post("/", forgotPassword);

export default router;
