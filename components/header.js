import { useNavigation } from '@react-navigation/core'
import React, {useContext} from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tw from 'tailwind-rn';
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Foundation } from '@expo/vector-icons';

const Header = ({title, callEnabled}) => {

    const navigation = useNavigation();

  return (
    <View style={tw('p-1 flex-row items-center justify-between')}>
      <View style={tw('flex flex-row items-center')}>
          <TouchableOpacity style={tw('p-2')} onPress={() => navigation.goBack()}>
            <Ionicons name='chevron-back-outline' size={34} color='#FF5864' />
          </TouchableOpacity>
          <Text style={tw('text-2xl font-bold pl-2')}>{title}</Text>
      </View>

      { callEnabled && (
          <TouchableOpacity style={tw('rounded-full mr-4 p-3 bg-red-200')}>
              <Foundation name='telephone' size={20} color='red' />
          </TouchableOpacity>
      )}
    </View>
  )
}

export default Header

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