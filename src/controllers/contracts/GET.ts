import { Request, Response } from "express";
import { Contract } from "../../models/Contract";
import { Renter } from "../../models/Renter";
import { Apartment } from "../../models/Apartment";
import { Upgrade } from "../../models/Upgrades";

export const getContracts = async (req: Request, res: Response) => {
  try {
    const contracts = await Contract.findAll({
      include: [
        {
          model: Renter,
          as: "Renter",
        },
        {
          model: Apartment,
          as: "Apartment",
        },
        {
          model: Upgrade,
          as: "Upgrades",
        },
      ],
    });
    res.json(contracts);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log("id=>", id);
    const foundContract = await Contract.findOne({
      where: { id },
      include: [
        {
          model: Renter,
          as: "Renter",
        },
        {
          model: Apartment,
          as: "Apartment",
        },
        {
          model: Upgrade,
          as: "Upgrades",
        },
      ],
    });
    if (!foundContract)
      return res.status(404).json({ message: "Contract not found" });
    res.json(foundContract);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
