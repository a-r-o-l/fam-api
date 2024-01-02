import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  value: {
    type: DataTypes.INTEGER,
  },
  wasPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  apartmentId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  renterId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});
