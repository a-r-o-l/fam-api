import { Router } from "express";
import { createContract, cancelContract } from "../controllers/contracts/POST";
import { getContract, getContracts } from "../controllers/contracts/GET";
import { updateContract } from "../controllers/contracts/UPDATE";
import { deleteContract } from "../controllers/contracts/DELETE";

const router = Router();

router.get("/contracts", getContracts);
router.post("/contracts", createContract);
router.post("/contracts/cancel", cancelContract);
router.put("/contracts/:id", updateContract);
router.delete("/contracts/:id", deleteContract);
router.get("/contracts/:id", getContract);

export default router;
