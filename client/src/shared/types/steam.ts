export interface SteamFriend {
  steamid: string;
  personaname: string;
  avatar: string;
  friend_since?: number;
}

export interface SteamAchievement {
  apiname: string;
  achieved: number;
  unlocktime: number;
}

export interface SteamStats {
  name: string;
  value: number;
}
