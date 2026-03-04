import { useState } from "react";


export default function Reset() {
  const [user, setUser] = useState({ email: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/playtrack/forgotPassword`,
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email: user.email }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Compte trouvé, email envoyé !");
        setUser({ email: "" });
      } else {
        setMessage(data.message || "Utilisateur non trouvé !");
      }
    } catch (err) {
      console.error("Erreur serveur", err);
      setMessage("Erreur réseau");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Votre email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        
          <button type="submit">Envoyer lien</button>
        
        <p>{message}</p>
      </form>
    </>
  );
}
