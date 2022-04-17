import { StyleSheet, Text, View ,SafeAreaView} from 'react-native'
import React, {useContext,useState} from 'react'
import tw from 'tailwind-rn';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import Header from '../../components/header';

const EditEventScreen = () => {
  
  const [name, nameSet] = useState('');
  const [date, dateSet] = useState('');
  const [description, descriptionSet] = useState('');
  const [attendees, attendeesSet]= useState([]);
  return (
    <SafeAreaView style={tw('mt-10')}>
      <Header title="Edit Event" callEnabled={false} />

    </SafeAreaView>
  )
}

export default EditEventScreen

const styles = StyleSheet.create({})