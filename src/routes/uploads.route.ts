import { Router } from "express";
import { uploadImage } from "../controllers/uploads/POST";

const router = Router();

router.post("/uploads", uploadImage);

export default router;
