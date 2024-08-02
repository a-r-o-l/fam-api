import { Request, Response } from "express";
import { Apartment } from "../models/Apartment";
import { Contract } from "../models/Contract";
import { Property } from "../models/Property";

interface CustomRequest extends Request {
  user?: any;
}

export const getProperties = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  const type = req.query.type;
  const where = type
    ? { type, account_id: accountId }
    : { account_id: accountId };
  try {
    const foundProperties = await Property.findAll({
      where: where,
      order: [["name", "ASC"]],
      include: [
        { model: Contract, as: "Contracts" },
        {
          model: Apartment,
          as: "Apartments",
          include: [
            {
              model: Contract,
              as: "Contracts",
            },
          ],
        },
      ],
    });
    res.json(foundProperties);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getProperty = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundProperty = await Property.findOne({
      where: { id, account_id: accountId },
    });
    if (!foundProperty)
      return res.status(404).json({ message: "Building not found" });
    res.json(foundProperty);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createProperty = async (req: CustomRequest, res: Response) => {
  const {
    type,
    address,
    name,
    image_url,
    apartments,
    floor,
    apartment,
    selling_price,
  } = req.body;
  const accountId = req.user.id;
  try {
    const newProperty = await Property.create({
      type,
      address,
      name,
      image_url,
      apartments,
      floor,
      apartment,
      selling_price,
      account_id: accountId,
    });
    res.json(newProperty);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateProperty = async (req: CustomRequest, res: Response) => {
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
    } = req.body;
    const { id } = req.params;

    const foundProperty = await Property.findByPk(id);
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
    });

    res.json(foundProperty);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Property.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
