import React, { useState, useRef, useEffect, useContext } from 'react';
import { TwitterPicker } from 'react-color'
import { ThemeContext } from '../../context/ThemeContext';
import { Swatch, Color } from './styles';

const ColorPicker = ({ colorField }) => {
    const swatchRef = useRef();
    const [showColorPicker, setShowColorPicker] = useState(false);
    const { contextTheme, setContextThemeAndUpdateTheme } = useContext(ThemeContext);

    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleClick);
        // return function to be called when unmounted
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, []);

    const toggleColorPicker = () => {
        setShowColorPicker(!showColorPicker)
    }

    const handleClick = e => {
        if (!swatchRef.current.contains(e.target)) {
            setShowColorPicker(false);
        }
    };

    const handleChangeComplete = (pickedColor) => {
        setContextThemeAndUpdateTheme(colorField, pickedColor.hex);
        // setContextThemeAndUpdateTheme({
        //     ...contextTheme,
        //     colors: {
        //         ...(contextTheme && contextTheme.colors),
        //         [colorField]: pickedColor.hex
        //     }
        // });
    };

    return (
        <Swatch ref={swatchRef}>
            <Color onClick={toggleColorPicker} color={colorField} />
            {showColorPicker &&
                <TwitterPicker
                    onChangeComplete={handleChangeComplete}
                />
            }
        </Swatch>
    );
}


export default ColorPicker;