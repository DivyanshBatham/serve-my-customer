import React from "react";
import { Route, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dashboard, Employees } from "../pages";
import Sidenav from "./Sidenav";
import { Flex, Box, Text, Button, Container, IconContainer } from "../atoms";

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
                        <Button.secondary>
                            <Flex>
                                <IconContainer size="1rem" mr="0.5rem" ml="-0.5rem">
                                    <FontAwesomeIcon
                                        icon="code"
                                    />
                                </IconContainer>
                                Get Script
                            </Flex>
                        </Button.secondary>
                    </Flex.verticallyCenter>

                    {/* <Button>
                    <Flex>
                        <IconContainer size="1rem" mr="0.4rem">
                            <FontAwesomeIcon
                                icon="user-plus"
                            />
                        </IconContainer>
                        <Text>
                            Invite
                        </Text>
                    </Flex>
                </Button> */}
                </Container>
            </Box>
            <Flex>
                <Sidenav />
                <Box flex="1" pt="1.5rem" mr="2.5rem">
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
                </Box>
            </Flex>
        </>
    );
}

export default App;
