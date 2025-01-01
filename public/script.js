console.log("script running");

const socket = io();

const enterForm = document.querySelector("#enterForm");
const playerName = document.querySelector("#playerName");
const playerList = document.querySelector("#playerList");
const welcomeText = document.querySelector("#welcomeText");

enterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (playerName.value) {
        const player = playerName.value;
        welcomeText.textContent = `Üdv, ${player}`;

        socket.emit("hi", player);
        enterForm.innerHTML = "";
    }
});

socket.on("hi", (nameList) => {
    playerList.innerHTML = "";
    nameList.forEach((player) => {
        const playerLi = document.createElement("li");
        playerLi.textContent = player;
        playerList.appendChild(playerLi);
    });
});
