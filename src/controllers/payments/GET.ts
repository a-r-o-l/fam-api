import { Request, Response } from "express";
import { Payment } from "../../models/Payment";
import { Contract } from "../../models/Contract";
import { Renter } from "../../models/Renter";
import { Apartment } from "../../models/Apartment";
import { Building } from "../../models/Building";

type PaymentAttributes = {
  id?: number;
  value?: number;
  date?: string;
  payed?: boolean;
  receipt?: string;
  contractId?: number;
};

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll({
      order: [
        ["date", "DESC"],
        ["id", "ASC"],
      ],
      include: [
        {
          model: Contract,
          as: "Contract",
          include: [
            {
              model: Renter,
              as: "Renter",
            },
            {
              model: Apartment,
              as: "Apartment",
              include: [
                {
                  model: Building,
                  as: "Building",
                },
              ],
            },
          ],
        },
      ],
    });
    res.json(payments);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundPayment = await Payment.findOne({ where: { id } });
    if (!foundPayment)
      return res.status(404).json({ message: "Payment not found" });
    res.json(foundPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
