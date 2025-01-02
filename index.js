import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { assert, log } from "node:console";

import { Game } from "./modules/game.js";
import testQuiz from "./modules/test.quiz.json" assert { type: "json" };

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server);

const game = new Game(0);

const port = process.env.PORT;
const boss = process.env.BOSS;
const bosspw = process.env.BOSSPW;

console.log(boss);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on("hi", (name, room) => {
        const bossName = boss == name ? true : false;
        const roomCheck = game.getId() == parseInt(room) ? true : false;

        if (game.getPlayers().includes(name)) {
            io.to(socket.id).emit("nameError", "Foglalt név!");
        } else {
            io.to(socket.id).emit("nameCorrect", bossName, room, name);
            if (!bossName) {
                game.addNewPlayer(name);
                io.emit("hi", game.getPlayers());
            }
            if (bossName) {
                game.setAdmin(name);
                io.to(socket.id).emit("quizList", Object.keys(testQuiz));
            }
        }
    });

    socket.on("quizSelect", (name) => {
        io.to(socket.id).emit("quizData", testQuiz[name]);
        io.emit("quizTitle", name);
    });
});

server.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});
