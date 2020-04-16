const React = require('react');
const {mount} = require('enzyme');
const {Match} = require("../../src/client/match");
const {quizzes} = require("../../src/server/db/quizzes");
const {overrideFetch, asyncCheckCondition} = require('../mytest-utils');
const app = require('../../src/server/app');
const {deleteAllUsers} = require("../../src/server/db/users");

beforeEach(() => {
    deleteAllUsers();
});

async function register(id, password) {

    const response = await fetch("/api/register", {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({id, password})
    });

    return response.status === 201;
}

function checkQuizIsDisplayed(driver)  {
    const quiz = driver.find(".quiz");
    const question = driver.find(".question");
    const answers = driver.find(".answerTags");

    return quiz.length === 1 && question.length === 1 && answers.length === 4;
}

function getDisplayedQuiz(driver) {

    const quizDiv = driver.find(".quiz").at(0);
    const html_id = quizDiv.prop("id");
    const id = parseInt(html_id.substring("quiz_".length, html_id.length));

    const quiz = quizzes.find(e => e.id === id);
    return quiz;
}

async function waitForQuizDisplay(driver) {

    const displayed = await asyncCheckCondition(() => {
        driver.update();
        return checkQuizIsDisplayed(driver);
    }, 2000, 200);

    return displayed;
}

test("Test question is rendered", async () => {
    overrideFetch(app);

    const registered = await register("foo", "bar");
    expect(registered).toEqual(true);

    const driver = mount(<Match props={{user: {id: "foo", password: "bar", victories: 0, defeats: 0}}}/>);

    const displayed = await waitForQuizDisplay(driver);

    expect(displayed).toEqual(true);
});




test("Test do answer incorrectly", async () => {

    overrideFetch(app);

    await register("foo", "bar");
    const driver = mount(<Match props={{user: {id: "foo", password: "bar", victories: 0, defeats: 0}}}/>);
    await waitForQuizDisplay(driver);

    const quiz = getDisplayedQuiz(driver);
    const wrong = (quiz.correctAnswer + 1) % 4;

    const wrongAnswer = driver.find(".answerTags").at(wrong);
    wrongAnswer.simulate("click");

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(true);
    expect(won).toEqual(false);

});

test("Test do answer correctly", async () => {

    overrideFetch(app);

    await register("foo", "bar");
    const driver = mount(<Match props={{user: {id: "foo", password: "bar", victories: 0, defeats: 0}}}/>);
    await waitForQuizDisplay(driver);

    const quiz = getDisplayedQuiz(driver);
    const correct = quiz.correctAnswer;

    const correctAnswer = driver.find(".answerTags").at(correct);
    correctAnswer.simulate("click");

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(false);

    //Game should still be playing
    const displayed= await waitForQuizDisplay(driver);
    expect(displayed).toEqual(true);
});

test("Test win match", async () => {

    overrideFetch(app);

    await register("foo", "bar");
    const driver = mount(<Match props={{user: {id: "foo", password: "bar", victories: 0, defeats: 0}}}/>);
    await waitForQuizDisplay(driver);

    const quiz = getDisplayedQuiz(driver);
    for(let i=0; i<3; i++) {
        const quiz = getDisplayedQuiz(driver);
        const correct = quiz.correctAnswer;

        const correctAnswer = driver.find(".answerTags").at(correct);
        correctAnswer.simulate("click");

        driver.update();
    }

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(true);

});
