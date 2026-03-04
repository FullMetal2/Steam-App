import { useEffect, useState } from "react";

import type { SteamGame } from "../../shared/types";

export default function useGame(): { games: SteamGame[], gameCount: number, error: null | string, isLoading: boolean } {
  const [games, setGames] = useState<SteamGame[]>([]);
  const [gameCount, setGameCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Appel à ton backend pour récupérer les jeux
    const token = localStorage.getItem("token");
      if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/steam/games`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.games) {
          setGames(data.games ?? [])
          
        }
          setGameCount(data.game_count ?? 0)
          setIsLoading(false)
        })
      .catch((err) => {
        console.error("Erreur lors du chargement des jeux :", err)
        setIsLoading(false)
        setError("Erreur lors du chargement des jeux")}
      );
  }, []);

  return { games, gameCount, error, isLoading };
}
