import React, { Component } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import { Column, Row, Text } from '../../atoms';
import { FlexCard } from '../../components';
import { StyledLink, StyledNav, SettingsContainer } from './styles';
import ThemeSettings from './ThemeSettings';
import AccountSettings from './AccountSettings';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: null
        }
    }

    render() {
        return (
            <Column minHeight="100%">
                <h1>Settings</h1>
                <Row mt="1rem">
                    <StyledNav>
                        <StyledLink as={NavLink} to="/app/settings/profile">
                            Profile
                        </StyledLink>
                        <StyledLink as={NavLink} to="/app/settings/delete">
                            Account
                        </StyledLink>
                        <StyledLink as={NavLink} to="/app/settings/company">
                            Company
                        </StyledLink>
                        <StyledLink as={NavLink} to="/app/settings/theme">
                            Theme
                        </StyledLink>
                        {/* <StyledLink as={NavLink} to="/app/settings/templates">
                            Message Templates (Admin)
                        </StyledLink>
                        <StyledLink as={NavLink} to="/app/settings/blocked">
                            Blocked IPs (Admin)
                        </StyledLink>
                        <StyledLink as={NavLink} to="/app/settings/notifications">
                            Notifications
                        </StyledLink> */}
                        <StyledLink as={NavLink} to="/app/settings/security">
                            Security
                        </StyledLink>

                    </StyledNav>

                    <SettingsContainer>
                        <Switch>
                            <Route
                                exact
                                path={`/app/settings/theme`}
                                component={ThemeSettings}
                            />
                            <Route
                                exact
                                path={`/app/settings/delete`}
                                component={AccountSettings}
                            />
                            <Route path="*">
                                <Column minHeight="100%">
                                    <FlexCard>
                                        <Text.span fontSize="2.1rem" fontWeight="medium">404</Text.span>
                                        <Text.span fontSize="1.1rem">Settings Not Found</Text.span>
                                    </FlexCard>
                                </Column>
                            </Route>
                        </Switch>

                    </SettingsContainer>
                </Row>
            </Column>
        );
    }
}

export default Settings;