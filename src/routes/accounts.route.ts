import { Router } from "express";
import {
  createAccount,
  deleteAccount,
  updateAccount,
  FindAccount,
  createNewPassword,
  checkPassword,
  changePassword,
} from "../controllers/account/account.controller";

const router = Router();

router.post("/account", createAccount);
router.put("/account/:accountId", updateAccount);
router.delete("/account/:accountId", deleteAccount);
router.get("/account/find/:search_params", FindAccount);

router.post("/account/password/:accountId", createNewPassword);

router.post("/account/password/check/:accountId", checkPassword);

router.put("/account/password/:accountId", changePassword);
export default router;
