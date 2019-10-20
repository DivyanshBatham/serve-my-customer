import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Dashboard, Employees } from "../pages";
import Sidenav from "./Sidenav";
import { Flex, Box, Text } from "../atoms";

const App = (props) => {
    console.log(props);
    return (
        <>
            <Box bg="primary" height="20vh">
                <Text color="white" fontSize="1.5rem" fontWeight="medium">Serve My Customer </Text>
            </Box>
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
