export class Game {
    _id;
    _quizzes;
    _questions;
    _players;
    _admin = undefined;
    _open = false;

    constructor(id = 0, quizzes = "test.quiz.json") {
        if (id > 0) this._id = id;
        else this._id = this.generateId();
        console.log(this._id);

        // this._questions = require(questions);
        // console.log(this._questions);

        this._players = [];
    }

    generateId() {
        return Math.ceil(Math.random() * 999999);
    }

    getId() {
        return this._id;
    }

    setAdmin(name) {
        this._admin = name;
    }

    getOpen() {
        return this._open;
    }

    setOpen(bool) {
        this._open = bool;
    }

    addNewPlayer(name) {
        this._players.push(name);
        return true;
    }

    getPlayers() {
        return this._players;
    }

    /*
    async listQuizzes(file) {
        fetch(file)
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Error while reading quiz file.");
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.error("Unable to fetch file:", err);
            });
    }
            */
}
