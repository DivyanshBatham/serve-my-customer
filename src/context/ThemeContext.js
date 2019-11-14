import React, { useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import { firestore } from '../config/clientSdk';
import { AuthContext } from './AuthContext';
import { fetchUserTheme, expandTheme } from '../helpers';
import themes from '../theme/index';

export const ThemeContext = React.createContext();

const DynamicThemeProvider = (props) => {
    let { user } = useContext(AuthContext);

    const defaultThemeName = "classicBlue"; // Default Theme
    const [themeName, setThemeName] = useState(defaultThemeName);
    const [fetchingUserTheme, setFetchingUserTheme] = useState(true);
    const [contextTheme, setContextTheme] = useState({}); // When Saving, save this as doc to firestore (partial theme)
    const [userThemeBase, setUserThemeBase] = useState(null); // Whatever comes from firestore (partial theme)
    const [theme, setTheme] = useState(themes[defaultThemeName]); // For passing to Provider (full theme)
    const cachedTheme = localStorage.getItem('theme');


    useEffect(() => {
        console.log("Checking for cachedTheme...");
        let cachedTheme = JSON.parse(localStorage.getItem('theme'));
        let cachedThemeBase = JSON.parse(localStorage.getItem('themeBase'));
        if (cachedTheme && cachedThemeBase) {
            try {
                console.log("Found cachedTheme - Setting");
                setTheme(expandTheme(themes[cachedThemeBase], cachedTheme));
            } catch (err) {
                console.log("Failed parsing cached theme, so not expanding");
            }
        }
    }, [cachedTheme]);

    useEffect(() => {
        console.log("useEffect( [user] )");
        if (user) {
            console.log("Fetching userTheme...");
            fetchUserTheme(user.companyId).then(({ userTheme, userThemeBase }) => {

                if (userThemeBase && userTheme) {
                    localStorage.setItem('theme', JSON.stringify(userTheme));
                    localStorage.setItem('themeBase', JSON.stringify(userThemeBase));
                    console.log("Found userTheme - Setting");

                    if (Object.entries(userTheme).length === 0 && userTheme.constructor === Object)
                        setThemeName(userThemeBase);
                    else
                        setThemeName('customTheme');

                    setUserThemeBase(userThemeBase);
                    setTheme(expandTheme(themes[userThemeBase], userTheme));
                } else {
                    setTheme(themes[defaultThemeName]);
                    localStorage.removeItem('theme');
                    localStorage.removeItem('themeBase');
                }
                setFetchingUserTheme(false);
            })
        }
    }, [user]);

    const setContextThemeAndUpdateTheme = (t) => {
        setThemeName('customTheme');
        setContextTheme(t);
        setTheme(expandTheme(theme, t));
    }

    const saveTheme = async () => {
        if (user) {
            firestore.doc(`companies/${user.companyId}`).update({
                userTheme: contextTheme,
                userThemeBase: userThemeBase || defaultThemeName
            }).then(() => {
                localStorage.setItem('theme', JSON.stringify(contextTheme));
                localStorage.setItem('themeBase', JSON.stringify(userThemeBase || defaultThemeName));
            })
        }
    }

    return (
        <ThemeContext.Provider value={{
            contextTheme,
            themeName,
            fetchingUserTheme,
            setContextThemeAndUpdateTheme,
            saveTheme
        }}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default DynamicThemeProvider;
