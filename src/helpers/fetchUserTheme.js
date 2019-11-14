import { firestore } from '../config/clientSdk';

export default async (companyId) => {
    try {
        const companyDoc = await firestore.doc(`companies/${companyId}`).get();
        const { currentTheme, userTheme, userThemeBase } = companyDoc.data();
        return { currentTheme, userTheme, userThemeBase };
    } catch (err) {
        console.log("Unable to fetch userTheme");
        return null;
    }
}