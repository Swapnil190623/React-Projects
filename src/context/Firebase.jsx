import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { initializeApp } from "firebase/app";
import { signOut } from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  where,
  query,
} from "firebase/firestore"; // dataBase
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"; //storage
import firebase from "firebase/compat/app";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyCv2fm-Qv10_aTLs13mR2a8PZDCU-6w6LI",
  authDomain: "bookly-2cb41.firebaseapp.com",
  projectId: "bookly-2cb41",
  storageBucket: "bookly-2cb41.appspot.com",
  messagingSenderId: "192303587452",
  appId: "1:192303587452:web:20f50519dc828289b0e9f9",
}; // Fire Conf Got by Firebase ..

export const useFirebase = () => useContext(FirebaseContext); // custom Hook For Context ..

//creting Instances of ....
const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();
//////

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []); // this is for cheking the user is loged in already or not ..
  // context provider

  // creting Authentication Methods Here ...
  const signupUserWithEmailAndPassword = (email, password) =>
    createUserWithEmailAndPassword(firebaseAuth, email, password);

  const signinUserWithEmailAndPassword = (email, password) =>
    signInWithEmailAndPassword(firebaseAuth, email, password);

  const signinWithGoogle = () => signInWithPopup(firebaseAuth, googleProvider);

  //Sigout (Logout Mehod )

  const handleSignOut = () => {
    signOut(firebaseAuth)
      .then(() => console.log("LogOut Succesfully ..."))
      .catch((error) => console.log("Having Error In Logging Out User ."));
  };

  //// here we have uploaded the image to the storage ...

  const createNewListing = async (name, isbn, price, cover) => {
    const imageRef = ref(storage, `uploads/images/${Date.now()}-${cover.name}`);
    //// adding image ref to dataBase ..FireStore ..

    const uploadResult = await uploadBytes(imageRef, cover);
    //uploading Image ..

    //adding doc to the dataBase .. (Saving Details In DB)
    return await addDoc(collection(firestore, "books"), {
      name,
      isbn,
      price,
      imageURL: uploadResult.ref.fullPath,
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    });
  };

  // function for getting all books from databse and displaying..

  const listAllBooks = () => {
    return getDocs(collection(firestore, "books"));
  };

  const getBookById = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  }; // function for fetching 1 doc by It's Id From DB...

  // function for displaying the image

  const getImageURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  // This is function for placing order of book ...
  const placeOrder = async (bookId, qty) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    const result = await addDoc(collectionRef, {
      userID: user.uid,
      userEmail: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return result;
    alert("Order Is Placed Succesfully ..");
  };

  const fetchMyBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));
    const result = await getDocs(q);
    return result;
  };

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "orders");
    try {
      const result = await getDocs(collectionRef);
      return result;
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Handle error gracefully in OrderDetails component (e.g., display "Order Not Found")
      return null; // Or an empty array/object to indicate no orders
    }
  };

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        handleSignOut,
        getOrders,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signinWithGoogle,
        listAllBooks,
        placeOrder,
        fetchMyBooks,
        getBookById,
        getImageURL,
        isLoggedIn,
        createNewListing,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
