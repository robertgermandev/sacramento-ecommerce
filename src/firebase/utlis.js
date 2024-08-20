import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

import { firebaseConfig } from "./config";

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

const GoogleProvider = new GoogleAuthProvider();
GoogleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => signInWithPopup(auth, GoogleProvider);

export const handleUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const { uid } = userAuth;

  const userRef = doc(firestore, `users/${uid}`);

  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdDate = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdDate,
        ...additionalData,
      });
    } catch (err) {
      console.log("Error creating user document", err);
    }
  }

  return userRef;
};
