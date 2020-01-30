let guessed = false;
let correctAnswer;
const questionDiv = document.getElementById("question");
const answerAlternatives = document.getElementById("answer-alternatives");
const answerDiv1 = document.getElementById("answer1");
const answerDiv2 = document.getElementById("answer2");
const answerDiv3 = document.getElementById("answer3");
const answerDiv4 = document.getElementById("answer4");
const result = document.getElementById("result");
const newQuestionButton = document.getElementById("new-game-btn");

function giveQuestion() {
    result.innerText = "";
    let quiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    correctAnswer = quiz.correctAnswer;
    questionDiv.innerText = quiz.question;
    let answersDivs = answerAlternatives.children;
    for (let i = 0; i < answersDivs.length; i++) {
        answersDivs[i].innerText = quiz.answers[i];
        answersDivs[i].onclick = () => verifyAnswer(i);
    }
    guessed = false;
}

function verifyAnswer(answer) {
    if (guessed === false) {
        if (answer === correctAnswer) {
            result.innerText = "That's correct, good job!"
        } else {
            result.innerText = "Sorry, you guessed wrong, try a new question!"
        }
        guessed = true;
    }
}

newQuestionButton.onclick = () => giveQuestion();
giveQuestion();
