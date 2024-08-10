import { Router } from "express";
import {
  updatePayment,
  createPayment,
  deletePayment,
  getPayment,
  getPayments,
} from "../controllers/payments/payment.controller";

const router = Router();

router.get("/payments", getPayments);
router.post("/payments", createPayment);
router.put("/payments/:id", updatePayment);
router.delete("/payments/:id", deletePayment);
router.get("/payments/:id", getPayment);

export default router;
