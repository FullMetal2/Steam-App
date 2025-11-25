import mongoose from "mongoose";

const { Schema } = mongoose;

const SteamSchema = new Schema({
  steamid: String,
  personaname: String,
  avatar: String,
  linkedAt: { type: Date, default: Date.now },
});

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    steam: { type: SteamSchema, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
