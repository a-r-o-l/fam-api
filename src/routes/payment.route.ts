import { Router } from "express";
import {
  getProperties,
  getProperty,
  createProperty,
  deleteProperty,
  updateProperty,
} from "../controllers/property.controller";
const router = Router();

router.get("/payment", getProperties);
router.get("/payment/:id", getProperty);
router.post("/payment", createProperty);
router.put("/payment/:id", updateProperty);
router.delete("/payment/:id", deleteProperty);

export default router;
