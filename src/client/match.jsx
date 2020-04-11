import React from "react";
import { withRouter } from "react-router-dom";

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

    trackVictory = async () => {
        const id = this.props.user.id;
        const isVictory = this.state.match.victory;
        const url = "/api/report";
        let payload = {id: id, isVictory: isVictory};
        let response;
        try {
            response = await fetch(url, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });
        } catch (err) {
            this.setState({error: "Failed to connect to server: " + err});
            return;
        }

        if (response.status === 400) {
            this.setState({ error: "Invalid username or password" });
            return;
        }
        if (response.status !== 200) {
            this.setState({
                error:
                    "Error when connecting to server: status code " + response.status
            });
            return;
        }

        this.setState({error: null});
        await this.props.fetchAndUpdateUserInfo();

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
                this.setState({match: {victory: true}}, () => {this.trackVictory()});
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
            this.setState({match: {defeat: true}},
                () => {this.trackVictory()});
        }
    }

    renderAnswerTags(prefix, answer, i) {
        return <div className="answerTags" onClick={() => this.handleOnClick(i)} tabIndex="0">{prefix + answer}</div>
    }


    render() {
        let error = <div></div>;
        if (this.state.error) {
            error = (
                <div className="errorMsg">
                    <p>{this.state.error}</p>
                </div>
            );
        }

        if(!this.state.match) {
            return <h2>Loading...</h2>
        }
        if(this.state.match.victory) {
            return (
                <div>
                    {error}
                    <h2>Congrats, You Won!</h2>
                    <button className="new-game-button" onClick={this.startMatch}>Start New Match</button>
                </div>
            )
        }
        if(this.state.match.defeat) {
            return(
                <div>
                    {error}
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
                {error}
            </div>
        )

    }
}

export default withRouter(Match);