import { Request, Response } from "express";
import { Building } from "../../models/Building";
import { Payment } from "../../models/Payment";
import { Renter } from "../../models/Renter";
import { Op } from "sequelize";
import dayjs from "dayjs";
import { Apartment } from "../../models/Apartment";
import { ParsedUrlQuery } from "querystring";

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

interface QueryParams extends ParsedUrlQuery {
  type: any;
  from: any;
  to: any;
}

interface CustomRequest extends Request {
  user?: any;
  query: QueryParams;
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

export const getAnalitycs2 = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  const { type, from, to } = req.query;

  try {
    if (type === "buildings") {
      const buildings = await Building.findAll({
        where: {
          account_id: accountId,
        },
        include: [
          {
            model: Apartment,
            as: "Apartments",
          },
        ],
        order: [[{ model: Apartment, as: "Apartments" }, "id", "ASC"]],
      });

      const buildingsData = buildings.map((building) =>
        building.get({ plain: true })
      );

      for (const building of buildingsData) {
        for (const apartment of building.Apartments) {
          const payments = await Payment.findAll({
            where: {
              apartment_id: apartment.id,
              date: {
                [Op.between]: [
                  dayjs(from).format("YYYY/MM/DD"),
                  dayjs(to).format("YYYY/MM/DD"),
                ],
              },
            },
          });

          const totalPayment = payments.reduce(
            (sum, payment) => sum + parseInt(payment.getDataValue("value")),
            0
          );
          apartment.payment = totalPayment;
        }
      }

      res.json({ buildings: buildingsData });
    }
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getFeatures = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  const buildings = await Building.findAll({
    where: { account_id: accountId },
  });
  const renters = await Renter.findAll({ where: { account_id: accountId } });
  const apartments = await Apartment.findAll({
    where: { account_id: accountId },
  });
  const payments = await Payment.findAll({ where: { account_id: accountId } });

  const donePayments = payments
    .map((payment) => payment.get({ plain: true }))
    .filter((payment) => payment.payed);
  const pendingPayments = payments
    .map((payment) => payment.get({ plain: true }))
    .filter((payment) => !payment.payed);
  const totalAmountPayments = payments
    .map((payment) => payment.get({ plain: true }))
    .reduce((sum, payment) => sum + payment.value, 0);

  const activeRenters = renters
    .map((renter) => renter.get({ plain: true }))
    .filter((renter) => renter.active_contract_id);
  const inactiveRenters = renters
    .map((renter) => renter.get({ plain: true }))
    .filter((renter) => !renter.active_contract_id);

  res.json({
    buildings: buildings.length || 0,
    houses: 0,
    lounges: 0,
    activeRenters: activeRenters.length || 0,
    inactiveRenters: inactiveRenters.length || 0,
    apartments: apartments.length || 0,
    payments: payments.length || 0,
    donePayments: donePayments.length || 0,
    pendingPayments: pendingPayments.length || 0,
    totalAmountPayments,
  });
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
