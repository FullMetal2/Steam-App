import { FetchRecentlyPlayedGmaes } from "../../services/steamService.js";

export const RecentlyPlayedGmes = async (req, res) => {
    try {
        const steamId = req.user.steam.steamid;
        const { total_count, games } = await FetchRecentlyPlayedGmaes(steamId);

        res.json({ total_count, games });
    } catch (error) {
        console.error("Erreur lors de la récupération des jeux")
        res.status(500).json({message: "Erreur réseau"})
    }
};