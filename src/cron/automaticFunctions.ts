import dayjs from "dayjs";
import { Renter } from "../models/new-fam/Renter";
import { Op } from "sequelize";
import { Payment } from "../models/new-fam/Payment";

const createAutomaticPayment = async () => {
  console.log("se disparo");
  try {
    let newsPayments = [];
    const renters = await Renter.findAll();
    if (renters?.length) {
      for (const renter of renters) {
        const currentMonth = dayjs().month();
        const existingsPayments = await Payment.findAll({
          where: {
            renterId: renter.dataValues.id,
          },
        });
        if (!existingsPayments?.length) {
          return;
        }
        const latestPayment = existingsPayments?.reduce(
          (latest: any, payment: any) => {
            const paymentDate = dayjs(payment.date);
            if (paymentDate.isAfter(latest.date)) {
            }
            return paymentDate.isAfter(latest.date) ? payment : latest;
          }
        );
        const lastPayment = dayjs(latestPayment?.dataValues.date);
        const lastPaymentMonth = lastPayment.month();
        if (
          lastPayment.isBefore(dayjs()) &&
          lastPaymentMonth !== currentMonth
        ) {
          newsPayments.push({
            renterId: renter.dataValues.id,
            date: dayjs().date(lastPayment.date()).format("YYYY-MM-DD"),
            fee: renter.dataValues.fee,
          });
        }
      }
      if (newsPayments.length) {
        await Payment.bulkCreate(newsPayments);
      }
    }
  } catch (error: unknown) {
    console.log(error);
  }
};

export const automaticFunctions = {
  createAutomaticPayment,
};
