import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database";
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
  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  fee: {
    type: DataTypes.STRING(50),
  },
  apartment: {
    type: DataTypes.STRING(50),
  },
  buildingId: {
    type: DataTypes.INTEGER,
  },
  start_date: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  image_url: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
});

Renter.hasMany(Payment, { foreignKey: "renterId", sourceKey: "id" });
Payment.belongsTo(Renter, { foreignKey: "renterId", targetKey: "id" });
