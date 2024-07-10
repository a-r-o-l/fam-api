import { Request, Response } from "express";
import { Contract } from "../../models/Contract";

export const updateContract = async (req: Request, res: Response) => {
  try {
    const {
      months_amount,
      value,
      start_date,
      end_date,
      renter_id,
      apartment_id,
      is_expired,
    } = req.body;
    const { id } = req.params;
    const foundContract = await Contract.findByPk(id);

    if (!foundContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    await foundContract.update({
      months_amount,
      value,
      start_date,
      end_date,
      renter_id,
      apartment_id,
      is_expired,
    });

    res.json(foundContract);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
