import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";

interface CustomRequest extends Request {
  user?: any;
}

export const createApartment = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  const { number, building_id, floor } = req.body;
  try {
    const apartmentExists = await Apartment.findOne({
      where: { number, building_id, account_id: accountId, floor },
    });

    if (apartmentExists) {
      return res.status(400).json({ message: "El departamento ya existe" });
    }
    const newApartment = await Apartment.create({
      number,
      building_id,
      floor,
      account_id: accountId,
    });

    res.json(newApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
