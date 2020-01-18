import "./css/main.css";
import * as signalR from "@aspnet/signalr";

const colors: Array<string> = [ "red", "blue", "green", "orange", "gray", "black" ];
const min:      number = 1;
const max:      number = 7;
const random:   number = Math.random() * (min - max) + 1;
const x:        number = Math.round(Math.abs(random));

let selectedColor: string = colors[x];

const lblColor: HTMLSpanElement = document.querySelector("#lblColor");
lblColor.innerText = selectedColor;

const divMessages:  HTMLDivElement = document.querySelector("#divMessages");
const tbMessage:    HTMLInputElement = document.querySelector("#tbMessage");
const btnSend:      HTMLButtonElement = document.querySelector("#btnSend");

const tbUsername: HTMLInputElement = document.querySelector('#tbUsername');

const connection = new signalR.HubConnectionBuilder()
    .withUrl("/hub")
    .build();

connection.start().catch(err => document.write(err));

connection.on("messageReceived", (username: string, message: string) => {
    let messageEl = document.createElement("div");
    messageEl.innerHTML = `<div class="message__author" style="background-color: ${selectedColor}">${username}</div><div class="message__text">${message}</div>`;
    divMessages.appendChild(messageEl);
    divMessages.scrollTop = divMessages.scrollHeight;
});

tbMessage.addEventListener("keyup", (e: KeyboardEvent) => {
    if (e.keyCode === 13) {
        send();
    }
});

btnSend.addEventListener("click", send);

function send() {
    const username = tbUsername.value;
    tbUsername.disabled = true;
    connection.send("newMessage", username, tbMessage.value)
        .then(() => tbMessage.value = "");
}
