import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Apartment } from "./Apartment";
import { Payment } from "./Payment";

export const Renter = sequelize.define("Renter", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  dni: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  tel: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  apartmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  renting: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING(50),
    allowNull: true,
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
