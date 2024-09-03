import { Apartment } from "../models/Apartment";
import { Renter } from "../models/Renter";
import { Contract } from "../models/Contract";
import { Op } from "sequelize";
import dayjs from "dayjs";
import { Payment } from "../models/Payment";
import { ApartmentAttributes } from "../utils/apartmentTypes";
import { RenterAttributes } from "../utils/renterTypes";
import { ContractAttributes } from "../utils/contractTypes";
import { PaymentType } from "../utils/paymentTypes";

export const cleanExpiredContracts = async (id: number) => {
  console.log("CLEAN EXPIRED CONTRACTS");
  try {
    const contracts = await Contract.findAll({
      where: {
        account_id: id,
        end_date: {
          [Op.lte]: dayjs().format("YYYY/MM/DD"),
        },
      },
    });
    if (!contracts?.length) {
      return;
    }
    for (const contract of contracts) {
      const contractModel: any = contract;
      const apartment = (await Apartment.findByPk(
        contractModel.apartment_id
      )) as unknown as ApartmentAttributes;

      const renter = (await Renter.findByPk(
        contractModel.renter_id
      )) as unknown as RenterAttributes;

      if (apartment.active_contract_id === contractModel.id) {
        apartment.active_contract_id = null;
        apartment.active_renter_id = null;
        apartment.rented = false;
        await apartment.save();
      }

      if (renter.active_contract_id === contractModel.id) {
        renter.active_contract_id = null;
        renter.active_apartment_id = null;
        await renter.save();
      }
      contractModel.is_expired = true;
      await contractModel.save();
    }
  } catch (error: unknown) {
    console.log(error);
  }
};

export const createAutomaticPayments = async (id: number) => {
  console.log("CREATE AUTOMATIC PAYMENTS");
  let newsPayments: PaymentType[] = [];
  const currentMonth = dayjs().month();
  try {
    const renters = await Renter.findAll({
      //all the renters that have an active contract
      where: {
        account_id: id,
        active_contract_id: {
          [Op.ne]: null,
        },
      },
    });
    if (!renters?.length) {
      return;
    }
    for (const renterModel of renters) {
      //for each renter
      const renter = renterModel.get() as RenterAttributes;

      if (renter.active_contract_id !== null) {
        const contract = (await Contract.findByPk(
          //get the contract of the renter
          renter.active_contract_id
        )) as unknown as ContractAttributes;

        const payments = (await Payment.findAll({
          //get all the payments of the contract
          where: {
            account_id: id,
            contract_id: renter.active_contract_id,
          },
        })) as unknown as PaymentType[];

        if (!payments?.length) {
          if (dayjs(contract.start_date).isAfter(dayjs())) {
            // if the contract has not started yet, continue
            continue;
          }

          newsPayments.push({
            //create the first payment of the contract
            contract_id: contract.id,
            renter_id: contract.renter_id,
            apartment_id: contract.apartment_id,
            date: dayjs(contract.start_date)
              .month(currentMonth)
              .format("YYYY/MM/DD"),
            value:
              contract.months_upgrade !== 0
                ? contract.upgrade_value
                : contract.value,
            payed: false,
            account_id: id,
          });
        } else {
          const latestPayment: any = payments.reduce(
            //get the latest payment of the contract
            (latest: any, payment: any) => {
              const paymentDate = dayjs(payment.date);
              return paymentDate.isAfter(latest.date) ? payment : latest;
            },
            { date: "1900-01-01" }
          );
          const lastPayment = dayjs(latestPayment.date);
          const lastPaymentMonth = lastPayment.month();
          if (
            lastPayment.isBefore(dayjs()) &&
            lastPaymentMonth !== currentMonth
          ) {
            newsPayments.push({
              //create the next payment of the contract if the last payment is before today and the last payment month is different from the current month
              contract_id: contract.id,
              date: dayjs(contract.start_date)
                .month(currentMonth)
                .format("YYYY/MM/DD"),
              value:
                contract.months_upgrade !== 0
                  ? contract.upgrade_value
                  : contract.value,
              renter_id: contract.renter_id,
              apartment_id: contract.apartment_id,
              payment_number: latestPayment.payment_number + 1,
              payed: false,
              account_id: id,
            });
          }
        }
      }
    }
    if (newsPayments.length) {
      await Payment.bulkCreate(newsPayments);
    }
  } catch (error: unknown) {
    console.log(error);
  }
};
