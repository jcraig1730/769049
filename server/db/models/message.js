const Sequelize = require("sequelize");
const { Op } = require('sequelize');
const db = require("../db");

const Message = db.define("message", {
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  senderId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  read: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Message.updateReadStatus =  async ( conversationId, userId ) => {
  await Message.update(
    { read: true }, 
    { where: { conversationId, senderId: { [Op.not]: userId}, read: false, } },
  );
}

module.exports = Message;
