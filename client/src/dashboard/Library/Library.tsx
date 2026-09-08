import { useState } from "react";
import type { SteamGame } from "../../shared/types";

  interface LibraryProps {
    games: SteamGame[];
    isLoading: boolean;
    error: string | null;
   }

export default function Library({ games, isLoading, error}: LibraryProps) {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"playtime" | "alpha" | "lastplayed">("playtime");


    const filteredGames = games 
        .filter(game => game.name?.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
            if (sortBy === "alpha") return (a.name ?? "").localeCompare(b.name ?? "");
            if (sortBy === "lastplayed") return (b.rtime_last_played ?? 0) - (a.rtime_last_played ?? 0);
            return b.playtime_forever - a.playtime_forever;
        })

    const toHours = (minutes: number) => Math.floor(minutes / 60);

    return(
        <>
        <section>
            <div>
                <input type="text" placeholder="Rechercher un jeux ..." value={search} onChange={(e) => setSearch(e.target.value)} />
                <span>{games.length} jeux</span>
            </div>
            <div>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value as "playtime" | "alpha" | "lastplayed")} aria-label="Trier les jeux">
                    <option value="playtime">Temps de jeux</option>
                    <option value="alpha">Alphabétique</option>
                    <option value="lastplayed">Dernière fois joué</option>
                </select>
            </div>
            <div>
                {isLoading ? (
                    <p>Chargement ...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : (
                    <div>
                        {filteredGames.map((game) => (
                            <div key={game.appid}>
                                <img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt={game.name} />
                                <p>{game.name}</p>
                                <p>{toHours(game.playtime_forever)}h jouées</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
        </>
    )
}