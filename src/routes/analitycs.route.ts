import { Router } from "express";
import {
  getAnalitycs,
  getAnalitycs2,
  getFeatures,
} from "../controllers/analitycs.controller";

const router = Router();

// router.get("/analitycs", getAnalitycs);
router.get("/analitycs", getAnalitycs2);
router.get("/analitycs/features", getFeatures);

export default router;
