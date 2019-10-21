import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dashboard, Employees, Sessions } from "../../pages";
import Sidenav from "../Sidenav";
import { Flex, Box, Text, Button, Container, IconContainer } from "../../atoms";
import { SettingsIconContainer } from './styles';

const App = (props) => {
    console.log(props);
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
            <Flex>
                <Sidenav />
                <Box flex="1" pt="1.5rem" mr="2.5rem">
                    <Switch>
                        <Redirect exact
                            from='/app'
                            to='/app/dashboard' />
                        <Route
                            exact
                            path={`/app/dashboard`}
                            component={Dashboard}
                        />
                        <Route
                            exact
                            path={`/app/employees`}
                            component={Employees}
                        />
                        <Redirect exact
                            from='/app/sessions'
                            to='/app/sessions/pending' />
                        <Route
                            exact
                            path={`/app/sessions/:status(pending|active|inactive|completed)`}
                            component={Sessions}
                        />
                        <Route
                            exact
                            path={`/app/sessions/:sessionId`}
                            component={Employees}
                        />
                        {/* TODO: Add a 404 Page */}
                    </Switch>
                </Box>
            </Flex>
        </>
    );
}

export default App;
