import { Router } from "express";
import {
  createAccount,
  deleteAccount,
  updateAccount,
} from "../controllers/account/account.controller";

const router = Router();

router.post("/account", createAccount);
router.put("/account/:accountId", updateAccount);
router.delete("/account/:accountId", deleteAccount);

export default router;
