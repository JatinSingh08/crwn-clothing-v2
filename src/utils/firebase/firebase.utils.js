import { initializeApp } from 'firebase/app'
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query, 
  getDocs
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

//creating the googleProvider 
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth(); //getting auth
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore(); //getting the database using getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  })

  await batch.commit();
  console.log('done');
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapShot = await getDocs(q);
  const categoryMap = querySnapShot.docs.reduce((acc, docSnapShot) => {
    const {title, items} = docSnapShot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
  return categoryMap;  
}


export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
  ) => {

  if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid); //creating the document reference for database
  console.log(userDocRef);

  const userSnapShot = await getDoc(userDocRef); //getting the document reference
  console.log(userSnapShot);
  console.log(userSnapShot.exists()); //checking if the user already exists
  
  if(!userSnapShot.exists()) {
    const {displayName, email} = userAuth; //destructuring displayName & email from userAuth
    const createdAt = new Date(); //taking the date 

    try {
      await setDoc(userDocRef, { //setDoc takes arguments as doc ref & the parameters to update
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
  
  //creating user with email & password
  if(!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}
export const singInAuthUserWithEmailAndPassword = async (email, password) => {

  //creating sign in with email & password
  if(!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);