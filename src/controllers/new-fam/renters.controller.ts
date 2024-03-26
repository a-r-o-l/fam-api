import { Request, Response } from "express";
import { Renter } from "../../models/new-fam/Renter";
import { Building } from "../../models/new-fam/Building";
import { Model } from "sequelize"; // Import the Model type from Sequelize

type Renter = {
  name: string;
  lastname: string;
  dni: string;
  phone: string;
  apartment?: string;
  buildingId?: number;
  fee?: string;
  image_url?: string;
  start_date: string;
};

export const uploadImage = async (req: Request, res: Response) => {
  try {
    const { image_url } = req.body;
    const { id } = req.params;
    const foundRenter = (await Renter.findByPk(id)) as Model<Renter> | null;
    if (!foundRenter) {
      return res.status(404).json({ message: "Renter not found" });
    }
    (foundRenter as unknown as Renter).image_url = image_url;
    foundRenter.save();
    res.json({ message: "Image received", imageUrl: image_url, id });
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getRenters = async (req: Request, res: Response) => {
  try {
    const renters = await Renter.findAll({
      include: Building,
    });
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
  const {
    name,
    lastname,
    dni,
    phone,
    apartment,
    buildingId,
    image_url,
    start_date,
    fee,
  } = req.body;
  try {
    const newRenter = await Renter.create({
      name,
      lastname,
      dni,
      phone,
      apartment,
      buildingId,
      image_url,
      start_date,
      fee,
    });
    res.json(newRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateRenter = async (req: Request, res: Response) => {
  try {
    const {
      name,
      lastname,
      dni,
      phone,
      apartment,
      buildingId,
      start_date,
      image_url,
      fee,
    } = req.body;
    const { id } = req.params;
    const foundRenter = (await Renter.findByPk(id)) as Model<Renter> | null;
    if (!foundRenter) {
      return res.status(404).json({ message: "Renter not found" });
    }
    (foundRenter as unknown as Renter).name = name;
    (foundRenter as unknown as Renter).lastname = lastname;
    (foundRenter as unknown as Renter).dni = dni;
    (foundRenter as unknown as Renter).phone = phone;
    (foundRenter as unknown as Renter).apartment = apartment;
    (foundRenter as unknown as Renter).buildingId = buildingId;
    (foundRenter as unknown as Renter).start_date = start_date;
    (foundRenter as unknown as Renter).image_url = image_url;
    (foundRenter as unknown as Renter).fee = fee;
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
