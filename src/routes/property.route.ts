import { Router } from "express";
import {
  getProperties,
  getProperty,
  createProperty,
  deleteProperty,
  updateProperty,
} from "../controllers/property.controller";
const router = Router();

router.get("/property", getProperties);
router.get("/property/:id", getProperty);
router.post("/property", createProperty);
router.put("/property/:id", updateProperty);
router.delete("/property/:id", deleteProperty);

export default router;
