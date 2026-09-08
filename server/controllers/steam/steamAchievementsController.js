import { FetchPlayerAchievements, FetchOwnedGames } from "../../services/steamService.js";

export const GetAchievements = async (req, res) => {
    try {
        const steamId = req.user.steam.steamid;

        const { games } =  await FetchOwnedGames(steamId);
        const recentGames = games
            .filter(g => g.rtime_last_played > 0)
            .sort((a, b) => b.rtime_last_played - a.rtime_last_played)
            .slice(0, 10); // Les 10 dernier jeux joué 

        const result = await Promise.all(
            recentGames.map(async (game) => {
                const achievements = await FetchPlayerAchievements(steamId, game.appid)
                console.log("appid:", game.appid, "achievements:", achievements.length, achievements[0])
                const unlocked = achievements.filter(a => a.achieved === 1);
                const lastThree = unlocked
                    .sort((a, b) => b.unlocktime - a.unlocktime)
                    .slice(0, 3);
                const percentage = achievements.length > 0
                    ? Math.round((unlocked.length / achievements.length) * 100)
                    : 0;

                return {
                    appid: game.appid,
                    name: game.name,
                    img_icon_url: game.img_icon_url,
                    percentage,
                    lastThree,
                };
            })
        );
        res.json({ games: result });
    } catch (error) {
        console.error("Erreur des succès :", error);
        res.status(500).json({ message: "Erreur réseau"})
    }
};