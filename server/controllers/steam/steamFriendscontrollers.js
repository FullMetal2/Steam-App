import dotenv from "dotenv";

dotenv.config();

export const GetFriendsList = async (req, res) => {
  try {
    const key = process.env.STEAM_API_KEY;
    const userSteamId = req.user.steam?.steamid;
    const url =
      "http://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=" +
      key +
      "&steamid=" +
      userSteamId +
      "&relation=friend";

    const response = await fetch(url);
    const data = await response.json();
    const friendsData = data.friendslist.friends || [];

    const steamIds = friendsData.map((f) => f.steamid).join(",");

    const profilesUrl = `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamIds}`;

    const profilesResponse = await fetch(profilesUrl);
    const profilesData = await profilesResponse.json();
    const friends = profilesData.response?.players || [];

    res.status(200).json({ friends });
  } catch (error) {
    console.error("Erreur dans la récupération de la liste d'amis");
    res.status(500).json({ message: " Erreur réseau" });
  }
};
