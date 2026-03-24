// pages/Booking.js
import { useState } from "react";
import { bookTicket } from "../services/api";

export default function Booking() {
  const [seat, setSeat] = useState("");
  const [status, setStatus] = useState("");

  const handleBook = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in first");
      if (!seat.trim()) throw new Error("Please enter a seat number");

      const res = await bookTicket(
        { showId: "123456", seatNumber: seat.trim() },
        token,
      );

      setStatus(`Booked with id ${res.data._id}`);
    } catch (err) {
      setStatus(err?.response?.data?.error || err?.message || "Booking failed");
    }
  };

  return (
    <div className="container mt-5">
      <label htmlFor="seat">Seat number</label>
      <input
        id="seat"
        value={seat}
        placeholder="Seat number"
        onChange={(e) => setSeat(e.target.value)}
      />
      <button onClick={handleBook}>Book Ticket</button>
      {status && <p>{status}</p>}
    </div>
  );
}
