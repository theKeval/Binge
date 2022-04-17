import {
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  refEqual,
} from "firebase/firestore";
import { db } from "./config";
import moment from "moment";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import uuid from "react-native-uuid";

export const Create = async (collectionName, documentName, value) => {
  console.log("Create called");

  const docCreated = null;
  // MARK: Creating New Doc in Firebase
  // Before that enable Firebase in Firebase Console
  const myDoc = doc(db, collectionName, documentName);

  await setDoc(myDoc, value)
    // Handling Promises
    .then((responseDoc) => {
      docCreated = responseDoc;
      console.log(docCreated);
    })
    .catch((error) => {
      // MARK: Failure
      console.log(error.message);
    });

  return docCreated;
};

export const Read = async (collectionName, documentName) => {
  try {
    const docRef = doc(db, collectionName, documentName);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const Update = async (value, merge, collectionName, documentName) => {
  // MARK: Updating Doc
  const myDoc = doc(db, collectionName, documentName);
  const docUpdated = null;
  // If you set merge true then it will merge with existing doc otherwise it will be a fresh one
  await setDoc(myDoc, value, {
    merge: merge,
  })
    // Handling Promises
    .then((updateResponse) => {
      docUpdated = updateResponse;
    })
    .catch((error) => {
      // MARK: Failure
      console.log(error.message);
    });

  return docUpdated;
};
export const Delete = async (collectionName, documentName) => {
  // MARK: Deleting Doc
  const myDoc = doc(db, collectionName, documentName);
  const deleted = false;
  await deleteDoc(myDoc)
    // Handling Promises
    .then(() => {
      deleted = true;
    })
    .catch((error) => {
      // MARK: Failure
      console.log(error.message);
    });
  return deleted;
};

// #region Users related operations
export const Signup = async (emailAddress, user) => {
  console.log("signup called");

  return Create("users", emailAddress, user);
};

export const GetUserInfo = (emailAddress) => {
  // console.log("getting user: " + emailAddress);
  return Read("users", emailAddress);
};

export const updateUserInfo = (id, user) => {
  return Update(user, false, "users", id);
};

export const uploadImageAsync = async (uri) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const fileRef = ref(getStorage(), uuid.v4());
  const result = await uploadBytes(fileRef, blob);

  // We're done with the blob, close and release it
  blob.close();

  return await getDownloadURL(fileRef);
};
// #endregion
