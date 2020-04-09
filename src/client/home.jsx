import React from "react";
import {Link} from "react-router-dom";


export class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
                <h1>Welcome to the Quiz Game!</h1>
                <Link to={"/match"} className={"play"}>
                    <button>Start a new match</button>
                </Link>
            </>
        )
    }
}