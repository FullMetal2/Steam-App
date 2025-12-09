import { useState } from "react";
import GameCard from "../components/gameCard";
import GameUser from "../features/hooks/gameUser";
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

export default function User() {
  const [activeTab, setActiveTab] = useState("usersteam")
  const { user } = SteamProfil();
  const { games } = GameUser();
  const { gameCount } = GameUser();

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
