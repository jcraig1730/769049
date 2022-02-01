const { Op, INTEGER } = require("sequelize");
const db = require("../db");
const Message = require("./message");

const Conversation = db.define("conversation", {
  user1UnreadCount: {
    type: INTEGER,
    defaultValue: 0
  },
  user2UnreadCount: {
    type: INTEGER,
    defaultValue: 0
  },
});

// find conversation given two user Ids

Conversation.findConversation = async function (user1Id, user2Id) {
  const conversation = await Conversation.findOne({
    where: {
      user1Id: {
        [Op.or]: [user1Id, user2Id]
      },
      user2Id: {
        [Op.or]: [user1Id, user2Id]
      }
    }
  });

  // return conversation or null if it doesn't exist
  return conversation;
};

// increment unread message counts

Conversation.prototype.incrementUser1UnreadCount = function(){
  this.user1UnreadCount += 1;
}

Conversation.prototype.incrementUser2UnreadCount = function(){
  this.user2UnreadCount += 1;
}

// zero out unread message counts

Conversation.prototype.clearUser1UnreadCount = function(){
  this.user1UnreadCount = 0;
}

Conversation.prototype.clearUser2UnreadCount = function(){
  this.user2UnreadCount = 0;
}

module.exports = Conversation;
