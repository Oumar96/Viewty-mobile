import firebase from 'firebase';
const firebaseConfig = {
    apiKey: 'AIzaSyDZ210yNoojttU3JhoWn1khGoap3NcAGEM',
    authDomain: 'view-and-party.firebaseapp.com',
    databaseURL: 'https://view-and-party-default-rtdb.firebaseio.com',
    projectId: 'view-and-party',
    storageBucket: 'view-and-party.appspot.com',
    messagingSenderId: '305981425250',
    appId: '1:305981425250:web:d2a9ba825a620b4f33f33b',
    measurementId: 'G-NTJD41PGK3',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;