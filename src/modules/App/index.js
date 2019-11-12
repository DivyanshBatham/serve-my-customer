import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '../../config/clientSdk';
import { store } from 'react-notifications-component';
import axiosInstance from '../../services/axiosInstance';
import { Dashboard, Employees, Sessions, Session } from "../../pages";
import Sidenav from "../Sidenav";
import { Flex, Box, Text, Button, Container, IconContainer, Column } from "../../atoms";
import { FlexCard } from "../../components";
import { Modal } from '../../modules';
import { SettingsIconContainer } from './styles';
import { ThemeContext } from '../../context/ThemeContext';

class App extends Component {
    static contextType = ThemeContext;
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

    downloadScript = async () => {
        try {
            store.addNotification({
                title: "Starting Download!",
                message: "in 3 seconds",
                type: "default",
                insert: "bottom",
                container: "bottom-right",
                dismiss: {
                    duration: 3000,
                    onScreen: true,
                    pauseOnHover: true
                },
                slidingExit: {
                    duration: 800,
                    timingFunction: 'ease-out',
                    delay: 0
                },
            });

            this.setState({
                modalIsOpen: false
            });

            const freshIdToken = await auth.currentUser.getIdToken();
            const res = await axiosInstance({
                method: 'get',
                url: '/api/script',
                headers: {
                    Authorization: `Bearer ${freshIdToken}`
                },
                responseType: 'blob'
            })

            var data = new Blob([res.data]);
            if (typeof window.navigator.msSaveBlob === 'function') {
                // If it is IE that support download blob directly.
                window.navigator.msSaveBlob(data, 'serve-my-customer.js');
            } else {
                var blob = data;
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = 'serve-my-customer.js';

                document.body.appendChild(link);

                link.click();
            }

        } catch (err) {
            console.error(err);
            // TODO: Generate an error notification using err.response.data.error
            // this.setState({
            //     revokingEmployee: false,
            // });
            // if (err.isAxiosError) {
            //     if (err.response) {
            //         console.log(err.response.data.error);
            //         // this.setState({
            //         //     error: err.response.data.error.message
            //         // })
            //     }
            // }
            // else {
            //     console.error(err.message, err.name);
            // }
        }
    }

    setTheme = () => {
        const { contextTheme, setContextTheme } = this.context;
        setContextTheme({
            colors: {
                primary: ['#ffb301','#f57c00','#e91e63','#8bc34a'][~~(Math.random()*4)]
            }
        })
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
                                <SettingsIconContainer ml="2rem" onClick={this.setTheme}>
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
                    <Flex mt="1rem" justifyContent="flex-end">
                        <Button onClick={this.downloadScript}>
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
