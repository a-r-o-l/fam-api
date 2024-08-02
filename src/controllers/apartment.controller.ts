import { Request, Response } from "express";
import { Apartment } from "../models/Apartment";
import { Property } from "../models/Property";

interface CustomRequest extends Request {
  user?: any;
}

export const getApartments = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;

  try {
    const foundApartments = await Apartment.findAll({
      where: { account_id: accountId },
    });
    res.json(foundApartments);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getApartment = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundApartment = await Apartment.findOne({
      where: { id, account_id: accountId },
    });

    if (!foundApartment)
      return res.status(404).json({ message: "El departamento no existe" });
    res.json(foundApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createApartment = async (req: CustomRequest, res: Response) => {
  const {
    selling_price,
    floor,
    apartment,
    name,
    sold,
    property_id,
    contract_id,
  } = req.body;
  const accountId = req.user.id;
  try {
    const newContract = await Apartment.create({
      selling_price,
      floor,
      apartment,
      name,
      sold,
      property_id,
      contract_id,
      account_id: accountId,
    });
    res.json(newContract);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateApartment = async (req: CustomRequest, res: Response) => {
  try {
    const { selling_price, floor, apartment, name, sold } = req.body;
    const { id } = req.params;

    const foundApartment = await Apartment.findByPk(id);
    if (!foundApartment) {
      return res.status(404).json({ message: "El departamento no existe" });
    }

    await foundApartment.update({
      selling_price,
      floor,
      apartment,
      name,
      sold,
    });

    res.json(foundApartment);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Apartment.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
