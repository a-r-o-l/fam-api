import { Router } from "express";
import {
  deleteContract,
  cancelContract,
  createContract,
  getContract,
  getContracts,
  updateContract,
} from "../controllers/contract.controller";

const router = Router();

router.get("/contracts", getContracts);
router.post("/contracts", createContract);
router.post("/contracts/cancel", cancelContract);
router.put("/contracts/:id", updateContract);
router.delete("/contracts/:id", deleteContract);
router.get("/contracts/:id", getContract);

export default router;
