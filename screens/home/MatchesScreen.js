import { useNavigation } from '@react-navigation/core'
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

import React, {useContext} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { auth } from '../../firebase/config'
import Header from '../../components/header';
import tw from 'tailwind-rn';
import ChatList from '../../components/ChatList';

const MatchesScreen = ({navigation}) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  return (
    <SafeAreaView style={[tw('mt-10'), {backgroundColor: '#FFFAEE'}]}>
      <Header title="Matches" callEnabled={false} />
      <ChatList />
      {/* style={[tw('mb-10'), {marginBottom: 50}]} */}
    </SafeAreaView>
  )
}

export default MatchesScreen

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