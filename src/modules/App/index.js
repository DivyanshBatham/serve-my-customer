import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dashboard, Employees, Sessions, Session } from "../../pages";
import Sidenav from "../Sidenav";
import { Flex, Box, Text, Button, Container, IconContainer } from "../../atoms";
import { SettingsIconContainer } from './styles';

const App = (props) => {
    const { user } = props;

    const RouteWithUserAsProps = ({ component: Component, ...rest }) => {
        return (
            <Route
                {...rest}
                render={props =>
                    <Component {...props} user={user} />
                }
            />
        );
    };

    return (
        <>
            <Box bg="primary">
                <Container>
                    <Flex.verticallyCenter justifyContent="space-between" height="20vh">
                        <Text
                            color="white"
                            fontSize="2rem"
                            fontWeight="medium"
                            fontFamily="pacifico"
                            as="h1"
                        >
                            Serve My Customer
                        </Text>
                        <Flex.center>

                            <Button.secondary>
                                <Flex>
                                    <IconContainer mr="0.5rem" ml="-0.5rem">
                                        <FontAwesomeIcon
                                            icon="code"
                                        />
                                    </IconContainer>
                                    Get Script
                            </Flex>
                            </Button.secondary>
                            <SettingsIconContainer ml="2rem">
                                <FontAwesomeIcon
                                    icon="cog"
                                />
                            </SettingsIconContainer>
                        </Flex.center>
                    </Flex.verticallyCenter>
                </Container>
            </Box>
            <Flex flex="1">
                <Sidenav user={user} />
                <Box flex="1" m="1.5rem 2.5rem 1.5rem 0">
                    <Switch>
                        <Redirect exact
                            from='/app'
                            to='/app/dashboard' />
                        <RouteWithUserAsProps
                            exact
                            path={`/app/dashboard`}
                            component={Dashboard}
                        />
                        {
                            user.admin &&
                            <RouteWithUserAsProps
                                exact
                                path={`/app/employees`}
                                component={Employees}
                            />
                        }
                        <Redirect exact
                            from='/app/sessions'
                            to='/app/sessions/pending' />
                        <RouteWithUserAsProps
                            exact
                            path={`/app/sessions/:status(pending|active|inactive|completed)`}
                            component={Sessions}
                        />
                        <RouteWithUserAsProps
                            exact
                            path={`/app/sessions/:sessionId`}
                            component={Session}
                        />
                        {/* TODO: Add a 404 Page */}
                    </Switch>
                </Box>
            </Flex>
        </>
    );
}

export default App;
