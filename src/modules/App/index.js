import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dashboard, Employees, Sessions, Session } from "../../pages";
import Sidenav from "../Sidenav";
import { Flex, Box, Text, Button, Container, IconContainer, Column } from "../../atoms";
import { FlexCard } from "../../components";
import { Modal } from '../../modules';
import { SettingsIconContainer } from './styles';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        }
    }

    RouteWithUserAsProps = ({ component: Component, ...rest }) => {
        const { user } = this.props;
        return (
            <Route
                {...rest}
                render={props =>
                    <Component {...props} user={user} />
                }
            />
        );
    };

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    render() {
        const { user } = this.props;
        const { modalIsOpen } = this.state;

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

                                <Button.secondary onClick={this.openModal}>
                                    <Flex.verticallyCenter>
                                        <IconContainer mr="0.5rem" ml="-0.5rem">
                                            <FontAwesomeIcon
                                                icon="code"
                                            />
                                        </IconContainer>
                                        <Text>Get Script</Text>
                                  </Flex.verticallyCenter>
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
                            <this.RouteWithUserAsProps
                                exact
                                path={`/app/dashboard`}
                                component={Dashboard}
                            />
                            {
                                user.admin &&
                                <this.RouteWithUserAsProps
                                    exact
                                    path={`/app/employees`}
                                    component={Employees}
                                />
                            }
                            <Redirect exact
                                from='/app/sessions'
                                to='/app/sessions/pending' />
                            <this.RouteWithUserAsProps
                                exact
                                path={`/app/sessions/:status(pending|active|inactive|completed)`}
                                component={Sessions}
                            />
                            <this.RouteWithUserAsProps
                                exact
                                path={`/app/sessions/:sessionId`}
                                component={Session}
                            />
                            <Route path="*">
                                <Column minHeight="100%">
                                    <FlexCard>
                                        <Text.span fontSize="2.1rem" fontWeight="medium">404</Text.span>
                                        <Text.span fontSize="1.1rem">Page Not Found</Text.span>
                                    </FlexCard>
                                </Column>
                            </Route>
                        </Switch>
                    </Box>
                </Flex>

                <Modal
                    closeModal={this.closeModal}
                    modalIsOpen={modalIsOpen}
                    icon="code"
                    modalTitle="Get Script"
                >
                    <Text mb="1rem">Add the following code to your website.</Text>
                    <code>
                        console.log('Hello World');
                    </code>

                    <Flex mt="1rem" justifyContent="flex-end">
                        <Button mr="1rem">
                            <Flex.verticallyCenter>
                                <IconContainer mr="0.5rem" ml="-0.7rem">
                                    <FontAwesomeIcon
                                        icon="link"
                                    />
                                </IconContainer>
                                <Text>Link</Text>
                            </Flex.verticallyCenter>
                        </Button>
                        <Button>
                            <Flex.verticallyCenter>
                                <IconContainer mr="0.5rem" ml="-0.7rem">
                                    <FontAwesomeIcon
                                        icon="download"
                                    />
                                </IconContainer>
                                <Text>Download</Text>
                            </Flex.verticallyCenter>
                        </Button>
                    </Flex>
                </Modal>

            </>
        );
    }
}

export default App;
