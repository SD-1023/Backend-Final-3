"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionModel = void 0;
var db_1 = require("../config/db");
var sequelize_1 = require("sequelize");
var sessionModel = db_1.sequelize.define('sessions', {
    sessionID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'sessions'
});
exports.sessionModel = sessionModel;
