import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Apartment } from "./Apartment";

export const Renter = sequelize.define("Renter", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
  },
  lastname: {
    type: DataTypes.STRING(50),
  },
  dni: {
    type: DataTypes.STRING(50),
  },
  tel: {
    type: DataTypes.STRING(50),
  },
  apartmentId: {
    type: DataTypes.INTEGER,
  },
});

Renter.hasOne(Apartment, {
  foreignKey: "renterId",
  as: "renter",
  sourceKey: "id",
  onUpdate: "CASCADE",
});
Apartment.belongsTo(Renter, {
  foreignKey: "renterId",
  as: "renter",
  targetKey: "id",
  onUpdate: "CASCADE",
});
