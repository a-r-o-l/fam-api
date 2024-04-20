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
  renterId: number;
  apartmentId: number;
  isExpired?: boolean;
};

type ApartmentAttributes = {
  id?: number;
  number?: string;
  rented?: boolean;
  buildingId?: number;
  activeContractId?: number | null;
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
  activeContractId?: number | null;
  save: () => void;
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contract = (await Contract.findByPk(
      id
    )) as unknown as ContractsAttributes;

    const renter = (await Renter.findByPk(
      contract?.renterId
    )) as unknown as RenterAttributes;

    const apartment = (await Apartment.findByPk(
      contract?.apartmentId
    )) as unknown as ApartmentAttributes;

    if (renter.activeContractId == Number(id)) {
      renter.activeContractId = null;
      renter.save();
    }

    if (apartment.activeContractId == Number(id)) {
      apartment.activeContractId = null;
      apartment.save();
    }
    await Contract.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
