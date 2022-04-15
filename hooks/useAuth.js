import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  PhoneAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/config";
import Constants from 'expo-constants';
import * as fbOperations from '../firebase/operations';

const AuthContext = createContext({});

const config = {
  androidClientId: Constants.manifest.extra.androidClientId,
  iosClientId: Constants.manifest.extra.iosClientId,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);
  const [verificationId, setVerificationId] = useState('');

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
          console.log(user);
        if (user) {
          // logged in...
          console.log("User logged in");
          setAuthUser(user);
          
        //   fbOperations.GetUserInfo(email)
        //   .then( (user)=>{
        //     setUser(user);
        //     if(user && user.finishedProfile){
        //       // navigation.replace("Home")
      
        //     }else if(user && !user.finishedProfile){
        //       // navigation.replace("AboutMe")
        //     }
  
        //   }).catch((error)=>{
        //     console.log(error)
        //   })

        } else {
          // not logged in...
          setAuthUser(null);
          setUser(null);
        }

        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const loginWithGoogle = async () => {
    setLoading(true);

    await Google.logInAsync(config)
      .then(async (loginResult) => {
        if (loginResult.type === "success") {
          // login...
          const { idToken, accessToken } = loginResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const loginWithEmailPassword = (email, password) => {
    signInWithEmailAndPassword(email, password)
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
  }

//   const loginOTP = async () =>{
//       setLoading(true);

//     //   await PhoneAuthProvider(auth).verifyPhoneNumber( "+1" + phoneNumber, recaptchaVerifier.current)
//     //     .then(async (verificationId) => {
//     //         setVerificationId(verificationId);
//     //         alert('The verification code has been sent to your phone.')
//     //     })
//     //     .catch((error) => {
//     //         setError(error);
//     //         console.log({ text: `Error: ${error.message}`, color: 'red' });
//     //     })

//     try {
//         const phoneProvider = new PhoneAuthProvider(auth);
//         const verificationId = await phoneProvider.verifyPhoneNumber(
//           "+1"+phoneNumber,
//           recaptchaVerifier.current
//         );
//         setVerificationId(verificationId);
//         alert('The verification code has been sent to your phone.')

//       } catch (err) {
//         console.log({ text: `Error: ${err.message}`, color: 'red' });
//       }
//   }

  const signUpWithEmailPassword = (email, password) => {
    createUserWithEmailAndPassword(email, password)
      .then(async userCredentials => {
        const userObj = {
          "email": email,
          "id": userCredentials.user.uid,
          "firstName": "",
          "lastName": "",
          "dob": "",
          "gender": "",
          "orientation": "",
          "minAge": 20,
          "maxAge": 49,
          "maxLocation":50,
          "profilePicture": "",
          "lastLocationLon":0,
          "lastLocationLat":0,
          "userPhotos":[],
          "interests": [],
          "finishedProfile": false,
        }
        await fbOperations.Signup(email, userObj)
        setUser(userObj);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }

  const memoedValue = useMemo(() => ({
    authUser,
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithEmailPassword,
    signUpWithEmailPassword,
    logout,
  }), [authUser, user, loading, error]);

  return (
    <AuthContext.Provider value={memoedValue} >
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
