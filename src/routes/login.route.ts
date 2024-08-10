import { Router } from "express";
import { loginUser, getRefreshToken } from "../controllers/login.controller";

const router = Router();

router.post("/login", loginUser);
router.post("/refreshtoken", getRefreshToken);

export default router;
