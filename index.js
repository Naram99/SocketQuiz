import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { log } from "node:console";

import { Game } from "./modules/game.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const server = createServer(app);
const io = new Server(server);

const game = new Game(0);

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("hi", (name) => {
        game.addNewPlayer(name);
        io.emit("hi", game.getPlayers());
    });
});

server.listen(port, () => {
    console.log(`Server is running at localhost:${port}`);
});
