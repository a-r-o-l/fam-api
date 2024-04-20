import { Router } from "express";
import { deleteApartment } from "../controllers/apartments/DELETE";
import { getApartment, getApartments } from "../controllers/apartments/GET";
import { createApartment } from "../controllers/apartments/POST";
import { updateApartment } from "../controllers/apartments/UPDATE";

const router = Router();

router.get("/apartments", getApartments);
router.post("/apartments", createApartment);
router.put("/apartments/:id", updateApartment);
router.delete("/apartments/:id", deleteApartment);
router.get("/apartments/:id", getApartment);

export default router;
