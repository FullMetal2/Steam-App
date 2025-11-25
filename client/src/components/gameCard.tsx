import type { SteamGame } from "../shared/types";

interface GameCardProps {
  game: SteamGame;
}

function GameCard({ game }: GameCardProps) {
  const iconUrl = `https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`;
  const storeUrl = `https://store.steampowered.com/app/${game.appid}`;

  function minutesToHours(mins: number) {
    return (mins / 60).toFixed(1);
  }

  function lastPlayed(timestamp: number) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("fr-FR");
  }

  return (
    <>
      <a href={storeUrl} target="_blank" rel="noopener noreferrer">
        <div className="cards">
          <img src={iconUrl} alt={game.name} width={50} />

          <h3>{game.name}</h3>
          <p>
            ⏱️ {minutesToHours(game.playtime_forever)} h jouées — 🗓️ Dernière
            fois joué : {lastPlayed(game.rtime_last_played)}
          </p>
        </div>
      </a>
    </>
  );
}
export default GameCard;
