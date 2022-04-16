import { useNavigation } from '@react-navigation/core'
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import React, {useContext} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase/config'
import { Button } from 'react-native-web';

const AccountScreen = ({navigation}) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);

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
      <View>
        <Image>{auth.currentUser?.Image}</Image>
        <Text>{auth.currentUser?.displayName}</Text>
      </View>
      <TouchableOpacity>
        <AntDesign name="SettingOutlined" size={24} color='#009B81' />
        <AntDesign name="CameraOutlined" size={24} color='#009B81' />
        <AntDesign name="EditOutlined" size={24} color='#009B81' />
      </TouchableOpacity>
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
    alignItems: 'center'
  },
   button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})