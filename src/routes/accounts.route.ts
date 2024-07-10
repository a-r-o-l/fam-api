import { Router } from "express";
import {
  createAccount,
  deleteAccount,
} from "../controllers/account/account.controller";

const router = Router();

router.post("/account", createAccount);
router.delete("/account/:accountId", deleteAccount);

export default router;
