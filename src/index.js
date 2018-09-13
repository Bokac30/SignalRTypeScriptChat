"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./css/main.css");
var signalR = require("@aspnet/signalr");
var divMessages = document.querySelector("#divMessages");
var tbMessage = document.querySelector("#tbMessage");
var btnSend = document.querySelector("#btnSend");
//const username = new Date().getTime();
var tbUsername = document.querySelector('#tbUsername');
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();
connection.start().catch(function (err) { return document.write(err); });
connection.on("messageReceived", function (username, message) {
    var m = document.createElement("div");
    m.innerHTML = "<div class=\"message__author\">" + username + "</div><div>" + message + "</div>";
    divMessages.appendChild(m);
    divMessages.scrollTop = divMessages.scrollHeight;
});
tbMessage.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        send();
    }
});
btnSend.addEventListener("click", send);
function send() {
    var username = tbUsername.value;
    tbUsername.disabled = true;
    connection.send("newMessage", username, tbMessage.value)
        .then(function () { return tbMessage.value = ""; });
}
//# sourceMappingURL=index.js.map