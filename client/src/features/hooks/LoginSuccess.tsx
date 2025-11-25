import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3️⃣ Rediriger vers la page User (ou dashboard)
    navigate("/dashboard");
  }, [navigate]);

  return <p>Connexion réussie ! Redirection en cours...</p>;
}
