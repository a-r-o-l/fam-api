import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database";
import { Renter } from "./Renter";

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
  },
  {
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

Building.hasMany(Renter, { foreignKey: "buildingId", sourceKey: "id" });
Renter.belongsTo(Building, { foreignKey: "buildingId", targetKey: "id" });

// Building.hasMany(Apartment, {foreignKey: "buildId", sourceKey: "id"})
// Apartment.belongsTo(Building, {foreignKey: "buildId", targetKey: "id"})
