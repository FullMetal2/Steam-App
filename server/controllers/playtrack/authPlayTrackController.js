import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/User.js";

export const signup = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({ message: "Utilisateur créer !" });
  } catch (error) {
    console.error("Erreur lors de la création user :", error);
    return res.status(400).json({ error });
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "Login incorrecte" });
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid)
      return res.status(401).json({ message: "Mot de passe incorrecte" });

    res.status(200).json({
      token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "2h",
      }),
    });
  } catch (error) {
    console.error("[LOGIN] error :", error);
    return res.status(500).json({ error });
  }
};
