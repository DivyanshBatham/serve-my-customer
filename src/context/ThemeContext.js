import React, { useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import { firestore } from '../config/clientSdk';
import { AuthContext } from './AuthContext';
import { fetchUserTheme, expandTheme } from '../helpers';
import baseTheme from '../theme';

export const ThemeContext = React.createContext();

const DynamicThemeProvider = (props) => {
    let { user } = useContext(AuthContext);
    const [contextTheme, setContextTheme] = useState(null);
    const [userTheme, setUserTheme] = useState(null);
    const [theme, setTheme] = useState(baseTheme);
    const cachedTheme = localStorage.getItem('theme');


    useEffect(() => {
        console.log("If cache is present set theme");
        let cachedTheme = localStorage.getItem('theme');
        if (cachedTheme) {
            try {
                console.log("Expand with cachedTheme");
                setTheme(expandTheme(baseTheme, JSON.parse(cachedTheme)));
            } catch (err) {
                console.log("Failed parsing cached theme, so not expanding");
            }
        }
    }, [cachedTheme]);


    useEffect(() => {
        if (user) {
            fetchUserTheme(user.companyId).then(userTheme => {
                setUserTheme(userTheme);
            })
        }
    }, [user]);

    useEffect(() => {
        if (contextTheme) {
            console.log("Expand with contextTheme on top of userTheme");
            setTheme(expandTheme(expandTheme(baseTheme, userTheme), contextTheme));
        }
    }, [contextTheme, userTheme]);

    useEffect(() => {
        if (userTheme) {
            // Caching userTheme for next time:
            console.log("Expand with userTheme");
            localStorage.setItem('theme', JSON.stringify(userTheme));
            setTheme(expandTheme(baseTheme, userTheme));
        }
    }, [userTheme]);

    const saveTheme = async () => {
        if (user) {
            setUserTheme(contextTheme);
            setContextTheme(null);
            await firestore.doc(`companies/${user.companyId}`).update({
                theme: contextTheme
            })
        }
    }

    return (
        <ThemeContext.Provider value={{
            setContextTheme,
            contextTheme
        }}>
            <ThemeProvider theme={theme} x={'x'}>
                {props.children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default DynamicThemeProvider;
