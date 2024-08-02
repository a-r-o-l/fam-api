import { Router } from "express";
import {
  createApartment,
  deleteApartment,
  getApartment,
  getApartments,
  updateApartment,
} from "../controllers/apartment.controller";

const router = Router();

router.get("/apartment", getApartments);
router.get("/apartment/:id", getApartment);
router.post("/apartment", createApartment);
router.put("/apartment/:id", updateApartment);
router.delete("/apartment/:id", deleteApartment);

export default router;
