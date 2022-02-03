const Sequelize = require("sequelize");
const { Op } = require('sequelize');
const db = require("../db");

const MessageReadStatus = db.define("message_read_status", {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});

module.exports = MessageReadStatus;
