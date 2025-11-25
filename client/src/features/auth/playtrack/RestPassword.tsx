import { useState } from "react";
import { useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const [form, setForm] = useState({ newPassword: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDfeault();

    try {
      const res = await fetch(
        "http://localhost:5000/api/playtrack/resetPassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, newPassword: form.newPassword }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Mot de passe modifieé !");
        setForm({ newPassword: "" });
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
