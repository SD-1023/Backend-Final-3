"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressModel = void 0;
var db_1 = require("../config/db");
var sequelize_1 = require("sequelize");
var addressModel = db_1.sequelize.define('adresses', {
    adressID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userID: {
        type: sequelize_1.DataTypes.INTEGER
    },
    street: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pinCode: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'addresses'
});
exports.addressModel = addressModel;
