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
    const [contextThemeBase, setContextThemeBase] = useState(null); // When Saving, save this as doc to firestore (partial theme)
    const [userThemeBase, setUserThemeBase] = useState(null); // Whatever comes from firestore (partial theme)
    const [userTheme, setUserTheme] = useState({}); // Whatever comes from firestore (partial theme)
    const [theme, setTheme] = useState(themes[defaultThemeName]); // For passing to Provider (full theme)


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
    }, []);

    useEffect(() => {
        console.log("useEffect( [user] )");
        if (user) {
            console.log("Fetching userTheme...");
            fetchUserTheme(user.companyId).then(({ currentTheme, userTheme, userThemeBase }) => {

                if (userTheme && userThemeBase) {
                    setUserTheme(userTheme);
                    setUserThemeBase(userThemeBase);
                }

                if (currentTheme) {
                    if (currentTheme === 'userTheme') {
                        console.log("Found userTheme - Setting");
                        setThemeName('userTheme');
                        setTheme(expandTheme(themes[userThemeBase], userTheme));
                        setContextTheme(userTheme);
                        setContextThemeBase(userThemeBase);
                        localStorage.setItem('theme', JSON.stringify(userTheme));
                        localStorage.setItem('themeBase', JSON.stringify(userThemeBase));
                    } else {
                        setThemeName(currentTheme);
                        setTheme(themes[currentTheme]);
                        setContextThemeBase(currentTheme);
                        localStorage.setItem('theme', JSON.stringify(currentTheme));
                        localStorage.setItem('themeBase', JSON.stringify({}));
                    }
                }

                setFetchingUserTheme(false);
            })
        }
    }, [user]);

    const setContextThemeAndUpdateTheme = (colorField, color) => {
        if (themeName !== 'customTheme') {
            if (themeName === 'userTheme') {
                setThemeName('customTheme');
                const newContextTheme = {
                    colors: {
                        ...(userTheme && userTheme.colors),
                        [colorField]: color
                    }
                };
                setContextTheme(newContextTheme);
                setContextThemeBase(userThemeBase);
                setTheme(expandTheme(themes[userThemeBase], newContextTheme));
            }
            else {
                setThemeName('customTheme');
                const newContextTheme = {
                    colors: {
                        [colorField]: color
                    }
                };
                setContextTheme(newContextTheme);
                setContextThemeBase(themeName);
                setTheme(expandTheme(themes[themeName], newContextTheme));
            }
        } else {
            const newContextTheme = {
                colors: {
                    ...(contextTheme && contextTheme.colors),
                    [colorField]: color
                }
            };
            setContextTheme(newContextTheme);
            setTheme(expandTheme(themes[contextThemeBase], newContextTheme));
        }
    }

    const saveTheme = async () => {
        if (user) {
            if (themeName === 'customTheme') {
                firestore.doc(`companies/${user.companyId}`).update({
                    currentTheme: 'userTheme',
                    userTheme: contextTheme,
                    userThemeBase: contextThemeBase,
                }).then(() => {
                    localStorage.setItem('theme', JSON.stringify(contextTheme));
                    localStorage.setItem('themeBase', JSON.stringify(contextThemeBase));
                    setUserTheme(contextTheme);
                    setUserThemeBase(contextThemeBase);
                    setThemeName('userTheme');
                })
            } else if (themeName === 'userTheme') {
                firestore.doc(`companies/${user.companyId}`).update({
                    currentTheme: 'userTheme',
                }).then(() => {
                    localStorage.setItem('theme', JSON.stringify(userTheme));
                    localStorage.setItem('themeBase', JSON.stringify(userThemeBase));
                })
            } else {
                firestore.doc(`companies/${user.companyId}`).update({
                    currentTheme: themeName
                }).then(() => {
                    localStorage.setItem('theme', JSON.stringify({}));
                    localStorage.setItem('themeBase', JSON.stringify(themeName));
                })
            }
            setContextTheme({});
        }
    }

    const setPreBuiltTheme = (tName) => {
        if (tName === 'userTheme') {
            setThemeName('userTheme');
            setContextTheme(userTheme);
            setContextThemeBase(userThemeBase);
            setTheme(expandTheme(themes[userThemeBase], userTheme));

        } else if (tName === 'customTheme') {
            setThemeName('customTheme');
            setTheme(expandTheme(themes[contextThemeBase], contextTheme));
        } else {
            setThemeName(tName);
            setContextTheme({});
            setContextThemeBase(tName);
            setTheme(themes[tName]);
        }
    }

    return (
        <ThemeContext.Provider value={{
            contextTheme,
            themeName,
            fetchingUserTheme,
            setContextThemeAndUpdateTheme,
            saveTheme,
            userTheme,
            setPreBuiltTheme
        }}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default DynamicThemeProvider;
