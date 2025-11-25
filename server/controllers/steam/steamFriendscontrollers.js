import dotenv from "dotenv";

dotenv.config();

export const GetFriendsList = async (req, res) => {
  try {
    const key = process.env.STEAM_API_KEY;
    const userSteamId = req.user.steam?.steamid;
    const url =
      " http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=" +
      key +
      "&steamid=" +
      userSteamId +
      "&relation=ami";

    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json({ friends: data.response?.friends });
  } catch (error) {
    console.error("Erreur dans la récupération de la liste d'amis");
    res.status(500).json({ message: " Erreur réseau" });
  }
};
