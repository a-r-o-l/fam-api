import { Request, Response } from "express";
import { Payment } from "../../models/Payment";
import dayjs from "dayjs";
import { Op } from "sequelize";

type PaymentAttributes = {
  id?: number;
  value?: number;
  date?: string;
  payed?: boolean;
  receipt?: string;
  contract_id?: number;
  renter_id?: number;
  apartment_id?: number;
  payment_number?: number;
};

interface CustomRequest extends Request {
  user?: any;
}

export const createPayment = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;

  const { value, date, receipt, contract_id, renter_id, apartment_id, payed } =
    req.body;
  try {
    const firstDayOfMonth = dayjs(date, "YYYY/MM/DD")
      .startOf("month")
      .format("YYYY/MM/DD");
    const lastDayOfMonth = dayjs(date, "YYYY/MM/DD")
      .endOf("month")
      .format("YYYY/MM/DD");
    const existingPayment = await Payment.findOne({
      where: {
        account_id: accountId,
        contract_id,
        date: {
          [Op.gte]: firstDayOfMonth,
          [Op.lte]: lastDayOfMonth,
        },
      },
    });

    if (existingPayment) {
      return res.status(400).json({
        message: "Ya existe un pago de este contrato en el mismo mes.",
      });
    }
    const lastPayment = (await Payment.findOne({
      where: { contract_id, account_id: accountId },
      order: [["payment_number", "DESC"]],
    })) as PaymentAttributes;
    const payment_number = lastPayment?.payment_number
      ? lastPayment.payment_number + 1
      : 1;
    const newPayment = await Payment.create({
      contract_id,
      date,
      receipt,
      value,
      renter_id,
      apartment_id,
      payment_number,
      account_id: accountId,
      payed: payed || false,
    });
    res.json(newPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
