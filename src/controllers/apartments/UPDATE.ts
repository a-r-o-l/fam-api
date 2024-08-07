import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";

type ApartmentAttributes = {
  id?: number;
  number: string;
  rented: boolean;
  building_id?: number;
  active_renter_id?: number;
};

export const updateApartment = async (req: Request, res: Response) => {
  try {
    const {
      number,
      rented,
      active_renter_id,
      active_contract_id,
      it_was_sold,
    } = req.body;
    const { id } = req.params;
    const [updatedRows] = await Apartment.update(
      { number, rented, active_renter_id, active_contract_id, it_was_sold },
      { where: { id } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    const updatedApartment = await Apartment.findByPk(id);
    res.json(updatedApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
