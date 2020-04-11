import React from "react";
import {Link, withRouter } from "react-router-dom";

class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }

    doLogout = async () => {
        const url = "/api/logout";

        let response;

        try {
            response = await fetch(url, {method: "post"});
        } catch (err) {
            alert("Failed to connect to server: " + err);
            return;
        }

        if (response.status !== 204) {
            alert("Error when connecting to server: status code " + response.status);
            return;
        }

        this.props.updateLoggedInUser(null);
        this.props.history.push("/");
    };

    renderLoggedIn(id) {
        return (
            <React.Fragment>
                <p className="header-text">
                    Welcome {id} !!!
                </p>
                <button className="header-buttons" onClick={this.doLogout}>
                    Logout
                </button>
            </React.Fragment>
        )
    }

    renderNotLoggedIn() {
        return (
            <React.Fragment>
                <p className="header-text">You are not logged in</p>
                <div className="action-buttons">
                    <Link className="header-buttons" to="/login" tabIndex="0">
                        Log in
                    </Link>
                    <Link className="header-buttons" to="/register" tabIndex="0">
                        Sign up
                    </Link>
                </div>
            </React.Fragment>
        )
    }

    render() {
        const id = this.props.id;

        let content;
        if(!id) {
            content = this.renderNotLoggedIn();
        } else content = this.renderLoggedIn(id);

        return (
            <div className="header">
                <Link className="header-logo" to={"/"} tabIndex="0">
                    Quiz
                </Link>
                {content}
            </div>
        )
    }
}

export default withRouter(HeaderBar);
