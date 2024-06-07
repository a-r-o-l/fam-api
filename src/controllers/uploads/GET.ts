import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export const getImages = async (req: Request, res: Response) => {
  const directoryPath = process.env.RAILWAY_MOUNT_PATH || "./app/images";
  try {
    const files = await fs.promises.readdir(directoryPath);
    const images = files.map(
      (file) => `https://fam-api-production.up.railway.app/app/images/${file}`
    );
    res.json(images);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al leer el directorio de imágenes");
  }
};
