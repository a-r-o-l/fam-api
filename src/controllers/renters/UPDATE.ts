import { Request, Response } from "express";
import { Renter } from "../../models/Renter";
import { Model } from "sequelize";

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
  contract?: number;
  amount?: number;
  end_date?: string;
  email?: string;
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
      amount,
      end_date,
      email,
      contract,
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
    (foundRenter as unknown as Renter).amount = amount;
    (foundRenter as unknown as Renter).end_date = end_date;
    (foundRenter as unknown as Renter).email = email;
    (foundRenter as unknown as Renter).contract = contract;
    foundRenter.save();
    res.json(foundRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
