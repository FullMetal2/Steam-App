import Login from "../features/auth/playtrack/login";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <>
      <h1>PlayTrack</h1>
      <h2>Se connecter</h2>
      <Login /> <br />
      <Link to="/forgotPasswordPage">Modifier mot de passe</Link>
    </>
  );
}
