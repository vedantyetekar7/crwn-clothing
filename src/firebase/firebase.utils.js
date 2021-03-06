import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { useRef } from "react";

const config = {
  apiKey: "AIzaSyAvCqlQsmT_MjapuEY28flnHrydkqV2R2s",
  authDomain: "crwn-clothing-db-2f71e.firebaseapp.com",
  projectId: "crwn-clothing-db-2f71e",
  storageBucket: "crwn-clothing-db-2f71e.appspot.com",
  messagingSenderId: "962840310662",
  appId: "1:962840310662:web:bde30d084f994822483207",
  measurementId: "G-PRNXLGVRVC",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
