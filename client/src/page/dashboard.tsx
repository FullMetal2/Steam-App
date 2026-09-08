import { useState } from "react";
import Sidebar from "../dashboard/Sidebar/Sidebar";
import Library from "../dashboard/Library/Library";
import UserSteam from "../dashboard/UserSteam/Usersteam";
import Achievements from "../dashboard/Achievements/Achievements";
import Friends from "../dashboard/Friends/Friends";
import Settings from "../dashboard/Settings/Settings";
import useGame from "../features/hooks/gameUser";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

export default function Dashboard() {
  const { games, gameCount, isLoading, error } = useGame();
  const [activeTab, setActiveTab] = useState("usersteam");
  return (
    <>
      <Sidebar setActiveTab={setActiveTab} />
      <div>
        <a href="/">
          <button onClick={handleLogout}>Se déconnecter</button>
        </a>
      </div>

      <main>
        {activeTab === "usersteam" && (
          <UserSteam gameCount={gameCount} isLoading={isLoading} />
        )}
        {activeTab === "library" && (
          <Library games={games} isLoading={isLoading} error={error} />
        )}
        {activeTab === "achievements" && <Achievements />}
        {activeTab === "friends" && <Friends />}
        {activeTab === "settings" && <Settings />}
        <article className="grid-container">
          {/* {games.map((games: SteamGame) => (
            <GameCard key={games.appid} game={games} />
          ))} */}
        </article>
      </main>
    </>
  );
}
