import { firestore } from '../config/clientSdk';

export default async (companyId) => {
    try {
        const companyDoc = await firestore.doc(`companies/${companyId}`).get();
        const { theme } = companyDoc.data();
        console.log("userTheme fetched, update the theme now:")
        console.log(theme);
        return theme;
    } catch (err) {
        console.log("Unable to fetch userTheme");
        return null;
    }
}