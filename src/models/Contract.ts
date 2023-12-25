import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Apartment } from "./Apartment";
import { Renter } from "./Renter";

export const Contract = sequelize.define("Contract", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
    
    
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true
})