import React, { useContext } from 'react';
import { Flex, Text, Button } from '../../../atoms';
import { Loader } from '../../../components';
import { ThemeCardContainer, ThemeCard } from './styles';
import { Controls } from '../styles';
import { ColorPicker } from '../../../modules';
import { ThemeContext } from '../../../context/ThemeContext';

const ThemeSettings = () => {
    const { themeName, saveTheme, setPreBuiltTheme, userTheme, savingTheme } = useContext(ThemeContext);
    return (
        <>
            <h2>Theme Settings</h2>
            {/* <Text>Pick one of our pre-built theme or create your own custom theme.</Text> */}

            <ThemeCardContainer>
                <ThemeCard
                    onClick={() => setPreBuiltTheme('classicBlue')}
                    className={themeName === 'classicBlue' ? "active" : null}>
                    Classic Blue
                </ThemeCard>

                <ThemeCard
                    onClick={() => setPreBuiltTheme('ninjaRed')}
                    className={themeName === 'ninjaRed' ? "active" : null}>
                    Ninja Red
                </ThemeCard>

                <ThemeCard
                    onClick={() => setPreBuiltTheme('blackWhite')}
                    className={themeName === 'blackWhite' ? "active" : null}>
                    Black & White
                </ThemeCard>

                {
                    Object.entries(userTheme).length !== 0 &&
                    userTheme.constructor === Object && (
                        <ThemeCard
                            onClick={() => setPreBuiltTheme('userTheme')}
                            className={themeName === 'userTheme' ? "active" : null}
                        >
                            Your Theme
                        </ThemeCard>
                    )
                }

                {/* <ThemeCard
                    onClick={() => setPreBuiltTheme('customTheme')}
                    className={themeName === 'customTheme' ? "active" : null}>
                    New Theme
                </ThemeCard> */}
            </ThemeCardContainer>

            <h3>Customize Current Theme:</h3>
            <Text>Customize Current theme and save it as yours.</Text>


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


            <Controls>
                {/* <Button.tertiary onClick={() => alert('Reset')} mr="1rem">
                    Cancel
                </Button.tertiary> */}
                <Button width="123px" onClick={saveTheme}>
                    {savingTheme ?
                        (
                            <Loader sizes={['0.6rem', '0.7rem', '0.6rem']} bg="tertiaryText" />
                        ) : (
                            <Text>Save</Text>
                        )
                    }
                </Button>
            </Controls>

        </>
    );
}

export default ThemeSettings;