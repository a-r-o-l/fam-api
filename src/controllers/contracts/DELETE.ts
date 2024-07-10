import { Request, Response } from "express";
import { Contract } from "../../models/Contract";
import { Renter } from "../../models/Renter";
import { Apartment } from "../../models/Apartment";

type ContractsAttributes = {
  id: number;
  months_amount: number;
  value: number;
  start_date: string;
  end_date: string;
  renter_id: number;
  apartment_id: number;
  is_expired?: boolean;
};

type ApartmentAttributes = {
  id?: number;
  number?: string;
  rented?: boolean;
  building_id?: number;
  active_contract_id?: number | null;
  save: () => void;
};

type RenterAttributes = {
  id?: number;
  name?: string;
  lastname?: string;
  dni?: string;
  phone?: string;
  email?: string;
  image_url?: string;
  active_contract_id?: number | null;
  save: () => void;
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contract = (await Contract.findByPk(
      id
    )) as unknown as ContractsAttributes;

    const renter = (await Renter.findByPk(
      contract?.renter_id
    )) as unknown as RenterAttributes;

    const apartment = (await Apartment.findByPk(
      contract?.apartment_id
    )) as unknown as ApartmentAttributes;

    if (renter.active_contract_id == Number(id)) {
      renter.active_contract_id = null;
      renter.save();
    }

    if (apartment.active_contract_id == Number(id)) {
      apartment.active_contract_id = null;
      apartment.save();
    }
    await Contract.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
