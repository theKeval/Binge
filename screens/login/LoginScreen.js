import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import { auth, db } from '../../firebase/config'
import * as fbOperations from '../../firebase/operations';
import { LogBox } from 'react-native';
import Logo from '../../assets/bingelogo.png'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import useAuth from '../../hooks/useAuth'

LogBox.ignoreLogs(['Setting a timer']);
const LoginScreen = ({navigation}) => {

  const { loginWithEmailPassword, signUpWithEmailPassword, loading } = useAuth();

  // const { user, setUser } = useContext(AuthenticatedUserContext);
  
  const {height} = useWindowDimensions('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  /* in-house login signup functions
  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
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
        navigation.replace("AboutMe")
      })
      .catch(error => alert(error.message))
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        fbOperations.GetUserInfo(email).then(async (user)=>{
          await setUser(user);
          if(user && user.finishedProfile){
            navigation.replace("Home")
    
          }else if(user && !user.finishedProfile){
            navigation.replace("AboutMe")
          }

        }).catch((error)=>{
          console.log(error)

        })
      })
      .catch(error => alert(error.message))
  }
  */

  return (
    <View
      style={styles.container}
      behavior="padding"
    >
      <Image style={[styles.bingeLogo, {height: height*0.3}]} source={require('../../assets/bingelogo.png')} resizeMode="contain"/>
      

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={loginWithEmailPassword(email, password)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>{navigation.replace("OTP")}}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Access with phone number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signUpWithEmailPassword(email, password)}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAEE',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: '#009B81',
    borderWidth: 1,
    marginTop: 5,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  button: {
    backgroundColor: '#FFBE27',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: '#009B81',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#009B81',
    fontWeight: '700',
    fontSize: 16,
  },
  bingeLogo: {
    width:'90%',
    maxWidth: 500,
    maxHeight:160,
    marginBottom: 50,
  }
})