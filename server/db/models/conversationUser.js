const Sequelize = require("sequelize");
const db = require("../db");

const ConversationUser = db.define("conversation_user", {
  conversationId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: false,
  },
});

module.exports = ConversationUser;
