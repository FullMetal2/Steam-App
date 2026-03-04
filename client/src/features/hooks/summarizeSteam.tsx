import { useEffect, useState } from "react";
import type { SteamGame } from "../../shared/types";

export default function useRecentlyPlayedGames(): { games: SteamGame[], totalCount: number, isLoading: boolean, error: string | null } {
    const [games, setRecentGames] = useState<SteamGame[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        //Appel au backend pour récupéré les jeux dernièrement joué
        const token = localStorage.getItem("token");
            if(!token) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/steam/summarize`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.games) {
                setRecentGames(data.games ?? []);
            }
                setTotalCount(data.total_count ?? 0)
                setIsLoading(false)
        })
        
        .catch((err) => {
        console.error("Erreur lors du chargement des jeux", err)
        setError("Erreur lors du chargement des jeux")
        setIsLoading(false)}
    )}, []);
    return { games, totalCount, error, isLoading}
}