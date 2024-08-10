import { Router } from "express";
import {
  updateRenter,
  createRenter,
  deleteRenter,
  getRenter,
  getRenterByContract,
  getRenters,
} from "../controllers/renter.controller";

const router = Router();

router.get("/renters", getRenters);
router.post("/renters", createRenter);
router.put("/renters/:id", updateRenter);
router.delete("/renters/:id", deleteRenter);
router.get("/renters/:id", getRenter);
router.get("/renter/contract/:activeContractId", getRenterByContract);

export default router;
