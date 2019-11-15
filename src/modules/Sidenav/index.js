import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '../../atoms';
import { StyledLink, StyledIconContainer, StyledNav } from './styles';

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
                <StyledLink as={NavLink} to="/app/settings">
                    <StyledIconContainer>
                        <FontAwesomeIcon
                            icon="cog"
                        />
                    </StyledIconContainer>
                    Settings
                </StyledLink>
            </Box>
        </StyledNav>
    );
}

export default Sidenav;