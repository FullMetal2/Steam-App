import { useEffect, useState } from "react";

import type { SteamGame } from "../../shared/types";

export default function Game(): { games: SteamGame[] } {
  const [games, setGames] = useState<SteamGame[]>([]);
  useEffect(() => {
    // Appel à ton backend pour récupérer les jeux
    fetch("http://localhost:5000/api/steam/games")
      .then((res) => res.json())
      .then((data) => {
        if (data.response?.games) {
          setGames(data.response.games || []);
        }
      })
      .catch((err) =>
        console.error("Erreur lors du chargement des jeux :", err)
      );
  }, []);

  return { games };
}
