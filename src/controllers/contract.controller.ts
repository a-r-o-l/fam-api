import { Request, Response } from "express";
import { Apartment } from "../models/Apartment";
import { Contract } from "../models/Contract";
import { Property } from "../models/Property";

interface CustomRequest extends Request {
  user?: any;
}

export const getContracts = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;

  try {
    const foundContracts = await Contract.findAll({
      where: { account_id: accountId },
    });
    res.json(foundContracts);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getContract = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundProperty = await Contract.findOne({
      where: { id, account_id: accountId },
    });
    if (!foundProperty)
      return res.status(404).json({ message: "Building not found" });
    res.json(foundProperty);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createContract = async (req: CustomRequest, res: Response) => {
  const {
    months_amount,
    value,
    start_date,
    end_date,
    property_id,
    apartment_id,
    property_type,
    renter,
    upgrade,
  } = req.body;
  const accountId = req.user.id;
  try {
    const newContract = await Contract.create({
      months_amount,
      value,
      start_date,
      end_date,
      property_id,
      apartment_id,
      property_type,
      renter,
      upgrade,
      account_id: accountId,
    });
    if (apartment_id) {
      const foundProperty = await Apartment.findByPk(apartment_id);
      if (!foundProperty) {
        return res.status(404).json({ message: "La propiedad no existe" });
      }
      await foundProperty.update({
        contract_id: newContract.getDataValue("id"),
      });
    } else {
      const foundProperty = await Property.findByPk(property_id);
      if (!foundProperty) {
        return res.status(404).json({ message: "La propiedad no existe" });
      }
      await foundProperty.update({
        contract_id: newContract.getDataValue("id"),
      });
    }
    res.json(newContract);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateContract = async (req: CustomRequest, res: Response) => {
  try {
    const {
      type,
      address,
      name,
      image_url,
      sold,
      apartments,
      floor,
      apartment,
      selling_price,
      end_date,
      is_expired,
    } = req.body;
    const { id } = req.params;

    const foundProperty = await Contract.findByPk(id);
    if (!foundProperty) {
      return res.status(404).json({ message: "La propiedad no existe" });
    }

    await foundProperty.update({
      type,
      address,
      name,
      image_url,
      sold,
      apartments,
      floor,
      apartment,
      selling_price,
      end_date,
      is_expired,
    });

    res.json(foundProperty);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Contract.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
