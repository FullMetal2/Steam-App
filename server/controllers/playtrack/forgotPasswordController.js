import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(404).json({ message: " Utilisateur introuvable" });

  const token = jwt.sign(
    {
      id: user._id,

      timestamp: Date.now(),
    },
    process.env.RESET_SECRET,
    {
      expiresIn: "15m",
    }
  );
  // Faire le code pour envoyé l'email avec nodemailer !!
  const resetlink = `http://localhost.5173/api/playtrack/resetPassword?token=${token}`;
  res.status(200).json({ message: "Lien envoyé", token });
};
