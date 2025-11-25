import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth();
  const { setUserId } = useAuth();

  useEffect(() => {
    setIsLoggedIn(true);

    // 3️⃣ Rediriger vers la page User (ou dashboard)
    navigate("/dashboard");
  }, [setIsLoggedIn, setUserId, navigate]);

  return <p>Connexion réussie ! Redirection en cours...</p>;
}
