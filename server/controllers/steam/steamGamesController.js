import dotenv from "dotenv";

dotenv.config();

export const GetOwnedGames = async (req, res) => {
  try {
    const key = process.env.STEAM_API_KEY;
    const userSteamId = req.user.steam?.steamid;

    if (!userSteamId)
      return res.status(400).json({ message: "Utilisateur steam introuvable" });

    const url =
      "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" +
      key +
      "&steamid=" +
      userSteamId +
      "&include_appinfo=true&format=json";

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({ games: data.response?.games || [] });
  } catch (error) {
    console.error("Erreur dans la récupération des jeux :", error);
    res.status(500).json({ message: "Erreur réseau" });
  }
};
