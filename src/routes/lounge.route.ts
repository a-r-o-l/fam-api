import { Router } from "express";
import {
  createLounge,
  deleteLounge,
  getLounge,
  getLounges,
  updateLounge,
} from "../controllers/lounge.controller";

const router = Router();

router.get("/lounges", getLounges);
router.post("/lounges", createLounge);
router.put("/lounges/:id", updateLounge);
router.delete("/lounges/:id", deleteLounge);
router.get("/lounges/:id", getLounge);

export default router;
