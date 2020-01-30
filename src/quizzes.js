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
    if(count > quizzes.length) {
        throw new Error("We don't have that many quizzes available, there are only " + quizzes.length + " available");
    } else if(count <= 0) {
        throw "Haha... Please enter a positive number";
    } else {
        let chosenQuizzes = [];
        let tempQuizzes = quizzes;
        const runs = count;
        for(let i= 0; i < runs; i++) {
            let chosen = Math.floor(Math.random() * tempQuizzes.length);
            chosenQuizzes.push(tempQuizzes[chosen]);
            tempQuizzes.splice(chosen-1, 1);
        }

        return chosenQuizzes;
    }
}

module.exports.getRandomQuizzes = getRandomQuizzes;
