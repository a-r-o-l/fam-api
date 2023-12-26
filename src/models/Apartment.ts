import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Contract } from "./Contract";
import { Renter } from "./Renter";

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
    },
    date_start: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    date_end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    isExpired: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    renterId:{
        type: DataTypes.INTEGER,
    },
    buildId:{
        type: DataTypes.INTEGER,
    }
},)

Apartment.hasOne(Renter, {foreignKey: "apartmentId",as:'apartment', sourceKey: "id", onUpdate: 'CASCADE'})
Renter.belongsTo(Apartment, {foreignKey: "apartmentId",as:'apartment', targetKey: "id", onUpdate: 'CASCADE'})