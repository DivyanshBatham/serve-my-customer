import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'
import 'firebase/analytics'
import 'firebase/performance'
import firebaseConfig from './firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// From Fireship:
export const auth = firebase.auth();
export const firestore = firebase.firestore();
firebase.performance();
firebase.analytics();

// firebase.firestore.settings({ timestampsInSnapshots: true })

export default firebase; 