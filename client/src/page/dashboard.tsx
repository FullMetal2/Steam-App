import GameCard from "../components/gameCard";
import GameUser from "../features/hooks/gameUser";
import useAuthSteam from "../features/auth/steam/useAuthSteam";
import SteamLoginButton from "../features/auth/steam/SteamLoginButton";
import type { SteamGame } from "../shared/types";

const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.reload();
};

export default function User() {
  const user = useAuthSteam();
  const { games } = GameUser();

  if (!user) return <p>Chargement du profil...</p>;
  return (
    <>
      <header>
        <div className="container">
          <SteamLoginButton />
          {user && (
            <div>
              <img src={user.avatar} alt={user.personaname} />
              <h2>Bienvenue {user.personaname} 👋</h2>
            </div>
          )}

          <a href="/">
            <button onClick={handleLogout}>Se déconnecter</button>
          </a>
        </div>
      </header>
      <main>
        <article className="grid-container">
          {games.map((games: SteamGame) => (
            <GameCard key={games.appid} game={games} />
          ))}
        </article>
      </main>
    </>
  );
}
