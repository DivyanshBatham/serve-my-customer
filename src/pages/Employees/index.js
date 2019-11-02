import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestore } from '../../config/clientSdk';
import { Container, Box, Flex, Button, Text, IconContainer, Column } from '../../atoms';
import { StyledRow, StyledIconContainer, StyledFlexCard } from './styles';
import { Loader, FlexCard } from '../../components';

class Employees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: null
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
                    onClick={()=>alert("Invite Employee")}
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

                // {/* // <FlexCard m="1rem 0" > */ }
                // {/* //     <Loader sizes={['1rem', '1.1rem', '1rem']} /> */ }
                // {/* // </FlexCard> */ }
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
                    <Button onClick={()=>alert("Invite Employee")}>
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
            </Column>
        );
    }
}

export default Employees;