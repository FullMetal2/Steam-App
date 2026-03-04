import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

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

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_MAILTRAP,
        pass: process.env.MDP_MAILTRAP,
      },
    });

    const resetlink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

    await transport.sendMail({
      from: '"PlayTrack" <contact@j2bdev.fr>',
      to: email,
      subject: "Lien de réinitialisation de mot de passe",
      text: "Voici le lien pour réinitialiser votre mot de passe (expire dans 15 minutes)",
      html: `<p>Voici le lien pour réinitialiser votre mot de passe, ce lien expire dans 15 minutes. <a href="${resetlink}">Cliquez ici</a></p>`,
    });

    res.status(200).json({ message: "Lien envoyé" });
  } catch (error) {
    console.error("Erreur forgotPassword :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
