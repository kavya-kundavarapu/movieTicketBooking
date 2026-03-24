// models/Movie.js
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: Number,
  genre: String,
  releaseDate: Date,
});

export default mongoose.models.Movie || mongoose.model("Movie", movieSchema);
