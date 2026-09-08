import useFriends from "../../features/hooks/useFriends";

export default function Friends() {
  const { friends, isLoading, error } = useFriends();

  if (isLoading) return <p>Chargement ...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <h2>Vos amis</h2>
      {friends.map((friends) => (
        <div key={friends.steamid}>
          <img src={friends.avatar} alt={friends.personaname}></img>
          <p>{friends.personaname}</p>
          <p>{friends.friend_since}</p>
        </div>
      ))}
    </>
  );
}
