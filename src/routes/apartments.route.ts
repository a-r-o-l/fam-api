import { Router } from "express";
import {
  createApartment,
  deleteApartment,
  getApartment,
  getApartments,
  updateApartment,
} from "../controllers/apartments/apartment.controller";

const router = Router();

router.get("/apartments", getApartments);
router.post("/apartments", createApartment);
router.put("/apartments/:id", updateApartment);
router.delete("/apartments/:id", deleteApartment);
router.get("/apartments/:id", getApartment);

export default router;
