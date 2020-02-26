const quizzes = require("../src/quizzes");

test("Selects 2 to get 2 random quizzes from the quiz array", () => {
    expect(getRandomQuizzes(2).toEqual(expect.length === 2))
})