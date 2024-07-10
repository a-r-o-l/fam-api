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
  building_id?: number;
  active_contract_id?: number;
  active_renter_id?: number;
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
  active_contract_id?: number;
  active_apartment_id?: number;
  save: () => void;
};

interface CustomRequest extends Request {
  user?: any;
}

export const createContract = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  const {
    months_amount,
    value,
    start_date,
    end_date,
    renter_id,
    apartment_id,
    is_expired,
    months_upgrade,
  } = req.body;
  try {
    const foundApartment = (await Apartment.findByPk(
      apartment_id
    )) as ApartmentAttributes;
    if (!foundApartment) {
      return res.status(414).json({ message: "Apartamento no encontrado" });
    }

    const foundRenter = (await Renter.findByPk(renter_id)) as RenterAttributes;
    if (!foundRenter) {
      return res.status(414).json({ message: "Inquilino no encontrado" });
    }

    const foundContracts = await Contract.findOne({
      where: {
        account_id: accountId,
        apartment_id: apartment_id,
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

    if (foundContracts) {
      return res
        .status(414)
        .json({ message: "ya existe un contrato con la misma fecha" });
    }
    if (foundApartment.active_contract_id) {
      return res
        .status(414)
        .json({ message: "El apartamento ya esta alquilado" });
    }
    if (foundRenter.active_contract_id) {
      return res
        .status(414)
        .json({ message: "El inquilino ya tiene un contrato" });
    }

    const newContract = await Contract.create({
      months_amount,
      value,
      start_date,
      end_date,
      renter_id,
      apartment_id,
      is_expired,
      months_upgrade,
      account_id: accountId,
      upgrade_value: !months_upgrade ? null : value,
      upgrade_start_date: !months_upgrade ? null : start_date,
      upgrade_end_date: !months_upgrade
        ? null
        : dayjs(start_date).add(months_upgrade, "M").format("YYYY/MM/DD"),
    });

    if (!newContract)
      return res.status(414).json({ message: "No se pudo crear el contrato" });

    if (dayjs(end_date).isAfter(dayjs())) {
      foundApartment.rented = true;
      foundApartment.active_contract_id = newContract.getDataValue("id");
      foundApartment.active_renter_id = renter_id;

      foundRenter.active_contract_id = newContract.getDataValue("id");
      foundRenter.active_apartment_id = apartment_id;
      foundRenter.save();
      foundApartment.save();
    }
    res.json(newContract);
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};
