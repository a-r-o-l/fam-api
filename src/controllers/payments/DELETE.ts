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

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Payment.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
