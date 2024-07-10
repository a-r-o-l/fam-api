import dayjs from "dayjs";
import { Renter } from "../models/Renter";
import { Op } from "sequelize";
import { Payment } from "../models/Payment";

const createAutomaticPayment = async () => {
  console.log("se disparo");
  try {
    let newsPayments = [];
    const renters = await Renter.findAll();
    console.log(renters.length);
    if (renters?.length) {
      for (const renter of renters) {
        const currentMonth = dayjs().month();
        const existingsPayments = await Payment.findAll({
          where: {
            renter_id: renter.dataValues.id,
          },
        });
        if (!existingsPayments?.length) {
          newsPayments.push({
            renter_id: renter.dataValues.id,
            date: dayjs(renter.dataValues.start_date)
              .month(dayjs().month())
              .date(dayjs().date())
              .format("YYYY/MM/DD"),
            amount: renter.dataValues.amount,
          });
          continue;
        }
        const latestPayment = existingsPayments?.reduce(
          //ultimo pago
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
            renter_id: renter.dataValues.id,
            date: dayjs().date(lastPayment.date()).format("YYYY/MM/DD"),
            amount: renter.dataValues.amount,
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
