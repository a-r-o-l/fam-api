import { Router } from "express";
import { deletePayment } from "../controllers/payments/DELETE";
import { getPayment, getPayments } from "../controllers/payments/GET";
import { createPayment } from "../controllers/payments/POST";
import { updatePayment } from "../controllers/payments/UPDATE";

const router = Router();

router.get("/payments", getPayments);
router.post("/payments", createPayment);
router.put("/payments/:id", updatePayment);
router.delete("/payments/:id", deletePayment);
router.get("/payments/:id", getPayment);

export default router;
