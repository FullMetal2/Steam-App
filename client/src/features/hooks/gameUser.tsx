import { useEffect, useState } from "react";

import type { SteamGame } from "../../shared/types";

export default function Game(): { games: SteamGame[], gameCount: number } {
  const [games, setGames] = useState<SteamGame[]>([]);
  const [gameCount, setGameCount] = useState(0);

  useEffect(() => {
    // Appel à ton backend pour récupérer les jeux
    const token = localStorage.getItem("token");
      if (!token) return;

    fetch("http://localhost:5000/api/steam/games", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.games) {
          setGames(data.games ?? []);
        }
          setGameCount(data.game_count ?? 0)
        })
      .catch((err) =>
        console.error("Erreur lors du chargement des jeux :", err)
      );
  }, []);

  return { games, gameCount };
}
