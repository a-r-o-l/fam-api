import { Router } from "express";
import { getAnalitycs } from "../controllers/analitycs/GET";

const router = Router();

router.get("/analitycs", getAnalitycs);

export default router;
