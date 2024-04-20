import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";
import { Renter } from "../../models/Renter";
import { Contract } from "../../models/Contract";
import { Op } from "sequelize";
import dayjs from "dayjs";

type ApartmentAttributes = {
  id?: number;
  number?: string;
  rented?: boolean;
  buildingId?: number;
  activeContractId?: number;
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
  } = req.body;
  try {
    const foundApartment = (await Apartment.findByPk(
      apartmentId
    )) as ApartmentAttributes;
    //the apartment doesn't exist
    if (!foundApartment) {
      return res.status(414).json({ message: "Apartamento no encontrado" });
    }

    const foundRenter = (await Renter.findByPk(renterId)) as RenterAttributes;
    //the renter doesn't exist
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
    });

    if (!newContract)
      return res.status(414).json({ message: "No se pudo crear el contrato" });

    const contractEndDate = dayjs(newContract.getDataValue("end_date"));

    if (dayjs(contractEndDate).isAfter(dayjs())) {
      foundApartment.rented = true;
      foundApartment.activeContractId = newContract.getDataValue("id");
      foundRenter.activeContractId = newContract.getDataValue("id");
      foundRenter.save();
      foundApartment.save();
    }
    res.json(newContract);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
