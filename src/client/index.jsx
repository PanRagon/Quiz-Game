import React from "react";
import ReactDOM from "react-dom";

import {Match} from "./match";
import {Home} from "./home";
import {Switch, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import {NotFound} from "./notfound";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Switch>
                    <Route exact path="/match" component={Match} />
                    <Route exact path="/" component={Home} />
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    )
};

ReactDOM.render(<App/>, document.getElementById("root"));