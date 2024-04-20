import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";
import { Model } from "sequelize";

type ApartmentAttributes = {
  id?: number;
  number: string;
  rented: boolean;
  buildingId?: number;
};

export const updateApartment = async (req: Request, res: Response) => {
  try {
    const { number, rented } = req.body;
    const { id } = req.params;
    const foundApartment = (await Apartment.findByPk(
      id
    )) as Model<ApartmentAttributes> | null;
    if (!foundApartment)
      return res.status(404).json({ message: "Apartment not found" });
    if (number !== undefined)
      (foundApartment as unknown as ApartmentAttributes).number = number;
    if (rented !== undefined)
      (foundApartment as unknown as ApartmentAttributes).rented = rented;
    foundApartment.save();
    res.json(foundApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
