export default socket => {
  socket.tokenExpTimeout = socket.decoded_token.exp && setTimeout(() => {
    socket.emit("unauthorized", { message: "jwt expired" }, () =>
      socket.disconnect("unauthorized")
    );
  }, socket.decoded_token.exp * 1000 - Date.now());

  socket.on("disconnect", socket => {
    if (socket.tokenExpTimeout) clearTimeout(socket.tokenExpTimeout);
  });
  //this socket is authenticated, we are good to handle more events from it.
  socket.emit("successLogin", socket.decoded_token.user);
  socket.on("news", data => console.log(data));
};
