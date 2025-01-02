const socket = io();

const enterForm = document.querySelector("#enterForm");
const playerName = document.querySelector("#playerName");
const roomInput = document.querySelector("#roomInput");
const errorText = document.querySelector("#errorText");

const roomName = document.querySelector("#roomName");
const playerList = document.querySelector("#playerList");
const welcomeText = document.querySelector("#welcomeText");

const adminControls = document.querySelector("#adminControls");
const quizList = document.querySelector("#quizList");

const playerControls = document.querySelector("#playerControls");
const playerDisplay = document.querySelector("#playerDisplay");
const playerPoints = document.querySelector("#playerPoints");
const quizTitle = document.querySelector("#quizTitle");

enterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (playerName.value && roomInput.value) {
        const player = playerName.value;
        const room = roomInput.value;

        socket.emit("hi", player, room);
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

socket.on("nameError", (msg) => {
    errorText.textContent = msg;
});

socket.on("nameCorrect", (bossName, room, name) => {
    errorText.textContent = "";
    enterForm.innerHTML = "";
    roomName.textContent = room;
    playerDisplay.textContent = name;

    if (bossName) {
        adminControls.style.display = "flex";
    } else {
        playerControls.style.display = "flex";
    }
});

socket.on("quizList", (quizNameList) => {
    quizNameList.forEach((quiz) => {
        const quizLi = document.createElement("li");
        quizLi.textContent = quiz;
        quizLi.addEventListener("click", () => {
            socket.emit("quizSelect", quiz);
        });
        quizList.appendChild(quizLi);
    });
});

socket.on("quizData", (data) => {
    console.log(data);
});

socket.on("quizTitle", (title) => {
    quizTitle.textContent = title;
});
