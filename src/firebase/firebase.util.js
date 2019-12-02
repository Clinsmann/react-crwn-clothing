import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCWAWUOBaIJWxc2jd6v_6EWziNdBmlS51c",
    authDomain: "crown-db-87892.firebaseapp.com",
    databaseURL: "https://crown-db-87892.firebaseio.com",
    projectId: "crown-db-87892",
    storageBucket: "crown-db-87892.appspot.com",
    messagingSenderId: "217880674674",
    appId: "1:217880674674:web:e70409a8c137df00b49deb",
    measurementId: "G-2EF6QGDHXC"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            })
        }catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;