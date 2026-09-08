import type { SteamFriend } from "../../shared/types";
import { useState, useEffect } from "react";

export default function useFriends(): { friends: SteamFriend[], isLoading: boolean, error: string | null } {
    const [friends, setFriends] = useState<SteamFriend []>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null> (null);

        useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        fetch(`${import.meta.env.VITE_API_URL}/api/steam/friends`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            setFriends(data.friends ?? []);
            setIsLoading(false);
        })
        .catch((err) => {
            console.error("Erreur amis :", err);
            setError("Erreur lors du chargement des amis");
            setIsLoading(false);
        });
    }, []);


    return { friends, isLoading, error }
}