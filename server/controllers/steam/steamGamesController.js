import { FetchOwnedGames } from "../../services/steamService.js";

export const GetOwnedGames = async (req, res) => {
  try {
    const steamId = req.user.steam.steamid;

    const { games, game_count } = await FetchOwnedGames(steamId);

    res.json({ games, game_count });
  } catch (error) {
    console.error("Erreur dans la récupération des jeux :", error);
    res.status(500).json({ message: "Erreur réseau" });
  }
};
