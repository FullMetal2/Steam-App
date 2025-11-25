import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="container">
        <h1 className="title">PlayTrack</h1>
        <p>La passion du jeux</p>
        <div className="button">
          <Link to="/loginPage">Se connecter</Link> <br />
          <Link to="/signupPage">Créer un compte</Link>
        </div>
      </div>
    </>
  );
}

export default Home;
