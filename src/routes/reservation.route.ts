import { Router } from "express";
import {
  createReservation,
  deleteReservation,
  getReservation,
  getReservations,
  updateReservation,
} from "../controllers/reservation.controller";

const router = Router();

router.get("/reservation/:id", getReservation);
router.get("/reservation", getReservations);
router.post("/reservation", createReservation);
router.put("/reservation/:id", updateReservation);
router.delete("/reservation/:id", deleteReservation);

export default router;
