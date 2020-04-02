const quizzes = [
    {
        question: "Who created Javascript?",
        answers: ["Brendan Eich", "Jacob Eich", "Brandon Lake", "James Gosling"],
        correctAnswer: 0
    },
    {
        question: "What company owns Github?",
        answers: ["Apple", "Amazon", "Microsoft", "Git"],
        correctAnswer: 2
    },
    {
        question: "Who's Joe?",
        answers: ["Joe Pesci", "Joe Mama!", "Joseph Stalin", "Joe Biden"],
        correctAnswer: 1
    }
];

function getRandomQuizzes(count) {
    count = parseInt(count);
    if(count === "NaN") {
        throw new Error("Please enter a valid number");
    } else if(count > quizzes.length) {
        throw new Error("We don't have that many quizzes available, there are only " + quizzes.length + " available");
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

module.exports.getRandomQuizzes = getRandomQuizzes;
