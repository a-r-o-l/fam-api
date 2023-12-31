import { Request, Response } from "express";
import { Renter } from "../models/Renter";
import { Model } from "sequelize"; // Import the Model type from Sequelize

type Renter = {
  name: string;
  lastname: string;
  dni: string;
  tel: string;
  apartmentId?: BigInteger;
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
  try {
    const { name, lastname, dni, tel, apartmentId, renting } = req.body;
    const { id } = req.params;
    const foundRenter = (await Renter.findByPk(id)) as Model<Renter> | null;
    if (!foundRenter)
      return res.status(404).json({ message: "Renter not found" });
    (foundRenter as unknown as Renter).name = name;
    (foundRenter as unknown as Renter).lastname = lastname;
    (foundRenter as unknown as Renter).dni = dni;
    (foundRenter as unknown as Renter).tel = tel;
    (foundRenter as unknown as Renter).apartmentId = apartmentId;
    (foundRenter as unknown as Renter).renting = renting;
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
