import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Dashboard, Employees } from "../pages";
import Sidenav from "./Sidenav";
import { Flex, Box, Text } from "../atoms";

const App = (props) => {
    console.log(props);
    return (
        <>
            <Flex.verticallyCenter bg="primary" height="20vh">
                <Text
                    color="white"
                    fontSize="2rem"
                    fontWeight="medium"
                    fontFamily="pacifico"
                    pl="2rem"
                    as="h1"
                >
                    Serve My Customer
                </Text>
            </Flex.verticallyCenter>
            <Flex>
                <Sidenav />
                <Box flex="1">
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
