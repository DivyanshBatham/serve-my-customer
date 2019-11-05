import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import IconContainer from '../atoms/IconContainer';
import Text from '../atoms/Text';
import Flex from '../atoms/Flex';
import Button from '../atoms/Button';
import FloatingButton from './components/FloatingButton';
import FloatingContainer from './components/FloatingContainer';
import Header from './components/Header';
import Card from './components/Card';
import Form from './components/Form';
import TextField from './components/TextField';

class WidgetApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showContainer: true,
        }
    }

    toggleContainer = () => {
        this.setState(prevState => ({
            showContainer: !prevState.showContainer
        }));
    }

    render() {
        const { showContainer } = this.state;
        return (
            <>
                {
                    showContainer &&
                    <FloatingContainer>
                        <Header>
                            <Text
                                color="white"
                                fontSize="2rem"
                                fontWeight="medium"
                                fontFamily="pacifico"
                                as="h1"
                            >
                                Serve My Customer
                        </Text>
                        </Header>

                        <Card mt="-3.5rem" mb="1rem">
                            <Flex.verticallyCenter>
                                <Text fontSize="2rem" mr="1rem">
                                    👋
                                </Text>
                                <div>
                                    <Text fontWeight="bold">
                                        We'r online and ready to help
                                    </Text>
                                    <Text>The team typically replies in few minutes.</Text>
                                </div>
                            </Flex.verticallyCenter>
                        </Card>

                        <Card>
                            <Form>
                                <TextField placeholder="Name" />
                                <TextField placeholder="Email" />
                                <TextField placeholder="Subject" />
                            </Form>
                            <Flex justifyContent="flex-end">
                                <Button>
                                    <Flex.verticallyCenter>

                                        <IconContainer mr="0.5rem" ml="-0.5rem">
                                            <FontAwesomeIcon
                                                icon="paper-plane"
                                            />
                                        </IconContainer>
                                        <Text>
                                            Start Conversation
                                        </Text>
                                    </Flex.verticallyCenter>
                                </Button>
                            </Flex>
                        </Card>

                    </FloatingContainer>
                }
                <FloatingButton onClick={this.toggleContainer}>
                    <IconContainer>
                        <FontAwesomeIcon
                            icon="comments"
                        />
                    </IconContainer>
                </FloatingButton>


            </>
        );
    }
}

export default WidgetApp;
