import type { SteamGame } from "../../shared/types";
import SteamLoginButton from "../../features/auth/steam/SteamLoginButton";
import SummarizeUser from "../../features/hooks/summarizeSteam"
import SteamProfil from "../../features/auth/steam/useAuthSteam";

function Timecreated(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("fr-FR")
}

    function minutesToHours(mins: number) {
    return (mins / 60).toFixed(1);
  }

  interface UserSteamProps {
    gameCount: number;
    isLoading: boolean;
  }

export default function User({ gameCount, isLoading }: UserSteamProps) {
  const { user } = SteamProfil();
  const { games: recentGames, totalCount } = SummarizeUser();



  if (!user) return <p>Chargement du profil...</p>;
  return (
    <>
      <header>
        <div className="container">
          <SteamLoginButton />
          
        
            <div>
              <img src={user.avatarfull} alt={user.personaname} />
              <h2>Bienvenue {user.personaname} 👋</h2>
              <p>Compte steam créer le : {Timecreated(user.timecreated)}</p>
              <p>Nombre de jeux total sur steam : {isLoading ? "Chargement... " : gameCount}</p>
              <p>Dernier jeux joué :</p> {recentGames.map((games: SteamGame) => (
                <ul key={games.appid}>
                  <li><img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${games.appid}/${games.img_icon_url}.jpg`} alt={games.name} /></li>
                  <li>{games.name}</li>
                  <li>{minutesToHours(games.playtime_2weeks ?? 0)} h jouées les 2 dernière semaines</li>
                  <li>{minutesToHours(games.playtime_forever)} h jouées en tout</li>
                  
                </ul>
              ))}
              <p>Nombre de jeux dernièrement lancé : {totalCount}</p>
            </div>
            </div>
            </header>
    </>
)}