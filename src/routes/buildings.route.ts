import { Router } from "express";
import { deleteBuilding } from "../controllers/buildings/DELETE";
import { getBuilding, getBuildings } from "../controllers/buildings/GET";
import { createBuilding } from "../controllers/buildings/POST";
import { updateBuilding } from "../controllers/buildings/UPDATE";

const router = Router();

router.get("/buildings", getBuildings);
router.post("/buildings", createBuilding);
router.put("/buildings/:id", updateBuilding);
router.delete("/buildings/:id", deleteBuilding);
router.get("/buildings/:id", getBuilding);

export default router;
