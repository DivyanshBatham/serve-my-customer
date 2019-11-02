import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestore } from '../../config/clientSdk';
import { Box, Flex, Button, Text, IconContainer, Column, TextField } from '../../atoms';
import { StyledRow, StyledIconContainer, StyledFlexCard } from './styles';
import { Loader } from '../../components';
import { Modal } from '../../modules';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: null,
            modalIsOpen: false
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

    sendInvite = (e) => {
        e.preventDefault();
        alert("Invite Send");
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
                    modalIsOpen={this.state.modalIsOpen}
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
                            // value={email}
                            // onChange={this.handleChange}
                            mb="1rem"
                        />
                        <br />

                        <Flex justifyContent="flex-end">
                            <Button>
                                <Flex>
                                    <IconContainer mr="0.5rem" ml="-0.7rem">
                                        <FontAwesomeIcon
                                            icon="paper-plane"
                                        />
                                    </IconContainer>
                                    <Text>
                                        Send
                                    </Text>
                                </Flex>
                            </Button>
                        </Flex>
                    </form>
                </Modal>
            </Column>
        );
    }
}

export default Employees;