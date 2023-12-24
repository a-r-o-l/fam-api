import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Task } from "./Task";


export const Project =sequelize.define("Project", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    priority: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
}, {
    timestamps: false
})

Project.hasMany(Task, {foreignKey: "projectId", sourceKey: "id"})
Task.belongsTo(Project, {foreignKey: "projectId", targetKey: "id"})
