import { Router } from "express";
import {
  createAccount,
  deleteAccount,
  updateAccount,
  FindAccount,
} from "../controllers/account/account.controller";

const router = Router();

router.post("/account", createAccount);
router.put("/account/:accountId", updateAccount);
router.delete("/account/:accountId", deleteAccount);
router.get("/account/find/:search_params", FindAccount);

export default router;
