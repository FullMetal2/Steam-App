import useAchievements from "../../features/hooks/useAchievements";


export default function Achievements() {
    const { games, isLoading, error } = useAchievements();

  if (isLoading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
        <h2>Vos succès</h2>
      {games.map((game) => (
        <div key={game.appid}>
          <img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt={game.name} />
          <p>{game.name}</p>
          <p>{game.percentage}% complété</p>
          {game.lastThree.map((achievement) => (
            <div key={achievement.apiname}>
              <p>{achievement.apiname}</p>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}