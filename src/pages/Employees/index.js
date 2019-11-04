import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { store } from 'react-notifications-component';
import { firestore, auth } from '../../config/clientSdk';
import { Flex, Button, Text, IconContainer, Column, TextField } from '../../atoms';
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
            inviteModal: false,
            revokeModal: false,
            sendingEmail: false,
            employeeEmailToRevoke: null,
            employeeIdToRevoke: null,
            revokingEmployee: false
        }
    }

    componentDidMount() {
        // /companies/{companyId} 🏛 /employees/{employeeId} 👨‍💼 
        const { companyId } = this.props.user;

        this.employeesListener =
            firestore.collection(`companies/${companyId}/employees`).where('role', "==", "employee")
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

    openModal = (modalName, employeeEmailToRevoke, employeeIdToRevoke) => {
        this.setState({
            [modalName]: true,
            employeeEmailToRevoke,
            employeeIdToRevoke,
        });
    }

    closeModal = (modalName) => {
        this.setState({ [modalName]: false });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    revokeEmployeeAccount = async () => {
        const { employeeIdToRevoke, employeeEmailToRevoke, revokingEmployee } = this.state;

        if (!revokingEmployee) {
            this.setState({
                revokingEmployee: true
            }, async () => {
                const freshIdToken = await auth.currentUser.getIdToken();
                try {
                    const res = await axiosInstance({
                        method: 'post',
                        url: '/api/revokeEmployee',
                        data: {
                            employeeId: employeeIdToRevoke,
                        },
                        headers: {
                            Authorization: `Bearer ${freshIdToken}`
                        }
                    })
                    store.addNotification({
                        title: "Account Revoked!",
                        message: employeeEmailToRevoke,
                        type: "default",
                        insert: "bottom",
                        container: "bottom-right",
                        dismiss: {
                            duration: 2000,
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
                        employeeEmailToRevoke: null,
                        employeeIdToRevoke: null,
                        revokingEmployee: false,
                        revokeModal: false
                    });

                } catch (err) {
                    console.error(err);
                    // TODO: Generate an error notification using err.response.data.error
                    this.setState({
                        revokingEmployee: false,
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
            })
        }
    }

    sendInvite = (e) => {
        e.preventDefault();
        const { sendingEmail, email } = this.state;
        // const { idToken } = this.props.user; // This token might have expired
        // console.log("idToken : ", idToken);
        if (!sendingEmail) {
            this.setState({
                sendingEmail: true
            }, async () => {
                // TODO: Check for this:
                const freshIdToken = await auth.currentUser.getIdToken();
                // console.log("freshIdToken : ", freshIdToken);
                try {
                    const res = await axiosInstance({
                        method: 'post',
                        url: '/api/inviteEmployee',
                        data: {
                            email,
                        },
                        headers: {
                            Authorization: `Bearer ${freshIdToken}`
                        }
                    })
                    store.addNotification({
                        title: "Invitation Sent!",
                        message: email,
                        type: "default",
                        insert: "bottom",
                        container: "bottom-right",
                        dismiss: {
                            duration: 2000,
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
                        sendingEmail: false,
                        email: '',
                        inviteModal: false
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

        if (employees && employees.length > 0) {
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
                        <StyledIconContainer onClick={() => this.openModal('revokeModal', employee.email, employee.id)}>
                            {/* <StyledIconContainer onClick={() => this.revokeEmployeeAccount(employee.id)}> */}
                            <FontAwesomeIcon
                                icon="user-times"
                            />
                        </StyledIconContainer>
                    </Flex.verticallyCenter>
                </StyledRow>
            ))
        } else {
            return (
                <StyledFlexCard
                    m="1rem 0"
                    boxShadow={employees && employees.length === 0 ? 'normal' : null}
                    onClick={() => this.openModal('inviteModal')}
                >
                    {employees && employees.length === 0 ? (
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
        const {
            email,
            inviteModal,
            sendingEmail,
            revokeModal,
            employeeEmailToRevoke,
            revokingEmployee
        } = this.state;

        return (
            <Column minHeight="100%">
                <Flex.spaceBetween>
                    <h1>
                        Employees
                    </h1>
                    <Button onClick={() => this.openModal('inviteModal')}>
                        <Flex.verticallyCenter>
                            <IconContainer mr="0.5rem" ml="-0.5rem">
                                <FontAwesomeIcon
                                    icon="user-plus"
                                />
                            </IconContainer>
                            <Text>
                                Invite
                            </Text>
                        </Flex.verticallyCenter>
                    </Button>
                </Flex.spaceBetween>

                <this.renderEmployees />

                <Modal
                    closeModal={() => this.closeModal('inviteModal')}
                    modalIsOpen={inviteModal}
                    icon="user-plus"
                    modalTitle="Invite Employee"
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
                                        <Flex.verticallyCenter>
                                            <IconContainer mr="0.5rem" ml="-0.7rem">
                                                <FontAwesomeIcon
                                                    icon="paper-plane"
                                                />
                                            </IconContainer>
                                            <Text>Send</Text>
                                        </Flex.verticallyCenter>
                                    )}
                            </Button>
                        </Flex>
                    </form>
                </Modal>

                <Modal
                    closeModal={() => this.closeModal('revokeModal')}
                    modalIsOpen={revokeModal}
                    icon="user-times"
                    modalTitle="Revoke Employee Account"
                >
                    <Text mb="1rem">Are you sure you want to revoke <Text.bold>{employeeEmailToRevoke}</Text.bold> ?</Text>
                    <Flex mt="1rem" justifyContent="flex-end">
                        <Button mr="1rem" onClick={() => this.closeModal('revokeModal')}>
                            <Flex.verticallyCenter>
                                <Text>No</Text>
                            </Flex.verticallyCenter>
                        </Button>
                        <Button width="173px" onClick={this.revokeEmployeeAccount}>
                            {revokingEmployee ? (
                                <Loader sizes={['0.6rem', '0.7rem', '0.6rem']} bg="white" />
                            )
                                : (
                                    <Flex.verticallyCenter>
                                        <Text>Yes, Revoke</Text>
                                    </Flex.verticallyCenter>
                                )}
                        </Button>
                    </Flex>

                </Modal>
            </Column>
        );
    }
}

export default Employees;