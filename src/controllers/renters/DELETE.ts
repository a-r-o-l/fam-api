import { Request, Response } from "express";
import { Renter } from "../../models/Renter";
import { Contract } from "../../models/Contract";

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

export const deleteRenter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contracts = await Contract.findAll({ where: { renterId: id } });
    if (contracts.length > 0) {
      return res
        .status(410)
        .json({ message: "Cannot delete renter with contracts" });
    }
    await Renter.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
