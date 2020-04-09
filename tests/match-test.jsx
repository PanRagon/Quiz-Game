const React = require("react");
const { mount } = require("enzyme");
const { Match } = require("../src/client/match");
const { quizzes } = require("../src/server/db/quizzes");

function checkQuizIsDisplayed(driver)  {
    const quiz = driver.find(".quiz");
    expect(quiz.length).toEqual(1);

    const question = driver.find(".question");
    expect(question.length).toEqual(1);

    const answers = driver.find(".answerTags");
    expect(answers.length).toEqual(4);
}

function getDisplayedQuiz(driver) {

    const quizDiv = driver.find(".quiz").at(0);
    const html_id = quizDiv.prop("id");
    const id = parseInt(html_id.substring("quiz_".length, html_id.length));

    const quiz = quizzes.find(e => e.id === id);
    return quiz;
}

test("Enzyme rendered Question", () => {
    const driver = mount(<Match/>);
    checkQuizIsDisplayed(driver);
});


test("Clicking answer does change state", () => {

    const driver = mount(<Match/>);

    const prev = driver.state();

    const first = driver.find(".answerTags").at(0);
    first.simulate("click");

    const current = driver.state();
    expect(current).not.toEqual(prev);
});

test("Test do answer incorrectly", () => {
    const driver = mount(<Match/>);

    checkQuizIsDisplayed(driver);

    const quiz = getDisplayedQuiz(driver);
    const wrong = (quiz.correctAnswer + 1) % 4;

    const wrongAnswer = driver.find(".answerTags").at(wrong);
    wrongAnswer.simulate("click");

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(true);
    expect(won).toEqual(false);

});

test("Test do answer correctly", () => {
    const driver = mount(<Match/>);

    checkQuizIsDisplayed(driver);

    const quiz = getDisplayedQuiz(driver);
    const correct = quiz.correctAnswer;

    const correctAnswer = driver.find(".answerTags").at(correct);
    correctAnswer.simulate("click");

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(false);

    checkQuizIsDisplayed(driver);
});

test("Test win match", () => {
    const driver = mount(<Match/>);

    checkQuizIsDisplayed(driver);

    for(let i=0; i<3; i++) {
        const quiz = getDisplayedQuiz(driver);
        const correct = quiz.correctAnswer;

        const correctAnswer = driver.find(".answerTags").at(correct);
        correctAnswer.simulate("click");
    }

    const lost = driver.html().includes("Lost");
    const won = driver.html().includes("Won");

    expect(lost).toEqual(false);
    expect(won).toEqual(true);

});
