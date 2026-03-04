function SteamLoginButton() {
  const token = localStorage.getItem("token");

  if (!token) {
    console.warn("⚠️ Aucun token trouvé, utilisateur non connecté");
  }

  const linkSteam = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/steam?token=${token}`;
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
