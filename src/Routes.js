import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Register, Home, VerifyEmail } from './pages';
import { App } from './modules';
import { AuthContext } from './context/AuthContext';

class Routes extends Component {
  static contextType = AuthContext;

  PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = this.context;
    return (
      <Route
        {...rest}
        render={props =>
          user ? (
            user.emailVerified ?
              <Component {...props} user={user}/> :
              <VerifyEmail {...props} user={user} />
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

  AuthRoute = ({ component: Component, ...rest }) => {
    const { user } = this.context;
    return (
      <Route
        {...rest}
        render={props => {
          let { from } = props.location.state || { from: { pathname: "/app/dashboard" } };
          return user ? <Redirect to={from} /> : <Component {...props} />;
        }
        }
      />
    );
  };

  render() {
    return (
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/" component={Home} />
          <this.AuthRoute path="/login" component={Login} />
          <this.AuthRoute path="/register" component={Register} />
          <this.PrivateRoute path="/app" component={App} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Routes;
