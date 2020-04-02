const quizzes = require("../src/quizzes");

test("Selects 2 to get 2 random quizzes from the quiz array", () => {
    const arr = quizzes.getRandomQuizzes(2);
    expect(arr).toHaveLength(2);
});