import { Request, Response } from "express";
import { Renter } from "../models/Renter";
import { Model } from "sequelize"; // Import the Model type from Sequelize
import { v2 as cloudinary } from "cloudinary";

type Renter = {
  name: string;
  lastname: string;
  dni: string;
  tel: string;
  apartmentId?: BigInteger;
  renting?: boolean;
  image_url?: string;
};

cloudinary.config({
  cloud_name: "dbb2vknkm",
  api_key: "536232161747395",
  api_secret: "V3p6ctOyWPbUkD_zG5GWmVpG8oE",
  secure: true,
});

const uploadImage = async (image: string) => {
  const res = await cloudinary.uploader.upload(image);
  return res.secure_url;
};

export const getRenters = async (req: Request, res: Response) => {
  try {
    const renters = await Renter.findAll();
    res.json(renters);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getRenter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundRenter = await Renter.findOne({ where: { id } });
    if (!foundRenter)
      return res.status(404).json({ message: "Renter not found" });
    res.json(foundRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createRenter = async (req: Request, res: Response) => {
  const { name, lastname, dni, tel, apartmentId, renting } = req.body;
  try {
    const newRenter = await Renter.create({
      name,
      lastname,
      dni,
      tel,
      apartmentId,
      renting,
    });
    res.json(newRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateRenter = async (req: Request, res: Response) => {
  let imgResponse;
  try {
    const { name, lastname, dni, tel, apartmentId, renting, img } = req.body;
    const { id } = req.params;
    const foundRenter = (await Renter.findByPk(id)) as Model<Renter> | null;
    if (!foundRenter) {
      return res.status(404).json({ message: "Renter not found" });
    }
    if (img) {
      imgResponse = await uploadImage(img);
    }
    (foundRenter as unknown as Renter).name = name;
    (foundRenter as unknown as Renter).lastname = lastname;
    (foundRenter as unknown as Renter).dni = dni;
    (foundRenter as unknown as Renter).tel = tel;
    (foundRenter as unknown as Renter).apartmentId = apartmentId;
    (foundRenter as unknown as Renter).renting = renting;
    if (imgResponse) {
      (foundRenter as unknown as Renter).image_url = imgResponse;
    }
    foundRenter.save();
    res.json(foundRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteRenter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Renter.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
