import { Router } from "express";
import {
  createPreference,
  createSubscription,
  getSubscriptions,
} from "../controllers/suscriptions/subscriptions.controller";

const router = Router();

router.post("/preference", createPreference);
router.post("/subscription", createSubscription);
router.get("/subscription", getSubscriptions);

export default router;
