const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const MessageReadStatus = require("./messageReadStatus");

// associations

User.hasMany(Conversation);
Conversation.belongsToMany(User, {through: 'conversation_users'});
Message.belongsTo(Conversation);
Conversation.hasMany(Message);
Message.hasMany(MessageReadStatus);
MessageReadStatus.belongsTo(Message);

module.exports = {
  User,
  Conversation,
  Message,
  MessageReadStatus,
};
