import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";

type ApartmentAttributes = {
  id?: number;
  number: string;
  rented: boolean;
  building_id?: number;
};
export const deleteApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Apartment.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
