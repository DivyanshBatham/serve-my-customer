import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Register } from './pages';
import { App } from './modules';
import './App.scss';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  PrivateRoute = ({ component: Component, ...rest }) => {
    return (
      <Route
        {...rest}
        render={props =>
          // authCheck ? (
          true ? (
            <Component {...props} />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: props.location }
                }}
              />
            )
        }
      />
    );
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <this.PrivateRoute path="/app" component={App} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default Routes;
