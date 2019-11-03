import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestore } from '../../config/clientSdk';
import { Box, Flex, Button, Text, IconContainer, Column, TextField } from '../../atoms';
import { StyledRow, StyledIconContainer, StyledFlexCard } from './styles';
import { Loader } from '../../components';
import { Modal } from '../../modules';
import axiosInstance from '../../services/axiosInstance';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            employees: null,
            modalIsOpen: false,
            sendingEmail: false,
        }
    }

    componentDidMount() {
        // /companies/{companyId} 🏛 /employees/{employeeId} 👨‍💼 
        const { companyId } = this.props.user;

        this.employeesListener =
            firestore.collection(`companies/${companyId}/employees`)
                .onSnapshot((employees) => {
                    this.setState({
                        employees: employees.docs.map(employee => ({
                            id: employee.id,
                            ...employee.data()
                        }))
                    })
                }, (err) => {
                    console.log(err);
                });
    }

    componentWillUnmount() {
        this.employeesListener();
    }

    openModal = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModal = () => {
        this.setState({ modalIsOpen: false });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    sendInvite = (e) => {
        e.preventDefault();
        const { sendingEmail, email } = this.state;
        const { idToken } = this.props.user;

        if (!sendingEmail) {
            this.setState({
                sendingEmail: true
            }, async () => {

                try {
                    const res = await axiosInstance({
                        method: 'post',
                        url: '/api/inviteEmployee',
                        data: {
                            email,
                        },
                        headers: {
                            Authorization: `Bearer ${idToken}`
                        }
                    })
                    // TODO: Generate a success notification using res.message
                    this.setState({
                        sendingEmail: false,
                    });
                } catch (err) {
                    console.error(err);
                    // TODO: Generate an error notification using err.response.data.error
                    this.setState({
                        sendingEmail: false,
                    });
                    if (err.isAxiosError) {
                        if (err.response) {
                            console.log(err.response.data.error);
                            // this.setState({
                            //     error: err.response.data.error.message
                            // })
                        }
                    }
                    else {
                        console.error(err.message, err.name);
                    }
                }
            });
        }
    }

    renderEmployees = () => {
        const { employees } = this.state;
        const { uid } = this.props.user;

        if (employees && employees.length > 1) {
            return employees.map((employee, index) => (
                <StyledRow m="1rem 0" key={employee.id}>
                    <Flex.verticallyCenter>
                        <Text mr="2rem">{index + 1}.</Text>
                        <Text mr="2rem">{employee.name}</Text>
                        <Text.italics mr="2rem">{employee.email}</Text.italics>
                    </Flex.verticallyCenter>
                    <Flex.verticallyCenter>
                        <Text mr="2rem">Role: {employee.role}</Text>
                    </Flex.verticallyCenter>
                    <Flex.verticallyCenter>
                        {
                            employee.id !== uid ? (
                                <StyledIconContainer onClick={() => alert("Remove Employee")}>
                                    <FontAwesomeIcon
                                        icon="user-times"
                                    />
                                </StyledIconContainer>
                            ) : (
                                    <Box size="1rem" borderRadius="100%" bg="primary" />
                                )
                        }
                    </Flex.verticallyCenter>
                </StyledRow>
            ))
        } else {
            return (
                <StyledFlexCard
                    m="1rem 0"
                    boxShadow={employees && employees.length === 1 ? 'normal' : null}
                    onClick={this.openModal}
                >
                    {employees && employees.length === 1 ? (
                        <>
                            <IconContainer size="2rem" fontSize="2rem" mb="0.5rem">
                                <FontAwesomeIcon
                                    icon="user-plus"
                                />
                            </IconContainer>
                            <Text.span fontSize="1.1rem">Invite your first employee</Text.span>
                            <Text.span fontSize="0.9rem" mt="1rem">Note: You can serve the customers yourself too.</Text.span>
                        </>
                    ) : (
                            <Loader sizes={['1rem', '1.1rem', '1rem']} />
                        )
                    }
                </StyledFlexCard>
            );
        }
    }

    render() {
        const { email, modalIsOpen, sendingEmail } = this.state;

        return (
            <Column minHeight="100%">
                <Flex.spaceBetween>
                    <h1>
                        Employees
                    </h1>
                    <Button onClick={this.openModal}>
                        <Flex>
                            <IconContainer mr="0.5rem" ml="-0.5rem">
                                <FontAwesomeIcon
                                    icon="user-plus"
                                />
                            </IconContainer>
                            <Text>
                                Invite
                        </Text>
                        </Flex>
                    </Button>
                </Flex.spaceBetween>

                <this.renderEmployees />

                <Modal
                    closeModal={this.closeModal}
                    modalIsOpen={modalIsOpen}
                >
                    <Text mb="1rem">We will email the registration link to your employee.</Text>
                    <form onSubmit={this.sendInvite}>
                        <TextField
                            width="100%"
                            type="text"
                            name="email"
                            aria-label="Employee's Email"
                            placeholder="Employee's Email"
                            autoComplete="off"
                            value={email}
                            onChange={this.handleChange}
                            mb="1rem"
                        />
                        <br />

                        <Flex justifyContent="flex-end">
                            <Button width="142px">
                                {sendingEmail ? (
                                    <Loader sizes={['0.6rem', '0.7rem', '0.6rem']} bg="white" />
                                )
                                    : (
                                        <Flex>
                                            <IconContainer mr="0.5rem" ml="-0.7rem">
                                                <FontAwesomeIcon
                                                    icon="paper-plane"
                                                />
                                            </IconContainer>
                                            <Text>Send</Text>
                                        </Flex>
                                    )}
                            </Button>
                        </Flex>
                    </form>
                </Modal>
            </Column>
        );
    }
}

export default Employees;