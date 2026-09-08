import { useEffect, useState } from "react";
import type { GameAchievements } from "../../shared/types/game";

export default function useAchievements(): {games: GameAchievements[], isLoading: boolean, error: string | null } {
    const [games, setGames] = useState<GameAchievements[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
 
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/steam/achievements`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json"
            },    
        })
        .then((res) => res.json())
        .then((data) => {
            setGames(data.games ?? []);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Erreur achievements :", err);
            setError("Erreur lors du chargement des succès");
            setIsLoading(false);
        });
    }, []);
    return {games, isLoading, error};
}