import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { SteamUser } from "../../../shared/types/userSteam";

export default function useAuth() {
  const [user, setUser] = useState<SteamUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode<SteamUser>(token);
    setUser(decoded);
  }, []);
  return user;
}
