import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const router = Router();

router.post("/upload", async (req, res) => {
  const { image } = req.body;

  const buffer = Buffer.from(image, "base64");
  cloudinary.uploader
    .upload_stream({ resource_type: "image" }, (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "An error occurred while uploading the image" });
      }
      res.json({ message: "Image received", imageUrl: result?.url });
    })
    .end(buffer);
});

export default router;
