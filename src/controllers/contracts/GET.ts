import { Request, Response } from "express";
import { Contract } from "../../models/Contract";
import { Renter } from "../../models/Renter";
import { Apartment } from "../../models/Apartment";

interface CustomRequest extends Request {
  user?: any;
}

export const getContracts = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const contracts = await Contract.findAll({
      where: { account_id: accountId },
      include: [
        {
          model: Renter,
          as: "Renter",
        },
        {
          model: Apartment,
          as: "Apartment",
        },
      ],
    });
    res.json(contracts);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getContract = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundContract = await Contract.findOne({
      where: { id, account_id: accountId },
      include: [
        {
          model: Renter,
          as: "Renter",
        },
        {
          model: Apartment,
          as: "Apartment",
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
