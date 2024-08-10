import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    lounge_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    payed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
    renter: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    tableName: "Reservation",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
