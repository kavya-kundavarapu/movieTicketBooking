// models/Show.js
import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  movieId: { type: mongoose.Types.ObjectId, required: true, ref: "Movie" },
  startTime: { type: Date, required: true },
  theater: String,
  totalSeats: Number,
});

export default mongoose.models.Show || mongoose.model("Show", showSchema);
