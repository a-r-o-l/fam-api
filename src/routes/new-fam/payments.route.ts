import { Router } from "express";
import {
  createPayment,
  getPayment,
  getPayments,
  deletePayment,
  updatePayment,
} from "../../controllers/new-fam/payments.controller";

const router = Router();

router.get("/payments", getPayments);
router.post("/payments", createPayment);
router.put("/payments/:id", updatePayment);
router.delete("/payments/:id", deletePayment);
router.get("/payments/:id", getPayment);

export default router;
