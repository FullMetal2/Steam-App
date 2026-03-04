import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [form, setForm] = useState({ newPassword: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/playtrack/resetPassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: form.newPassword }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Mot de passe modifié !");
        setForm({ newPassword: "" });
        setTimeout(() => navigate("/loginPage"), 1500);
      } else {
        setMessage(
          data.message || "Erreur dans la modification du mot de passe"
        );
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
          type="password"
          placeholder="Nouveau mot de passe"
          value={form.newPassword}
          onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
        />
        <button type="submit">Modifier le mot de passe</button>
        <p>{message}</p>
      </form>
    </>
  );
}
