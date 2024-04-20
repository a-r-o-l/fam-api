import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";

export const createApartment = async (req: Request, res: Response) => {
  const { number, rented } = req.body;
  try {
    const newApartment = await Apartment.create({
      number,
      rented,
    });

    res.json(newApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
