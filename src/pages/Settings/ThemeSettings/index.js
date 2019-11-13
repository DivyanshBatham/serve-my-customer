import React from 'react';
import { Flex, Text } from '../../../atoms';
import { ThemeCardContainer, ThemeCard } from './styles';
import { ColorPicker } from '../../../modules';

const ThemeSettings = () => {
    return (
        <>
            <h2>Theme Settings</h2>
            {/* <h3>Templates</h3> */}
            <Text>Pick one of our pre-built theme or create your own from scratch.</Text>

            <ThemeCardContainer>
                <ThemeCard>
                    Classic Blue
                </ThemeCard>
                <ThemeCard>
                    Classic Blue
                </ThemeCard>
                <ThemeCard>
                    Classic Blue
                </ThemeCard>
                <ThemeCard>
                    Classic Blue
                </ThemeCard>
                <ThemeCard>
                    Classic Blue
                </ThemeCard>
                <ThemeCard>
                    Custom
                </ThemeCard>
            </ThemeCardContainer>

            {/* <h3>Customize</h3> */}
            <h3>Create Your Own:</h3>

            <ThemeCardContainer>
                
                <Flex.verticallyCenter>
                    <ColorPicker colorField="primary" />
                    <Text ml="1rem">Primary</Text>
                </Flex.verticallyCenter>

                <Flex.verticallyCenter>
                    <ColorPicker colorField="primaryDark" />
                    <Text ml="1rem">Primary Dark</Text>
                </Flex.verticallyCenter>

            </ThemeCardContainer>

        </>
    );
}

export default ThemeSettings;