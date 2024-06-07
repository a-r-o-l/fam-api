import { Router } from "express";
import { uploadImage } from "../controllers/uploads/POST";
import { deleteImage } from "../controllers/uploads/DELETE";

const router = Router();

router.post("/uploads", uploadImage);
router.delete("/uploads/:imageUrl", deleteImage);

export default router;
