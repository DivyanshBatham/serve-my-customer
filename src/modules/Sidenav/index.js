import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { auth } from '../../config/clientSdk';
import { Box } from '../../atoms';
import { StyledLink, StyledIconContainer, StyledNav } from './styles';

const Logout = () => {
    auth.signOut();
}

const Sidenav = (props) => {
    const { user } = props;
    return (
        <StyledNav>
            <Box m="0 auto">
                <StyledLink as={NavLink} to="/app/dashboard">
                    <StyledIconContainer>
                        <FontAwesomeIcon
                            icon="columns"
                        />
                    </StyledIconContainer>
                    Dashboard
                </StyledLink>
            </Box>

            {
                user.admin &&
                <Box m="0 auto">
                    <StyledLink as={NavLink} to="/app/employees">
                        <StyledIconContainer>
                            <FontAwesomeIcon
                                icon="users"
                            />
                        </StyledIconContainer>
                        Employees
                </StyledLink>
                </Box>
            }

            <Box m="0 auto">
                <StyledLink as={NavLink} to="/app/sessions">
                    <StyledIconContainer>
                        <FontAwesomeIcon
                            icon="comments"
                        />
                    </StyledIconContainer>
                    Sessions
                </StyledLink>
            </Box>

            <Box m="0 auto">
                <StyledLink onClick={Logout}>
                    <StyledIconContainer>
                        <FontAwesomeIcon
                            icon="sign-out-alt"
                        />
                    </StyledIconContainer>
                    Logout
                </StyledLink>
            </Box>
        </StyledNav>
    );
}

export default Sidenav;