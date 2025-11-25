import dotenv from "dotenv";
import passport from "passport";
import SteamStrategy from "passport-steam";

dotenv.config();

passport.use(
  new SteamStrategy(
    {
      returnURL: "http://localhost:5000/auth/steam/return",
      realm: "http://localhost:5000/",
      apiKey: process.env.STEAM_API_KEY,
    },
    (identifier, profile, done) => {
      profile.identifier = identifier;
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
