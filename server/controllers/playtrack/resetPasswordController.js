import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../../models/User.js";

dotenv.config();

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.RESET_SECRET);
    const user = await User.findById(decoded.id);
    if (!user)
      return res.status(404).json({ message: "Utilisateur non trouvé" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Mot de passe mis a jours !" });
  } catch (err) {
    console.error("Erreur token", err);
    res.status(400).json({ message: "Token invalide ou expiré" });
  }
};
