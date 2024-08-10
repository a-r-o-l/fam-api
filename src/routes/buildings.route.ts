import { Router } from "express";
import {
  createBuilding,
  deleteBuilding,
  getBuilding,
  getBuildings,
  updateBuilding,
} from "../controllers/building.controller";

const router = Router();

router.get("/buildings", getBuildings);
router.post("/buildings", createBuilding);
router.put("/buildings/:id", updateBuilding);
router.delete("/buildings/:id", deleteBuilding);
router.get("/buildings/:id", getBuilding);

export default router;
