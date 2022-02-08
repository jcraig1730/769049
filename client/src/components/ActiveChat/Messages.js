import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";

const Messages = (props) => {
  const [lastReadId, setLastReadId] = useState();
  const { messages, otherUser, userId } = props;

  useEffect(() => {
    const lastReadMessage = messages.reduce((lastReadMessage, message) => {
      return (message.read && message.senderId === userId) ? message : lastReadMessage;
    }, null)
    setLastReadId(lastReadMessage?.id);
  }, [messages, userId])

  const avatarStyle = {
    height: 20,
    width: 20,
    marginTop: 6,
    marginLeft: 'calc(100% - 20px)'
  }

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        const lastRead = lastReadId === message.id
        return message.senderId === userId ? (
          <SenderBubble 
            avatarStyle={avatarStyle} 
            lastRead={lastRead} 
            otherUser={otherUser} 
            key={message.id} text={message.text} 
            time={time} 
          />
        ) : (
          <OtherUserBubble 
            avatarStyle={avatarStyle} 
            lastRead={lastRead} 
            key={message.id} 
            text={message.text} 
            time={time} 
            otherUser={otherUser} />
        );
      })}
    </Box>
  );
};

export default Messages;
