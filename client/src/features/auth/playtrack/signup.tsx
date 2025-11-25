import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";

export default function Signup() {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const { setUserId } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:5000/api/playtrack/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Utilisateur créer avec succès !");
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setUserId(String);
        navigate("/dashboard");
      } else {
        setMessage(data.message || "Erreur lors de la création");
      }
    } catch (err) {
      console.error("Erreur réseau", err);
      setMessage("Erreur serveur");
    }
  };
  useEffect(() => {
    if (message === "Utilisateur créer avec succès !") navigate("/Dashboard");
  }, [message, navigate]);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nom utilisateur"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Créer le compte</button>
        <p>{message}</p>
      </form>
    </>
  );
}
