import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export const getImages = async (req: Request, res: Response) => {
  if (!process.env.RAILWAY_VOLUME_MOUNT_PATH) {
    return res.status(500).json({ message: "No existe variable de entorno" });
  }

  const dirPath = process.env.RAILWAY_VOLUME_MOUNT_PATH;

  try {
    const files = await fs.promises.readdir(dirPath);
    const imageFiles = files.filter(
      (file) => path.extname(file).toLowerCase() === ".jpg"
    );
    const imageUrls = imageFiles.map(
      (file) => `https://fam-api-production.up.railway.app/app/images/${file}`
    );
    console.log(imageUrls);
    res.status(200).json({ images: imageUrls });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al obtener las imágenes");
  }
};
