import { Router } from "express";
import {
  getImages,
  deleteImage,
  uploadImage,
} from "../controllers/uploads/upload.controller";

const router = Router();

router.get("/uploads", getImages);
router.post("/uploads", uploadImage);
router.delete("/uploads/:imageUrl", deleteImage);

export default router;
