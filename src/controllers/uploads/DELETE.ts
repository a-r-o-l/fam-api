import fs from "fs";
import path from "path";
import { Request, Response } from "express";

export const deleteImage = (req: Request, res: Response) => {
  if (!process.env.RAILWAY_VOLUME_MOUNT_PATH) {
    return res.status(500).json({ message: "No existe variable de entorno" });
  }
  const imagePath = path.join(
    process.env.RAILWAY_VOLUME_MOUNT_PATH,
    req.params.imageUrl
  );

  fs.unlink(imagePath, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error al eliminar la imagen");
    } else {
      res.status(200).json({ message: "Imagen eliminada con éxito" });
    }
  });
};
