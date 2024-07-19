import { Request, Response } from "express";
import { Contract } from "../../models/Contract";
import { Renter } from "../../models/Renter";
import { Apartment } from "../../models/Apartment";
import { Payment } from "../../models/Payment";

type ContractsAttributes = {
  id: number;
  months_amount: number;
  value: number;
  start_date: string;
  end_date: string;
  renter_id: number;
  apartment_id: number;
  is_expired?: boolean;
  update: (data: any) => void;
};

type ApartmentAttributes = {
  id?: number;
  number?: string;
  rented?: boolean;
  building_id?: number;
  active_contract_id?: number | null;
  active_renter_id?: number | null;
  save: () => void;
  update: (data: any) => void;
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
  active_apartment_id?: number | null;
  save: () => void;
  update: (data: any) => void;
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

    const payments = await Payment.findAll({
      where: { contract_id: id },
    });

    renter.update({
      active_contract_id: null,
      active_apartment_id: null,
    });

    apartment.update({
      active_contract_id: null,
      rented: false,
      active_renter_id: null,
    });
    if (payments.length) {
      contract.update({ is_cancelled: true });
    } else {
      await Contract.destroy({ where: { id } });
    }
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
