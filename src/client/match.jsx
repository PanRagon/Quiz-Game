import React from "react";

export class Match extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            match: null,
            error: null
        }
    }

    componentDidMount() {
        this.startMatch()
    }

    startMatch = async () => {
        const quizzes = await this.getRandomQuizzes(3);

        this.setState(
            !quizzes
                ? {error: "Error when connecting to the server" }
                : {
                    error: null,
                    match: {
                        victory: false,
                        defeat: false,
                        quizzes,
                        currentIndex: 0,
                        numberOfQuizzes: quizzes.length
                    }
                }
        )
    };

    getRandomQuizzes = async numberOfQuizzes => {
        if (numberOfQuizzes < 1) {
            throw "Invalid number of requested quizzes: " + n;
        }

        const url = "/api/matches";
        let response;
        let payload;

        try {
            response = await fetch(url, {method: "post"});
            payload = await response.json();
        } catch (err) {
            return null;
        }

        if (response.status !== 201) {
            return null;
        }

        return payload;
    };

    handleOnClick(i) {
        if(i === this.state.match.quizzes[this.state.match.currentIndex].correctAnswer) {
            if(this.state.match.currentIndex === (this.state.match.numberOfQuizzes - 1)) {
                //Quiz Completed
                this.setState({match: {victory: true}});
            }   else {
                this.setState(prev => ({
                    match: {
                        currentIndex: prev.match.currentIndex + 1,
                        quizzes: prev.match.quizzes,
                        numberOfQuizzes: prev.match.numberOfQuizzes
                    }
                }))
            }
        } else {
            this.setState({match: {defeat: true}})
        }
    }

    renderAnswerTags(prefix, answer, i) {
        return <div className="answerTags" onClick={() => this.handleOnClick(i)} tabIndex="0">{prefix + answer}</div>
    }


    render() {

        if(!this.state.match) {
            return <h2>Loading...</h2>
        }
        if(this.state.match.victory) {
            return (
                <div>
                    <h2>Congrats, You Won!</h2>
                    <button className="new-game-button" onClick={this.startMatch}>Start New Match</button>
                </div>
            )
        }
        if(this.state.match.defeat) {
            return(
                <div>
                    <h2>Sorry, You Lost!</h2>
                    <button className="new-game-button" onClick={this.startMatch}>Start New Match</button>
                </div>
            )
        }

        const match = this.state.match;
        const count = "" + (match.currentIndex + 1) + "/" + match.numberOfQuizzes;
        const quiz = match.quizzes[match.currentIndex];

        return(
            <div id={"quiz_" + quiz.id} className={"quiz"}>
                <p className="question">Question {count}: {quiz.question}</p>
                {this.renderAnswerTags("A: ", quiz.answers[0], 0)}
                {this.renderAnswerTags("B: ", quiz.answers[1], 1)}
                {this.renderAnswerTags("C: ", quiz.answers[2], 2)}
                {this.renderAnswerTags("D: ", quiz.answers[3], 3)}

                {this.state.message && <h3>{this.state.message}</h3>}
            </div>
        )

    }
}
