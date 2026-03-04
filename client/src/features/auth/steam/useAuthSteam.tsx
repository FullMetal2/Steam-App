import { useEffect, useState } from "react";
import type { SteamUser } from "../../../shared/types/userSteam";

export default function useAuthSteam() {
  const [user, setUser] = useState<SteamUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/steam/profil`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        }
        setIsLoading(false)
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du profil Steam", err)
        setIsLoading(false)
        setError("Erreur lors du chargement du profil Steam")
      });
  }, []);
  return { user, error, isLoading };
}
