import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

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

const storage = multer.diskStorage({
  destination: process.env.RAILWAY_VOLUME_MOUNT_PATH,
  filename: function (req, file, cb) {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage: storage });

export const uploadImage = [
  upload.single("image"),

  (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(500).json({
        message: "Error al cargar el archivo",
      });
    }
    if (!process.env.RAILWAY_VOLUME_MOUNT_PATH) {
      return res.status(500).json({ message: "No existe variable de entorno" });
    }

    const imageUrl = `https://fam-api-production.up.railway.app${req.file.path}`;
    res.json({
      message: "Archivo cargado con éxito",
      imageUrl,
      file: req.file,
    });
  },
];

export const deleteImage = async (req: Request, res: Response) => {
  if (!process.env.RAILWAY_VOLUME_MOUNT_PATH) {
    return res.status(500).json({ message: "No existe variable de entorno" });
  }
  const imagePath = path.join(
    process.env.RAILWAY_VOLUME_MOUNT_PATH,
    req.params.imageUrl
  );

  try {
    await fs.promises.unlink(imagePath);
    res.status(200).json({ message: "Imagen eliminada con éxito" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error al eliminar la imagen");
  }
};
