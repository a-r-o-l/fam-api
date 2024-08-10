import { Router } from "express";
import {
  createApt,
  deleteApt,
  getApt,
  getApts,
  updateApt,
} from "../controllers/apt.controller";

const router = Router();

router.get("/apts", getApts);
router.post("/apts", createApt);
router.put("/apts/:id", updateApt);
router.delete("/apts/:id", deleteApt);
router.get("/apts/:id", getApt);

export default router;
