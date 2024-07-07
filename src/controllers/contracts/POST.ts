import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";
import { Renter } from "../../models/Renter";
import { Contract } from "../../models/Contract";
import { Upgrade } from "../../models/Upgrades";
import { Op } from "sequelize";
import dayjs from "dayjs";

type ApartmentAttributes = {
  id?: number;
  number?: string;
  rented?: boolean;
  buildingId?: number;
  activeContractId?: number;
  activeRenterId?: number;
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
  activeContractId?: number;
  activeApartmentId?: number;
  save: () => void;
};

export const createContract = async (req: Request, res: Response) => {
  const {
    months_amount,
    value,
    start_date,
    end_date,
    renterId,
    apartmentId,
    isExpired,
    months_upgrade,
  } = req.body;
  try {
    const foundApartment = (await Apartment.findByPk(
      apartmentId
    )) as ApartmentAttributes;
    if (!foundApartment) {
      return res.status(414).json({ message: "Apartamento no encontrado" });
    }

    const foundRenter = (await Renter.findByPk(renterId)) as RenterAttributes;
    if (!foundRenter) {
      return res.status(414).json({ message: "Inquilino no encontrado" });
    }

    const foundContracts = await Contract.findOne({
      where: {
        apartmentId,
        [Op.or]: [
          {
            start_date: {
              [Op.lte]: start_date,
            },
            end_date: {
              [Op.gte]: start_date,
            },
          },
          {
            start_date: {
              [Op.lte]: end_date,
            },
            end_date: {
              [Op.gte]: end_date,
            },
          },
          {
            start_date: {
              [Op.gte]: start_date,
            },
            end_date: {
              [Op.lte]: end_date,
            },
          },
        ],
      },
    });

    //the apartment has or had a contract with the same date
    if (foundContracts) {
      return res
        .status(414)
        .json({ message: "ya existe un contrato con la misma fecha" });
    }
    //the apartment has rented field in true
    if (foundApartment.activeContractId) {
      return res
        .status(414)
        .json({ message: "El apartamento ya esta alquilado" });
    }
    //the renter has activeContractId
    if (foundRenter.activeContractId) {
      return res
        .status(414)
        .json({ message: "El inquilino ya tiene un contrato" });
    }

    const newContract = await Contract.create({
      months_amount,
      value,
      start_date,
      end_date,
      renterId,
      apartmentId,
      isExpired,
      months_upgrade,
    });

    if (!newContract)
      return res.status(414).json({ message: "No se pudo crear el contrato" });

    const contractEndDate = dayjs(newContract.getDataValue("end_date"));
    const montsUpgrade = newContract.getDataValue("months_upgrade");

    if (montsUpgrade !== 0) {
      const newUpgrade = await Upgrade.create({
        contractId: newContract.getDataValue("id"),
        startDate: start_date,
        endDate: dayjs(start_date)
          .add(months_upgrade, "M")
          .format("YYYY/MM/DD"),
        newValue: value,
      });
    }

    if (dayjs(contractEndDate).isAfter(dayjs())) {
      foundApartment.rented = true;
      foundApartment.activeContractId = newContract.getDataValue("id");
      foundApartment.activeRenterId = renterId;

      foundRenter.activeContractId = newContract.getDataValue("id");
      foundRenter.activeApartmentId = apartmentId;
      foundRenter.save();
      foundApartment.save();
    }
    res.json(newContract);
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};
