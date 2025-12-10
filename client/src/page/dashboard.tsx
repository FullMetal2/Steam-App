import { useState } from "react";
import GameCard from "../components/gameCard";
import GameUser from "../features/hooks/gameUser";
import SummarizeUser from "../features/hooks/summarizeSteam"
import SteamLoginButton from "../features/auth/steam/SteamLoginButton";
import SteamProfil from "../features/auth/steam/useAuthSteam";
import Sidebar from "../dashboard/Sidebar/Sidebar";
import type { SteamGame } from "../shared/types";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

function Timecreated(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString("fr-FR")
}

  function lastPlayed(mins: number) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("fr-FR");
  }

    function minutesToHours(mins: number) {
    return (mins / 60).toFixed(1);
  }

export default function User() {
  const [activeTab, setActiveTab] = useState("usersteam")
  const { user } = SteamProfil();
  const { games: ownedGames, gameCount } = GameUser();
  const { games: recentGames, totalCount } = SummarizeUser();



  if (!user) return <p>Chargement du profil...</p>;
  return (
    <>
      <header>
        <div className="container">
          <SteamLoginButton />
          <Sidebar setActiveTab={setActiveTab}/>
        
            <div>
              <img src={user.avatarfull} alt={user.personaname} />
              <h2>Bienvenue {user.personaname} 👋</h2>
              <p>Compte steam créer le : {Timecreated(user.timecreated)}</p>
              <p>Nombre de jeux total sur steam : {gameCount}</p>
              <p>Dernier jeux joué :</p> {recentGames.map((games: SteamGame) => (
                <ul key={games.appid}>
                  <li><img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${games.appid}/${games.img_icon_url}.jpg`} alt={games.name} /></li>
                  <li>{games.name}</li>
                  <li>{minutesToHours(games.playtime_2weeks)} h jouées les 2 dernière semaines</li>
                  <li>{minutesToHours(games.playtime_forever)} h jouées en tout</li>
                  
                </ul>
              ))}
              <p>Nombre de jeux dernièrement lancé : {totalCount}</p>
            </div>
          

          <a href="/">
            <button onClick={handleLogout}>Se déconnecter</button>
          </a>
        </div>
      </header>
      <main>
        {/* 
        {activeTab === "usersteam" && <UserSteam />}
        {activeTab === "library" && <Library />}
        {activeTab === "achievements" && <Achievements />}
        {activeTab === "friends" && <Friends />}
        {activeTab === "settings" && <Settings />} */}
        <article className="grid-container">
          {/* {games.map((games: SteamGame) => (
            <GameCard key={games.appid} game={games} />
          ))} */}
        </article>
      </main>
    </>
  );
}
