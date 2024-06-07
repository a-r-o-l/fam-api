import { Router } from "express";
import { uploadImage } from "../controllers/uploads/POST";
import { deleteImage } from "../controllers/uploads/DELETE";
import { getImages } from "../controllers/uploads/GET";

const router = Router();

router.get("/uploads", getImages);
router.post("/uploads", uploadImage);
router.delete("/uploads/:imageUrl", deleteImage);

export default router;
