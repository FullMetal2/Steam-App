import dotenv from "dotenv";
import passport from "passport";
import SteamStrategy from "passport-steam";

dotenv.config();

passport.use(
  new SteamStrategy(
    {
      returnURL: `${process.env.SERVER_URL}/api/auth/steam/return`,
      realm: `${process.env.SERVER_URL}`,
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
