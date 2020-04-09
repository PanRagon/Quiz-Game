const quizzes = [
    {
        question: "Who created Javascript?",
        answers: ["Brendan Eich", "Jacob Eich", "Brandon Lake", "James Gosling"],
        correctAnswer: 0,
        id: 0
    },
    {
        question: "What company owns Github?",
        answers: ["Apple", "Amazon", "Microsoft", "Git"],
        correctAnswer: 2,
        id: 1
    },
    {
        question: "Who's Joe?",
        answers: ["Joe Pesci", "Joe Mama!", "Joseph Stalin", "Joe Biden"],
        correctAnswer: 1,
        id: 2
    }
];

function getRandomQuizzes(count) {
    if(count > quizzes.length) {
        throw "We don't have that many quizzes available, there are only " + quizzes.length + " available";
    } else if(count <= 0) {
        throw "Haha... Please enter a positive number";
    }

    const selection = Array(count);

    let i = 0;

    while (i < count) {

        const k = Math.floor(quizzes.length * Math.random());
        if (selection.includes(k)) {
            continue;
        }
        selection[i] = k;
        i++;
    }

    return Array.from(selection).map(e => quizzes[e]);

}

module.exports = {quizzes, getRandomQuizzes};
