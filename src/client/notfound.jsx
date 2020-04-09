import {Link} from "react-router-dom";
import React from "react";

export const NotFound = () => {
    return (
        <div>
            <h2>404 - NOT FOUND</h2>
            <p>Oops, the page you requested is not available!</p>
            <Link to={{pathname: "/",}}>
                <button>Go back to homepage</button>
            </Link>
        </div>
    )
}