import { Request, Response } from "express";
import { Renter } from "../../models/Renter";
import { Model } from "sequelize";

type Renter = {
  name: string;
  lastname: string;
  dni: string;
  phone: string;
  image_url?: string;
  email?: string;
  activeApartmentId?: number;
  activeContractId?: number;
};

export const updateRenter = async (req: Request, res: Response) => {
  try {
    const {
      name,
      lastname,
      dni,
      phone,
      image_url,
      email,
      activeApartmentId,
      activeContractId,
    } = req.body;
    const { id } = req.params;

    const foundRenter = (await Renter.findByPk(id)) as Model<Renter> | null;
    if (!foundRenter) {
      return res.status(404).json({ message: "Renter not found" });
    }

    if (name !== undefined) (foundRenter as unknown as Renter).name = name;
    if (lastname !== undefined)
      (foundRenter as unknown as Renter).lastname = lastname;
    if (dni !== undefined) (foundRenter as unknown as Renter).dni = dni;
    if (phone !== undefined) (foundRenter as unknown as Renter).phone = phone;
    if (image_url !== undefined)
      (foundRenter as unknown as Renter).image_url = image_url;
    if (email !== undefined) (foundRenter as unknown as Renter).email = email;
    if (activeApartmentId !== undefined)
      (foundRenter as unknown as Renter).activeApartmentId = activeApartmentId;
    if (activeContractId !== undefined)
      (foundRenter as unknown as Renter).activeContractId = activeContractId;

    foundRenter.save();

    res.json(foundRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
