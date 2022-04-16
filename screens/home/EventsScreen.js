import { useNavigation } from '@react-navigation/core'
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import React, {useContext} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { auth } from '../../firebase/config'

const EventsScreen = ({navigation}) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  return (
    <View style={styles.container}>
      <Text>Events Screen</Text>
    </View>
  )
}

export default EventsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFFAEE",
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