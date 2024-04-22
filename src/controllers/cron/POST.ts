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
  buildingId?: number;
  activeContractId?: number | null;
  activeRenterId?: number | null;
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
  activeContractId: number | null;
  activeApartmentId: number | null;
  save: () => void;
};

type ContractsAttributes = {
  id?: number;
  months_amount: number;
  value: number;
  start_date?: string;
  end_date?: string;
  renterId?: number;
  apartmentId?: number;
  isExpired?: boolean;
  setDataValue: (key: string, value: boolean) => void;
  save: () => void;
};

type PaymentAttributes = {
  id?: number;
  value: number;
  date: string;
  payed: boolean | null;
  receipt?: string;
  contractId?: number;
  apartmentId?: number;
  renterId?: number;
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
        contractModel.apartmentId
      )) as unknown as ApartmentAttributes;

      const renter = (await Renter.findByPk(
        contractModel.renterId
      )) as unknown as RenterAttributes;

      if (apartment.activeContractId === contractModel.id) {
        apartment.activeContractId = null;
        apartment.activeRenterId = null;
        apartment.rented = false;
        apartment.save();
      }

      if (renter.activeContractId === contractModel.id) {
        renter.activeContractId = null;
        renter.activeApartmentId = null;
        renter.save();
      }
      contractModel.isExpired = true;
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
    const renters = await Renter.findAll({
      where: {
        activeContractId: {
          [Op.ne]: null,
        },
      },
    });
    for (const renterModel of renters) {
      const renter = renterModel.get() as RenterAttributes;

      if (renter.activeContractId !== null) {
        const contract = (await Contract.findByPk(
          renter.activeContractId
        )) as unknown as ContractsAttributes;

        const payments = (await Payment.findAll({
          where: {
            contractId: renter.activeContractId,
          },
        })) as unknown as PaymentAttributes[];

        if (!payments?.length) {
          newsPayments.push({
            contractId: contract.id,
            renterId: contract.renterId,
            apartmentId: contract.apartmentId,
            date: dayjs(contract.start_date)
              .month(currentMonth)
              .format("YYYY/MM/DD"),
            value: contract.value,
            payed: false,
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
              contractId: contract.id,
              date: dayjs(contract.start_date)
                .month(currentMonth)
                .format("YYYY/MM/DD"),
              value: contract.value,
              renterId: contract.renterId,
              apartmentId: contract.apartmentId,
              payment_number: latestPayment.payment_number + 1,
              payed: false,
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
