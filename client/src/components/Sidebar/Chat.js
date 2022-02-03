import React, { useEffect, useState } from "react";
import { Box, Badge } from "@material-ui/core";
import { BadgeAvatar, ChatContent } from "../Sidebar";
import { makeStyles } from "@material-ui/core/styles";
import { setActiveChat } from "../../store/activeConversation";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 8,
    height: 80,
    boxShadow: "0 2px 10px 0 rgba(88,133,196,0.05)",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    "&:hover": {
      cursor: "grab"
    }
  },
  badge: {
    "& > *": {
      right: '15px',
    },
  } 
}));

const Chat = (props) => {
  const classes = useStyles();
  const { conversation } = props;
  const { otherUser } = conversation;
  const [unreadCount, setUnreadCount] = useState(0);

  const handleClick = async (conversation) => {
    await props.setActiveChat(conversation.otherUser.username);
  };

  useEffect(() => {
    const unreadCount = props.conversation.messages.reduce((count, msg) => {
      if (msg.senderId === conversation.otherUser.id && msg.read === false) {
        return count + 1;
      }
      return count;
    }, 0)
    setUnreadCount(unreadCount);
  }, [props.conversation.messages, conversation.otherUser.id])

  return (
    <Box onClick={() => handleClick(conversation)} className={classes.root}>
      <BadgeAvatar
        photoUrl={otherUser.photoUrl}
        username={otherUser.username}
        online={otherUser.online}
        sidebar={true}
      />
      <ChatContent  
        conversation={conversation} 
        unreadMessages={unreadCount > 0} 
      />

      <Badge 
        className={classes.badge} 
        badgeContent={unreadCount} 
        color="primary" 
      />
 
    </Box>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveChat: (id) => {
      dispatch(setActiveChat(id));
    }
  };
};

export default connect(null, mapDispatchToProps)(Chat);
