const Conversation = require("./conversation");
const User = require("./user");
const Message = require("./message");
const MessageReadStatus = require("./messageReadStatus");
const ConversationUser = require("./conversationUser");

// associations

User.belongsToMany(Conversation, { through: ConversationUser });
Conversation.belongsToMany(User, { through: ConversationUser });
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
