import React, { useContext } from 'react';
import { Flex, Text, Button } from '../../../atoms';
import { ThemeCardContainer, ThemeCard } from './styles';
import { ColorPicker } from '../../../modules';
import { ThemeContext } from '../../../context/ThemeContext';

const ThemeSettings = () => {
    const { themeName, saveTheme } = useContext(ThemeContext);
    // console.warn("THEME NAME: ", themeName);
    return (
        <>
            <h2>Theme Settings</h2>
            {/* <h3>Templates</h3> */}
            <Text>Pick one of our pre-built theme or create your own from scratch.</Text>

            <ThemeCardContainer>
                <ThemeCard className={themeName === 'classicBlue' ? "active" : null}>
                    Classic Blue
                </ThemeCard>

                <ThemeCard className={themeName === 'ninjaRed' ? "active" : null}>
                    Ninja Red
                </ThemeCard>

                <ThemeCard className={themeName === 'blackWhite' ? "active" : null}>
                    Black & White
                </ThemeCard>

                <ThemeCard className={themeName === 'customTheme' ? "active" : null}>
                    Custom
                </ThemeCard>
            </ThemeCardContainer>

            {/* <h3>Customize</h3> */}
            <h3>Create Your Own:</h3>

            <Button onClick={saveTheme}>Save</Button>

            <ThemeCardContainer>

                <Flex.verticallyCenter>
                    <ColorPicker colorField="primary" />
                    <Text ml="1rem">Primary</Text>
                </Flex.verticallyCenter>
                <Flex.verticallyCenter>
                    <ColorPicker colorField="primaryDark" />
                    <Text ml="1rem">Primary Dark</Text>
                </Flex.verticallyCenter>

                <div />

                <Flex.verticallyCenter>
                    <ColorPicker colorField="primaryBackground" />
                    <Text ml="1rem">Primary Background</Text>
                </Flex.verticallyCenter>

                <Flex.verticallyCenter>
                    <ColorPicker colorField="secondaryBackground" />
                    <Text ml="1rem">Secondary Background</Text>
                </Flex.verticallyCenter>

                <Flex.verticallyCenter>
                    <ColorPicker colorField="tertiaryBackground" />
                    <Text ml="1rem">Tertiary Background</Text>
                </Flex.verticallyCenter>

                <Flex.verticallyCenter>
                    <ColorPicker colorField="primaryText" />
                    <Text ml="1rem">Primary Text</Text>
                </Flex.verticallyCenter>

                <Flex.verticallyCenter>
                    <ColorPicker colorField="secondaryText" />
                    <Text ml="1rem">Secondary Text</Text>
                </Flex.verticallyCenter>

                <Flex.verticallyCenter>
                    <ColorPicker colorField="tertiaryText" />
                    <Text ml="1rem">Tertiary Text</Text>
                </Flex.verticallyCenter>


            </ThemeCardContainer>

        </>
    );
}

export default ThemeSettings;