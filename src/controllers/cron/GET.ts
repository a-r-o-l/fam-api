import { Op } from "sequelize";
import { Apartment } from "../../models/Apartment";
import { Contract } from "../../models/Contract";
import { Renter } from "../../models/Renter";
import { Building } from "../../models/Building";

export const test = async () => {
  console.log("se dispara test");
  const rentersByBuilding = await Renter.findAll({
    where: {
      Apartment: {
        BuildingId: 2,
      },
    },
    include: [
      {
        model: Contract,
        as: "Contracts",
        include: [
          {
            model: Apartment,
            as: "Apartment",
            include: [
              {
                model: Building,
                as: "Building",
              },
            ],
          },
        ],
      },
    ],
  });
  console.log("length -> ", rentersByBuilding.length);
};
