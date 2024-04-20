import { Request, Response } from "express";
import { Payment } from "../../models/Payment";

type PaymentAttributes = {
  id?: number;
  value?: number;
  date?: string;
  payed?: boolean;
  receipt?: string;
  contractId?: number;
};

export const createPayment = async (req: Request, res: Response) => {
  const { value, date, receipt, contractId } = req.body;
  try {
    const newPayment = await Payment.create({
      contractId,
      date,
      receipt,
      value,
    });
    res.json(newPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
