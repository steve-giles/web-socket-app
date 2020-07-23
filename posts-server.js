/**
 * WebSocket server
 * Can test this server using
 * - https://www.websocket.org/echo.html
 * - chrome-extension://pfdhoblngboilpfeibdedpjgfnlcodoo/index.html
 */
var ws = require("nodejs-websocket");
const port = 8000;

/**
 * Returns a new server object
 * @type {Server}
 */
var server = ws.createServer(function (conn) {
  console.log("New connection received ");
  conn.on("msg", function(message) {
    console.log('messge received: ' + message.utf8Data)
  });
  conn.on("text", function (str) {
    // Emitted when a text is received. str is a string
    console.log("Received "+str)

    // send a response back to the client
    conn.sendText(str.toUpperCase()+"!!!");

    // send a message to all clients
    broadcast(server, "to all clients");
  })
  conn.on("close", function (code, reason) {
    console.log("Connection closed")
  });
  conn.on("error", function(){
    console.log("Error - Connection lost")
  });
});

/**
 * Starts accepting connections on a given port and host.
 */
server.listen(port,(err) => {
  console.log(`server listening on ${port}`)
});

/**
 * Broadcasts a message to all clients
 * @param server
 * @param msg
 */
function broadcast(server, msg) {
  server.connections.forEach(function (conn) {
    conn.sendText(msg)
  })
}
