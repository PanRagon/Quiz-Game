import React from "react";
import {Link, withRouter} from "react-router-dom";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            password: "",
            error: null
        };
    };

    onUsernameChange = event => {
        this.setState({id: event.target.value})
    };

    onPasswordChange = event => {
        this.setState({password: event.target.value});
    };

    doLogin = async () => {
        const {id, password} = this.state;

        const url = "/api/login";

        const payload = {id, password};

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

        if (response.status === 401) {
            this.setState({error: "Invalid username or password"});
            return;
        }

        if (response.status !== 204) {
            this.setState({ error: "Error when connecting to server: Status code " + response.status});
            return;
        }

        this.setState({error: null});
        await this.props.fetchAndUpdateUserInfo();
        this.props.history.push("/");
    };

    render() {
        let error = <div></div>
        if (this.state.error) {
            error = (
                <div className={"error-message"}>
                    <p>{this.state.error}</p>
                </div>
            );
        }

        return (
            <div className="center">
                <div>
                    <p>Username:</p>
                    <input
                        type="text"
                        value={this.state.id}
                        onChange={this.onUsernameChange}
                    />
                </div>
                <div>
                    <p>Password:</p>
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                    />
                </div>

                {error}

                <button className="button" onClick={this.doLogin}>
                    Log In
                </button>
                <Link className="button" tabIndex="0" to={"/register"}>
                    Register
                </Link>
            </div>
        )
    }
}

export default withRouter(Login);