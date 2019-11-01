import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { firestore } from '../../config/clientSdk';
import { Container, Flex, Button, Text, IconContainer } from '../../atoms';
import { StyledRow, StyledIconContainer } from './styles';
import { Loader } from '../../components';

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

    render() {
        const { employees } = this.state;
        console.log(employees);
        return (
            <Container>
                <Flex.spaceBetween>
                    <h1>
                        Employees
                    </h1>
                    <Button>
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
                {
                    employees ? (
                        employees.map((employee, index) => (
                            <StyledRow m="1rem 0" key={employee.id}>
                                <Flex>
                                    <Text mr="2rem">{index + 1}.</Text>
                                    <Text mr="2rem">{employee.name}</Text>
                                    <Text.italics mr="2rem">{employee.email}</Text.italics>
                                </Flex>
                                <Flex>
                                    <Text mr="2rem">Role: {employee.role}</Text>
                                </Flex>
                                <StyledIconContainer>
                                    <FontAwesomeIcon
                                        icon="user-times"
                                    />
                                </StyledIconContainer>
                            </StyledRow>
                        ))
                    ) : (
                            <StyledRow justifyContent="center" m="1rem 0">
                                <Loader sizes={['0.8rem', '0.9rem', '0.8rem']} />
                            </StyledRow>
                        )
                }
            </Container>
        );
    }
}

export default Employees;