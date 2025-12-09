import dotenv from "dotenv";
import { FetchSteamProfil } from "../../services/steamService.js";

dotenv.config();

export const GetPlayerSummaries = async (req, res) => {
  try {
    const steamId = req.user.steam.steamid;

    const SteamProfil = await FetchSteamProfil(steamId);

    res.json({ user: SteamProfil });
  } catch (error) {
      console.error("Erreur dans la récupération du profil :", error);
      res.status(500).json({ message: "Erreur réseau" });
  }
}
