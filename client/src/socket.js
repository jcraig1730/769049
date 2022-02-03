import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  updateReadStatus,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    const state = store.getState();
    if (state.user.id === data.recipientId) {
      store.dispatch(setNewMessage(data.message, data.sender));
    }
  });
  socket.on("mark-read", (data) => {
    const { conversationId, userId } = data;
    store.dispatch(updateReadStatus(conversationId, userId))
  })
});

export default socket;
