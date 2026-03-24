// routes/bookingRoutes.js
import express from "express";
import auth from "../middleware/auth.js";
import { bookTicket } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/book", auth, bookTicket);

export default router;
