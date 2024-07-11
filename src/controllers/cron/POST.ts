import { Apartment } from "../../models/Apartment";
import { Renter } from "../../models/Renter";
import { Contract } from "../../models/Contract";
import { Op } from "sequelize";
import dayjs from "dayjs";
import { Payment } from "../../models/Payment";

type ApartmentAttributes = {
  id?: number;
  number?: string;
  rented?: boolean;
  building_id?: number;
  account_id?: number;
  active_contract_id?: number | null;
  active_renter_id?: number | null;
  save: () => void;
};

type RenterAttributes = {
  id?: number;
  name?: string;
  lastname?: string;
  dni?: string;
  phone?: string;
  email?: string;
  image_url?: string;
  account_id?: number;
  active_contract_id: number | null;
  active_apartment_id: number | null;
  save: () => void;
};

type ContractsAttributes = {
  id?: number;
  months_amount: number;
  value: number;
  start_date?: string;
  end_date?: string;
  renter_id?: number;
  apartment_id?: number;
  is_expired?: boolean;
  upgrade_value: number;
  account_id?: number;
  setDataValue: (key: string, value: boolean) => void;
  save: () => void;
};

type PaymentAttributes = {
  id?: number;
  value: number;
  date: string;
  payed: boolean | null;
  receipt?: string;
  contract_id?: number;
  apartment_id?: number;
  renter_id?: number;
  account_id?: number;
  payment_number?: number;
};

export const cleanExpiredContracts = async () => {
  console.log("CLEAN EXPIRED CONTRACTS");
  try {
    const contracts = await Contract.findAll({
      where: {
        end_date: {
          [Op.lte]: dayjs().format("YYYY/MM/DD"),
        },
      },
    });
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
        apartment.save();
      }

      if (renter.active_contract_id === contractModel.id) {
        renter.active_contract_id = null;
        renter.active_apartment_id = null;
        renter.save();
      }
      contractModel.is_expired = true;
      contractModel.save();
    }
  } catch (error: unknown) {
    console.log(error);
  }
};

export const createAutomaticPayments = async () => {
  console.log("CREATE AUTOMATIC PAYMENTS");
  let newsPayments: PaymentAttributes[] = [];
  const currentMonth = dayjs().month();
  try {
    ``;
    const renters = await Renter.findAll({
      where: {
        active_contract_id: {
          [Op.ne]: null,
        },
      },
    });
    for (const renterModel of renters) {
      const renter = renterModel.get() as RenterAttributes;

      if (renter.active_contract_id !== null) {
        const contract = (await Contract.findByPk(
          renter.active_contract_id
        )) as unknown as ContractsAttributes;

        const payments = (await Payment.findAll({
          where: {
            contract_id: renter.active_contract_id,
          },
        })) as unknown as PaymentAttributes[];

        if (!payments?.length) {
          if (dayjs(contract.start_date).isAfter(dayjs())) {
            continue;
          }

          newsPayments.push({
            contract_id: contract.id,
            renter_id: contract.renter_id,
            apartment_id: contract.apartment_id,
            date: dayjs(contract.start_date)
              .month(currentMonth)
              .format("YYYY/MM/DD"),
            value:
              contract.months_amount !== 0
                ? contract.upgrade_value
                : contract.value,
            payed: false,
            account_id: contract.account_id,
          });
        } else {
          const latestPayment: any = payments.reduce(
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
              contract_id: contract.id,
              date: dayjs(contract.start_date)
                .month(currentMonth)
                .format("YYYY/MM/DD"),
              value:
                contract.months_amount !== 0
                  ? contract.upgrade_value
                  : contract.value,
              renter_id: contract.renter_id,
              apartment_id: contract.apartment_id,
              payment_number: latestPayment.payment_number + 1,
              payed: false,
              account_id: contract.account_id,
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
