import { useEffect, useState } from "react";
import type { SteamGame } from "../../shared/types";

export default function RecentlyPlayedGames(): { games: SteamGame[], totalCount: number } {
    const [games, setRecentGames] = useState<SteamGame[]>([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        //Appel au backend pour récupéré les jeux dernièrement joué
        const token = localStorage.getItem("token");
            if(!token) return;

        fetch("http://localhost:5000/api/steam/summarize", {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then((data) => {
            if(data.games) {
                setRecentGames(data.games ?? []);
            }
                setTotalCount(data.total_count ?? 0)
        })
        .catch((err) => 
        console.error("Erreur lors du chargement des jeux", err));
    }, []);
    return { games, totalCount}
}