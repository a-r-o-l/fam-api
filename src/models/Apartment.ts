import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
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