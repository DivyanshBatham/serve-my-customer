import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import firebase from './config/init-firebase';
import { auth } from './config/clientSdk';
import { Login, Register, Home } from './pages';
import { App } from './modules';
import './App.scss';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      fetchingAuthState: true,
    }
  }

  componentDidMount() {
    console.log("Component Mounted")
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.warn("User is signed in.")
        console.log(user);
        this.setState({
          fetchingAuthState: false,
          user: {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            photoURL: user.photoURL,
            isAnonymous: user.isAnonymous,
            uid: user.uid,
            providerData: user.providerData,
          }
        });
      } else {
        console.warn("User is signed out.")
        this.setState({
          fetchingAuthState: false,
        })
      }
    });
  }

  PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = this.state;
    return (
      <Route
        {...rest}
        render={props =>
          user ? (
            <Component {...props} user={user} />
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
    const { user } = this.state;
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
    const { fetchingAuthState } = this.state;
    return (
      <div className="App">
        {fetchingAuthState ? (
          <h1>Loading</h1>
        ) : (
            <BrowserRouter basename={process.env.PUBLIC_URL}>
              <Switch>
                <Route exact path="/" component={Home} />
                <this.AuthRoute path="/login" component={Login} />
                <this.AuthRoute path="/register" component={Register} />
                <this.PrivateRoute path="/app" component={App} />
              </Switch>
            </BrowserRouter>
          )}
      </div>
    );
  }
}

export default Routes;
