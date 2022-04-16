import { useNavigation } from '@react-navigation/core'
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import tw from 'tailwind-rn';
import React, {useContext,useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import EventRow from '../../components/EventRow';

const EventsScreen = ({navigation}) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [eventsUser, eventsUserSet] = useState([]);

  return (
    <SafeAreaView style={tw('mt-10')}>
      <View style={tw('p-1 flex flex-row justify-between items-center')}>
        <Text style={tw('text-2xl font-bold pl-2')}>Events</Text>

        <TouchableOpacity style={tw('mr-4 p-3')} onPress={()=>{navigation.navigate('EditEventScreen')}}>
          <FontAwesome name="calendar-plus-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {eventsUser.length > 0 ? (
        <FlatList 
            style={tw('h-full')}
            data={eventsUser}
            keyExtractor={event => event.id}
            renderItem={({event}) => <EventRow eventDetails={event}></EventRow>}
        />
    ) : (
        <View style={tw('p-5')}>
            <Text>No Events at the Moment</Text>
        </View>
    )}
    </SafeAreaView>
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