import dotenv from "dotenv";

dotenv.config();

export async function FetchSteamProfil(steamId) {
      try {
    const key = process.env.STEAM_API_KEY;
    const url = "https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=" +
      key +
      "&steamids=" +
      steamId;

        const response = await fetch(url);
        const data = await response.json();
        const profile =  data?.response?.players?.[0];
        return profile;

  } catch (error) {
    console.error("Erreur steam = ", error);
    console.error("Erreur lors de la récupération du profil");
  }
}

export async function FetchOwnedGames(steamId) {
    try {
        const key = process.env.STEAM_API_KEY;
        const url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=" +
      key +
      "&steamid=" +
      steamId +
      "&include_appinfo=true&include_played_free_games=true&format=json";

      const response = await fetch(url);
      const data = await response.json();
      const game_count = data?.response?.game_count || 0;
      const games = data?.response?.games || [];
      return { games, game_count }

    } catch (error) {
        console.error("Erreur steam = ", error);
        console.error("Erreur lors de la récupération des jeux");
    }
}