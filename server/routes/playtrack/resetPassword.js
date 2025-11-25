import express from "express";
import { resetPassword } from "../../controllers/playtrack/resetPasswordController.js";

const router = express.Router();

router.post("/", resetPassword);

export default router;
