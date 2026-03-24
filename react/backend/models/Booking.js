// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    showId: { type: mongoose.Types.ObjectId, required: true, ref: "Show" },
    seatNumber: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "failed"],
      default: "pending",
    },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true },
);

bookingSchema.index({ userId: 1, showId: 1, seatNumber: 1 }, { unique: true });
bookingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Booking ||
  mongoose.model("Booking", bookingSchema);
