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
  active_apartment_id?: number;
  active_contract_id?: number;
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
      active_apartment_id,
      active_contract_id,
    } = req.body;
    const { id } = req.params;

    const foundRenter = await Renter.findByPk(id);
    if (!foundRenter) {
      return res.status(404).json({ message: "Renter not found" });
    }

    const updateData = {
      ...(name !== undefined && { name }),
      ...(lastname !== undefined && { lastname }),
      ...(dni !== undefined && { dni }),
      ...(phone !== undefined && { phone }),
      ...(image_url !== undefined && { image_url }),
      ...(email !== undefined && { email }),
      ...(active_apartment_id !== undefined && { active_apartment_id }),
      ...(active_contract_id !== undefined && { active_contract_id }),
    };

    await foundRenter.update(updateData);

    res.json(foundRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
