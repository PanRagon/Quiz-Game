const express = require('express');
const Users = require("../db/users");
const {getRandomQuizzes} = require('../db/quizzes');

const router = express.Router();



router.post('/matches', (req, res) => {

    const payload = getRandomQuizzes(3);

    res.status(201).json(payload);
});

router.post("/report", (req, res) => {
    if(Users.getUser(req.body.id) === null) {
        res.status(400).send();
        return;
    }

    Users.reportEndOfMatch(req.body.id, req.body.isVictory);
    res.status(200).send();
});

module.exports = router;