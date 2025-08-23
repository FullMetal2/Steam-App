import { useEffect } from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [vanity, setVanity] = useState("");
  const [steamId, setSteamId] = useState("");

  return (
    <div>
      <h1>Steam app</h1>
      <label htmlFor="vanity">Pseudo</label>
      <input
        type="text"
        id="vanity"
        value={vanity}
        onChange={(e) => setVanity(e.target.value)}
      />
      <br />
      <button
        type="submit"
        onClick={() => {
          const url =
            "http://localhost:5000/resolveVanity?v=" +
            encodeURIComponent(vanity);
          console.log(url);
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              if (data?.response?.success === 1)
                setSteamId(data.response.steamid);
              else setSteamId("");
            })

            .catch((err) => {
              console.error("Erreur API :", err);
            });
        }}
      >
        Envoyer
      </button>
      <p>{steamId}</p>
    </div>
  );
}
export default App;
