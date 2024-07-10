import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";

interface CustomRequest extends Request {
  user?: any;
}

export const createApartment = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  const { number, rented } = req.body;
  try {
    const newApartment = await Apartment.create({
      number,
      rented,
      account_id: accountId,
    });

    res.json(newApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
