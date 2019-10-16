import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Dashboard, Employees } from "../pages";
import Sidenav from "./Sidenav";

const App = (props) => {
    console.log(props);
    return (
        <div className="app">
            <Sidenav/>
            <Route
                exact
                path={props.match.url}
                render={() => <Redirect to="/app/dashboard" />}
            />
            <Route
                exact
                path={`${props.match.url}/dashboard`}
                component={Dashboard}
            />
            <Route
                exact
                path={`${props.match.url}/employees`}
                component={Employees}
            />
        </div>
    );
}

export default App;
