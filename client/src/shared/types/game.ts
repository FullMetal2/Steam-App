export interface SteamGame {
  appid: number;
  game_count: number;
  total_count: number;
  name?: string;
  playtime_forever: number;
  playtime_2weeks?: number;
  rtime_last_played?: number;
  img_icon_url: string;
  img_logo_url?: string;
  has_community_visible_stats?: boolean;
}

export interface GameDetails extends SteamGame {
  genres?: string[];
  developers?: string[];
  publishers?: string[];
  release_date?: string;
  description?: string;
}
