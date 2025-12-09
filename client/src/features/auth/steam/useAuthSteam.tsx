import { useEffect, useState } from "react";
import type { SteamUser } from "../../../shared/types/userSteam";

export default function useAuthSteam() {
  const [user, setUser] = useState<SteamUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/steam/profil", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du profil Steam", err);
      });
  }, []);
  return { user };
}
