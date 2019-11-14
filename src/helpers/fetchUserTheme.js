import { firestore } from '../config/clientSdk';

export default async (companyId) => {
    try {
        const companyDoc = await firestore.doc(`companies/${companyId}`).get();
        const { userTheme, userThemeBase } = companyDoc.data();
        return { userTheme, userThemeBase };
    } catch (err) {
        console.log("Unable to fetch userTheme");
        return null;
    }
}