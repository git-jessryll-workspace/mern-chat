let onlineUsers = [];

export default function SocketServer(socket) {
  socket.on("join", (user) => {
    socket.join(user);
    if (!onlineUsers.some((u) => u.userId === user)) {
      onlineUsers.push({ userId: user, socketId: socket.id });
    }
    socket.emit("get-online-users", onlineUsers);
  });
  socket.on("join conversation", (conversation) => {
    socket.join(conversation);
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    socket.emit("get-online-users", onlineUsers);
  });

  // send and receive message
  socket.on("send message", (message) => {
    let conversation = message.conversation;
    if (!conversation.users) return;

    conversation.users.forEach((user) => {
      if (user._id === message.sender?._id) return;
      socket.in(user._id).emit("receive message", message);
    });
  });

  socket.on("typing", (conversation) => {
    socket.broadcast.emit("typing-receive", conversation);
  });

  socket.on("stop typing", (conversation) => {
    socket.broadcast.emit('stop typing', conversation)
  });
}
