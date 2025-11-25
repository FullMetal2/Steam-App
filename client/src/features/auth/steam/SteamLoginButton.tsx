function SteamLoginButton() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("⚠️ Aucun token trouvé, utilisateur non connecté");
  }

  const linkSteam = () => {
    window.location.href = `http://localhost:5000/api/auth/steam?token=${token}`;
    console.log(token);
  };

  return (
    <>
      <div className="container">
        <button onClick={linkSteam}>🔑 Associer mon compte Steam</button>
      </div>
    </>
  );
}

export default SteamLoginButton;
