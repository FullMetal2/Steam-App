import dotenv from "dotenv";

dotenv.config();

export const GetPlayerSummaries = async (req, res) => {
  try {
    const key = process.env.STEAM_API_KEY;
    const userSteamId = req.user.steam?.steamid;

    if (!userSteamId)
      res.status(401).json({ message: "Utilisateur introuvable" });

    const url =
      "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" +
      key +
      "&steamid=" +
      userSteamId;

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({ profil: data.response?.profil });
  } catch (error) {
    console.error("Erreur lors de la récupération du profil");
    res.status(500).json({ message: "Erreur réseau" });
  }
};
