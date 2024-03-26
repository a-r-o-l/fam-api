import { DataTypes } from "sequelize";
import { sequelize } from "../../database/database";

export const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  renterId: {
    type: DataTypes.INTEGER,
  },
  paid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  fee: {
    type: DataTypes.STRING(50),
  },
  date: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
});
