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
  contract_id?: number;
};

interface CustomRequest extends Request {
  user?: any;
}

export const getPayments = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  let where = {};
  const { renterId } = req.query;

  if (renterId) {
    where = { renter_id: renterId, account_id: accountId };
  } else {
    where = { account_id: accountId };
  }

  try {
    const payments = await Payment.findAll({
      where,
      order: [
        ["date", "ASC"],
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

export const getPayment = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;

  try {
    const { id } = req.params;
    const foundPayment = await Payment.findOne({
      where: { id, account_id: accountId },
    });
    if (!foundPayment)
      return res.status(404).json({ message: "Payment not found" });
    res.json(foundPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
