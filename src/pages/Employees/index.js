import React from 'react';
import { Container, Flex, Button, Text, IconContainer } from '../../atoms';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledRow, StyledIconContainer } from './styles';

const Employees = () => {
    return (
        <Container pt="1rem" pr="2rem">
            <Flex.spaceBetween>
                <h1>
                    Employees
                </h1>
                <Button>
                    <Flex>
                        <IconContainer size="1rem" mr="0.5rem" ml="-0.5rem">
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
            <StyledRow m="1rem 0">
                <Flex>
                    <Text mr="1rem">1.</Text>
                    <Text mr="1rem">Divyansh Batham</Text>
                    <Text.italics mr="1rem">divyansh.b@codebrahma.com</Text.italics>
                </Flex>
                <StyledIconContainer>
                    <FontAwesomeIcon
                        icon="user-times"
                    />
                </StyledIconContainer>
            </StyledRow>
            <StyledRow m="1rem 0">
                <Flex>
                    <Text mr="1rem">1.</Text>
                    <Text mr="1rem">Divyansh Batham</Text>
                    <Text.italics mr="1rem">divyansh.b@codebrahma.com</Text.italics>
                </Flex>
                <StyledIconContainer>
                    <FontAwesomeIcon
                        icon="user-times"
                    />
                </StyledIconContainer>
            </StyledRow>
        </Container>
    );
}

export default Employees;