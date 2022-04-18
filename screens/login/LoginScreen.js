import { useNavigation } from '@react-navigation/core'
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import React, { useEffect, useState, useContext, useRef } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Image , Button, Platform} from 'react-native'
import { auth, db } from '../../firebase/config'
import * as fbOperations from '../../firebase/operations';
import { LogBox } from 'react-native';
import Logo from '../../assets/bingelogo.png'
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

LogBox.ignoreLogs(['Setting a timer','The Expo push notification service']);
const LoginScreen = ({navigation}) => {

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {

        try {
          if(user && user.finishedProfile){
            navigation.replace("Home")
      
          }else if(user && !user.finishedProfile){
            navigation.replace("AboutMe")
          }
        } catch (error) {
            console.log(error)    
        }
        
    });

    return unsubscribe;
  }, [navigation]);

  const { user, setUser } = useContext(AuthenticatedUserContext);
  const {height} = useWindowDimensions('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')



  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(async userCredentials => {
        const userObj = {
          "email": email.toLowerCase(),
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

  return (
    <View
      style={styles.container}
      behavior="padding"
    >
      <TouchableOpacity style={{width: '100%',height: height*0.3}} onPress={async () => {await schedulePushNotification();}}>
        <Image style={[styles.bingeLogo, {height: height*0.3}]} source={require('../../assets/bingelogo.png')} resizeMode="contain"/>
      </TouchableOpacity>

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
          onPress={()=>{navigation.replace("OTP")}}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Access with phone number</Text>
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
    marginTop:30,
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


async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got a notification! 📬",
      body: 'Here is the notification body',
      data: { data: 'goes here' },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } catch (error) {
    
  }



  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}