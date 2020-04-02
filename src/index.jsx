import React from "react";
import ReactDOM from "react-dom";

import {Match} from "./match";

class App extends React.Component {
    render(){
        return <Match />
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));