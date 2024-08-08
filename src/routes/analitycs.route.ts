import { Router } from "express";
import { getAnalitycs, getAnalitycs2 } from "../controllers/analitycs/GET";

const router = Router();

// router.get("/analitycs", getAnalitycs);
router.get("/analitycs", getAnalitycs2);

export default router;
