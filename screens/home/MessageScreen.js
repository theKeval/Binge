import { useNavigation } from '@react-navigation/core'
import React, {useContext, useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import tw from 'tailwind-rn';
import Header from '../../components/header';

const MessageScreen = ({navigation}) => {

  const [input, setInput] = useState('');
  const sendMessage = () => {

  };

  return (
    <View style={tw('flex-1 mt-10')}>
      <Header title="Messages" callEnabled={true} />
      {/* <Text>Message Screen</Text> */}

      <KeyboardAvoidingView
        style={tw('flex-1')}
        keyboardVerticalOffset={10}
        // behavior={Platform.}
      >

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Text></Text>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View style={tw('flex-row justify-between items-center border-t border-gray-200 px-5 py-2 mb-5')}>
        <TextInput
          style={tw('h-10 text-lg')}
          placeholder='Send Message..'
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          value={input}
        />

        <Button title='Send' color='#FF5864' onPress={sendMessage} />
      </View>
      

      
    </View>
  )
}

export default MessageScreen

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