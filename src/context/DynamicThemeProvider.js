import React, { useContext } from 'react';
import { ThemeProvider } from 'styled-components'
import { AuthContext } from './AuthContext';
import theme from '../theme';

const DynamicThemeProvider = (props) => {
    let { userTheme } = useContext(AuthContext);

    function expandTheme(curTheme, newTheme) {
        let combinedTheme = { ...curTheme };
        for (var key in newTheme) {
            if (newTheme.hasOwnProperty(key)) {
                combinedTheme[key] = {
                    ...curTheme[key],
                    ...newTheme[key]
                }
            }
        }
        return combinedTheme;
    }

    function getTheme() {
        let cachedTheme = localStorage.getItem('theme');
        if (userTheme) {
            // Caching userTheme for next time:
            localStorage.setItem('theme', JSON.stringify(userTheme));
            return expandTheme(theme, userTheme);
        }
        if (cachedTheme) {
            try {
                return expandTheme(theme, JSON.parse(cachedTheme));
            } catch (err) {
                console.log("Failed parsing cached theme, so not expanding");
                return theme;
            }
        }
        return theme;

    }

    return (
        <ThemeProvider theme={getTheme}>
            {props.children}
        </ThemeProvider>
    );
}

export default DynamicThemeProvider;
