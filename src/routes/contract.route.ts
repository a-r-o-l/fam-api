import { Router } from "express";
import {
  createContract,
  deleteContract,
  getContracts,
  getContract,
  updateContract,
} from "../controllers/contract.controller";
const router = Router();

router.get("/contract", getContracts);
router.get("/contract/:id", getContract);
router.post("/contract", createContract);
router.put("/contract/:id", updateContract);
router.delete("/contract/:id", deleteContract);

export default router;
