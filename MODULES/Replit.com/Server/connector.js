const connectToRemoteServer = (url, connection) => {
  const server = io(String(url));
  server.emit("requestConnection");
  server.on("allowedConnection", () => {
    connection({
      connection: true,
      server: server
    })
  });
}