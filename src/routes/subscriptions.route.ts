import { Router } from "express";
import {
  createPreference,
  createSubscription,
  getSubscriptions,
  deleteSubscriptions,
} from "../controllers/subscriptions.controller";

const router = Router();

router.post("/preference", createPreference);
router.post("/subscription", createSubscription);
router.get("/subscription", getSubscriptions);
router.delete("/subscription/:subscriptionId", deleteSubscriptions);

export default router;
