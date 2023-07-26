// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

// Bygg en SignalR-anslutning
var connection = new signalR.HubConnectionBuilder()
    .withUrl("/chathub")
    .build();

// Lägg till en eventlistener med callback för när ett meddelande tas emot
connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    li.textContent = user + ": " + message;
    document.getElementById("messages").appendChild(li);
});

// Lägg till en eventlistener för Skicka-knappen
document.getElementById("btnSend").addEventListener("click", function (event) {
    var user = document.getElementById("txtUser").value;
    var message = document.getElementById("txtMessage").value;

    // Skicka meddelandet till servern
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });

    event.preventDefault(); // Förhindra att formuläret skickas
});

// Starta SignalR-anslutningen
connection.start().then(function () {
    console.log("SignalR connected!");
}).catch(function (err) {
    return console.error(err.toString());
});