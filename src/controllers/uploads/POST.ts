import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

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
    if (!req.file || !process.env.RAILWAY_VOLUME_MOUNT_PATH) {
      return res.status(500).json({ message: "Error al cargar el archivo" });
    }

    const filePath = path.join(
      process.env.RAILWAY_VOLUME_MOUNT_PATH,
      req.file.filename
    );
    const imageUrl = `${req.protocol}://${req.get("host")}/${filePath}`;

    res.json({ message: "Archivo cargado con éxito", imageUrl: imageUrl });
  },
];
