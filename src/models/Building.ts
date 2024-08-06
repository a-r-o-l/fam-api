import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Apartment } from "./Apartment";

export const Building = sequelize.define(
  "Building",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    apartments: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    apartments_with_floor: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    tableName: "Building",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

Building.hasMany(Apartment, { foreignKey: "building_id", sourceKey: "id" });
Apartment.belongsTo(Building, { foreignKey: "building_id", targetKey: "id" });
