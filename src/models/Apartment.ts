import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Contract } from "./Contract";

export const Apartment = sequelize.define("Apartment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    number: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    rented: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    value:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
},)

Apartment.hasMany(Contract, {foreignKey: "apartmentId",as:"apartment", sourceKey: "id"})
Contract.belongsTo(Apartment, {foreignKey: "apartmentId",as:"apartment", targetKey: "id"})