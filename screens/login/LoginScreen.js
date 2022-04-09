import { useNavigation } from '@react-navigation/core'
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import React, { useEffect, useState, useContext} from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, db } from '../../firebase/config'
import * as fbOperations from '../../firebase/operations';
LogBox.ignoreLogs(['Setting a timer']);
const LoginScreen = ({navigation}) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Home")
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredentials => {
        const userObj = {
          "email": email,
          "id": userCredentials.user.uid,
          "fistName": "",
          "lastName": "",
          "dob": "",
          "gender": "",
          "orientation": "",
          "minAge": "",
          "maxAge": "",
          "maxLocation":50,
          "profilePicture": "",
          "lastLocationLon":0,
          "lastLocationLat":0,
          "userPhotos":[],
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
        const user = userCredentials.user;
        fbOperations.GetUserInfo(email).then(async (user)=>{
          await setUser(user);
          if(user.finishedProfile){
            navigation.replace("Home")

          }else{
            navigation.replace("AboutMe")
          }
        }).catch((error)=>{
          console.log(error)

        })
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }

  return (
    <View
      style={styles.container}
      behavior="padding"
    >
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
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
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
  },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})