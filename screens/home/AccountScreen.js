import { useNavigation } from '@react-navigation/core'
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import React, {useContext, useState} from 'react'
import tw from "tailwind-rn";
import { StyleSheet, Text, TouchableOpacity, View, Image, Button } from 'react-native'
import { auth } from '../../firebase/config'
import { AntDesign, Entypo, Ionicons, Feather } from "@expo/vector-icons";
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import ImageUploader from '../../components/ImageUploader';

const AccountScreen = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [image1, image1Set] = useState("");

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null)
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
      <ImageUploader imageURL={image1} onSetImageURL={(url)=>{image1Set(url)}} widthImg={width*0.625} heightImg={width*0.625}></ImageUploader>
        <Text style={styles.username}>User{auth.currentUser?.firstName}</Text>
      </View>

      <View style={tw("flex flex-row justify-between mb-5")}>

      <TouchableOpacity onPress={()=> navigation.replace("AboutMe")} style={tw(
              "items-center justify-center rounded-full h-16 w-16 bg-white"
            )}>
          <Feather name="settings" size={44} color='#009B81' />
        </TouchableOpacity>
      </View>

      <Text>Logged as: {auth.currentUser?.email}</Text>
      <TouchableOpacity onPress={handleSignOut}style={styles.button}><Text style={styles.buttonText}>Sign out</Text></TouchableOpacity>
    </View>
  )
}

export default AccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAEE'
  },
   button: {
    backgroundColor: '#009B81',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  
  profile: {
    marginTop: 0,
    marginBottom: 20,
  },
  username: {
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
  },
})