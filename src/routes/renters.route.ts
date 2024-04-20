import { Router } from "express";
import { deleteRenter } from "../controllers/renters/DELETE";
import {
  getRenter,
  getRenters,
  getRenterByContract,
} from "../controllers/renters/GET";
import { createRenter } from "../controllers/renters/POST";
import { updateRenter } from "../controllers/renters/UPDATE";

const router = Router();

router.get("/renters", getRenters);
router.post("/renters", createRenter);
router.put("/renters/:id", updateRenter);
router.delete("/renters/:id", deleteRenter);
router.get("/renters/:id", getRenter);
router.get("/renter/contract/:activeContractId", getRenterByContract);

export default router;
