"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageModel = void 0;
var db_1 = require("../config/db");
var sequelize_1 = require("sequelize");
var imageModel = db_1.sequelize.define('images', {
    imageID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    productID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    imgPath: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'images'
});
exports.imageModel = imageModel;
