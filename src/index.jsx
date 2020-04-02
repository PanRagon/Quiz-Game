import React from "react";
import ReactDOM from "react-dom";

import {getRandomQuizzes} from "./quizzes";

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {quiz: getRandomQuizzes(1)[0]}
    }

    handleOnClick(i) {
        if(i === this.state.quiz.correctAnswer) {
            alert("Nice job!");
            this.setState({quiz: getRandomQuizzes(1)[0]})
        } else {
            alert("Really? That's wrong, dude.");
        }
    }

    renderAnswerTags(i) {
        return <div className="answerTag" onClick={() => this.handleOnClick(i)}>{this.state.quiz.answers[i]}</div>
    }


    render() {
        const quiz = this.state.quiz;

        return(
            <>
                <p className="question">Question: {quiz.question}</p>
                {this.renderAnswerTags(0)}
                {this.renderAnswerTags(1)}
                {this.renderAnswerTags(2)}
                {this.renderAnswerTags(3)}
            </>
        )

    }
}

ReactDOM.render(<App/>, document.getElementById("root"));