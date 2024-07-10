import { Request, Response } from "express";
import { Building } from "../../models/Building";
import { Payment } from "../../models/Payment";
import { Renter } from "../../models/Renter";
import { Op } from "sequelize";
import dayjs from "dayjs";

interface IPayment {
  id: number;
  renter_id: number;
  paid: boolean;
  value: number;
  date: string;
  payed: boolean;
  receipt: string;
  contract_id: number;
  // otras propiedades...
  toJSON(): Object;
}

interface IRenter {
  id: number;
  name: string;
  lastname: string;
}

export const getAnalitycs = async (req: Request, res: Response) => {
  try {
    const buildings = await Building.findAll({ order: [["name", "ASC"]] });
    const renters = await Renter.findAll({
      order: [["id", "ASC"]],
      attributes: ["id", "name", "lastname"],
    });
    const payments = (await Payment.findAll()) as unknown as IPayment[];

    for (let renter of renters) {
      const renterWithPayments = renter as unknown as IRenter;
      const renterPayments = payments.filter(
        (payment: IPayment) => payment.renter_id === renterWithPayments.id
      );

      // renter.setDataValue(
      //   "payedPayments",
      //   renterPayments.reduce(
      //     (sum, payment: IPayment) =>
      //       payment.paid ? sum + payment.amount : sum,
      //     0
      //   )
      // );
      // renter.setDataValue(
      //   "pendingPayments",
      //   renterPayments.reduce(
      //     (sum, payment: IPayment) =>
      //       !payment.paid ? sum + payment.amount : sum,
      //     0
      //   )
      // );
    }

    res.json({ renters });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getPaymentsbyTime = async (req: Request, res: Response) => {
  try {
    const year = req?.params?.year;
    if (year) {
      const start_date = dayjs(year).startOf("year").toDate();
      const end_date = dayjs(year).endOf("year").toDate();

      const payments = await Payment.findAll({
        where: {
          date: {
            [Op.between]: [start_date, end_date],
          },
        },
      });
      res.json({ payments });
    }
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
