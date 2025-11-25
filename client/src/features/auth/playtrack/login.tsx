import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../useAuth";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "http://localhost:5000/api/playtrack/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Connexion en cours");
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);

        navigate("/dashboard");
      } else {
        setMessage(data.message || "Login ou mot de passe incorrecte");
      }
    } catch (err) {
      console.error("Erreur réseau", err);
      setMessage("Erreur serveur");
    }
  };
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
          type="password"
          placeholder="Mot de passe"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Connexion</button>
        <p>{message}</p>
      </form>
    </>
  );
}
