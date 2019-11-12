import React, { Component } from 'react';
import { Column, Flex, Row, Box } from '../../atoms';

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: null
        }
    }

    render() {
        console.log(this.props.user);
        return (
            <Column minHeight="100%">
                <h1>Settings</h1>
                <Row mt="1rem">
                    {/* <SettingsNav/> */}
                    <Box>
                        <Box backgroundColor="white" p="1rem">
                            Profile
                        </Box>
                        <Box backgroundColor="white" p="1rem" mt="1.5rem">
                            Company
                        </Box>
                        <Box backgroundColor="white" p="1rem" mt="1.5rem">
                            Theme
                        </Box>
                        <Box backgroundColor="white" p="1rem" mt="1.5rem">
                            Logout
                        </Box>
                    </Box>
                    <Box flex="1" backgroundColor="white" ml="2rem" p="1.5rem">
                        Settings
                    </Box>
                </Row>
                {/* <FlexCard mt="1rem">
                    Theme
                </FlexCard> */}
            </Column>
        );
    }
}

export default Settings;