// controllers/bookingController.js
import mongoose from "mongoose";
import Booking from "../models/Booking.js";

export const bookTicket = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { showId, seatNumber } = req.body;
    const userId = req.user.id;

    if (!showId || !seatNumber) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ error: "showId and seatNumber are required" });
    }

    const booking = await Booking.create(
      [
        {
          userId,
          showId,
          seatNumber,
          status: "pending",
          expiresAt: new Date(Date.now() + 5 * 60 * 1000),
        },
      ],
      { session },
    );

    booking[0].status = "confirmed";
    await booking[0].save({ session });

    await session.commitTransaction();
    res.status(201).json(booking[0]);
  } catch (err) {
    await session.abortTransaction();

    if (err.code === 11000) {
      return res.status(409).json({ error: "Seat already booked" });
    }

    res.status(500).json({ error: "Booking failed", details: err.message });
  } finally {
    session.endSession();
  }
};
