import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import firebase from './config/init-firebase';
import { auth } from './config/clientSdk';
import { Login, Register, Home, VerifyEmail } from './pages';
import { App } from './modules';
import { FullPageLoader } from './components';
// import './App.scss';

class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      fetchingAuthState: true,
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await auth.currentUser.getIdToken(/* forceRefresh */ true);
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
            idToken
          }
        });
      } else {
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
            user.emailVerified ?
              <Component {...props} user={user} /> :
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
          <FullPageLoader/>
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
