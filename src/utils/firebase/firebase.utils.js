import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKKhXdtAlECCiCSAjNLTIn2GIAmz1YynM",
  authDomain: "crown-clothing-db-ab3b7.firebaseapp.com",
  projectId: "crown-clothing-db-ab3b7",
  storageBucket: "crown-clothing-db-ab3b7.appspot.com",
  messagingSenderId: "756411818346",
  appId: "1:756411818346:web:e9ea9c5bc103e8e189c513"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
  ) => {
  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef);
  console.log(userSnapShot);
  console.log(userSnapShot.exists());
  
  if(!userSnapShot.exists()) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      });
    } catch (error) {
      console.log('error creating the user', error.message)
    }

  } 

  return userDocRef;

};

export const createAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}
export const singInAuthUserWithEmailAndPassword = async (email, password) => {

  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}