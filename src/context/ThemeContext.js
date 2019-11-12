import React, { useContext, useState, useEffect } from 'react';
import { ThemeProvider } from 'styled-components'
import { firestore } from '../config/clientSdk';
import { AuthContext } from './AuthContext';
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
                expandTheme(baseTheme, JSON.parse(cachedTheme));
            } catch (err) {
                console.log("Failed parsing cached theme, so not expanding");
            }
        }
    }, [cachedTheme]);


    useEffect(() => {
        async function fetchCompanyData(companyId) {
            try {
                const companyDoc = await firestore.doc(`companies/${companyId}`).get();
                const { theme } = companyDoc.data();
                console.log("userTheme fetched, update the theme now:")
                setUserTheme(theme);
            } catch (err) {
                console.log("Unable to fetch userTheme");
            }
        }

        if (user) {
            fetchCompanyData(user.companyId);
        }
    }, [user]);

    useEffect(() => {
        if (contextTheme) {
            console.log("Expand with contextTheme on top of userTheme");
            // console.log(expandTheme(baseTheme, contextTheme));
            
            // expandTheme(baseTheme, userTheme);
            expandTheme(expandTheme(baseTheme, userTheme), contextTheme);
        }
    }, [contextTheme, userTheme]);

    useEffect(() => {
        if (userTheme) {
            // Caching userTheme for next time:
            console.log("Expand with userTheme");
            localStorage.setItem('theme', JSON.stringify(userTheme));
            expandTheme(baseTheme, userTheme);
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

    function expandTheme(curTheme, newTheme) {
        let combinedTheme = { ...curTheme };
        for (var key in newTheme) {
            if (newTheme.hasOwnProperty(key)) {
                combinedTheme[key] = {
                    ...curTheme[key],
                    ...newTheme[key],
                }
            }
        }
        setTheme(combinedTheme);
        return combinedTheme;
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
