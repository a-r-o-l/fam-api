import { Request, Response } from "express";
import { Renter } from "../../models/Renter";

export const createRenter = async (req: Request, res: Response) => {
  const { name, lastname, email, dni, phone, image_url } = req.body;
  try {
    const newRenter = await Renter.create({
      name,
      lastname,
      dni,
      phone,
      email,
      image_url,
    });
    res.json(newRenter);
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};
