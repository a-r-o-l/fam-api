import { Router } from "express";
import { webhook } from "../controllers/suscriptions/subscriptions.controller";

const router = Router();

router.post("/webhook", webhook);

export default router;
