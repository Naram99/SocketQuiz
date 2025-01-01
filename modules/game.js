export class Game {
    _id;
    _questions;
    _players;

    constructor(id = 0, questions = "test.quiz.json") {
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

    addNewPlayer(name) {
        this._players.push(name);
        return true;
    }

    getPlayers() {
        return this._players;
    }
}
