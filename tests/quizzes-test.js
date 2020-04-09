const {getRandomQuizzes} = require("../src/server/db/quizzes");

test("Selects 2 to get 2 random quizzes from the quiz array", () => {
    for(let i=0; i<10; i++) {
        const arr = getRandomQuizzes(2);
        expect(arr).toHaveLength(2);
        expect(arr[0].question).not.toBe(arr[1].question);
    }
});

describe("Test input larger than quiz array", () => {
    it("Should throw error if more requested more tests than exists in array", () => {
        expect(() => getRandomQuizzes(1000)).toThrow();
    })
});

describe("Test negative integer as input", () => {
    it("Should throw error if given negative integers as input", () => {
        expect(() => getRandomQuizzes(-1)).toThrow();
    })
});
