import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Login, Register, Home, VerifyEmail, Invite } from './pages';
import { App } from './modules';
import { FullPageLoader } from './components';
import { AuthContext } from './context/AuthContext';
import { ThemeContext } from './context/ThemeContext';

const Routes = () => {
  const { fetchingAuthState, user } = useContext(AuthContext);
  const { fetchingUserTheme } = useContext(ThemeContext);

  const PrivateRoute = ({ component: Component, ...rest }) => {
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

  const AuthRoute = ({ component: Component, ...rest }) => {
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

  return (
    fetchingAuthState || fetchingUserTheme ?
      <FullPageLoader />
      :
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <Redirect exact
            from='/'
            to='/login' />
          <AuthRoute path="/login" component={Login} />
          <AuthRoute path="/register" component={Register} />
          <AuthRoute path="/invite/:token" component={Invite} />
          <PrivateRoute path="/app" component={App} />
        </Switch>
      </BrowserRouter>
  );
}

export default Routes;
