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
  contractId?: number;
  renterId?: number;
  apartmentId?: number;
  payment_number?: number;
};

export const createPayment = async (req: Request, res: Response) => {
  const { value, date, receipt, contractId, renterId, apartmentId } = req.body;
  try {
    const firstDayOfMonth = dayjs(date, "YYYY/MM/DD")
      .startOf("month")
      .format("YYYY/MM/DD");
    const lastDayOfMonth = dayjs(date, "YYYY/MM/DD")
      .endOf("month")
      .format("YYYY/MM/DD");
    // Verificar que no existe ningún pago en el mismo mes que el que estamos por crear
    const existingPayment = await Payment.findOne({
      where: {
        contractId,
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
    // Buscar el pago con el payment_number más grande para el contractId dado
    const lastPayment = (await Payment.findOne({
      where: { contractId },
      order: [["payment_number", "DESC"]],
    })) as PaymentAttributes;
    const payment_number = lastPayment?.payment_number
      ? lastPayment.payment_number + 1
      : 1;
    const newPayment = await Payment.create({
      contractId,
      date,
      receipt,
      value,
      renterId,
      apartmentId,
      payment_number,
    });
    res.json(newPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
