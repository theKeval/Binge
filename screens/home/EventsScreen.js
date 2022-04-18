import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import tw from 'tailwind-rn';
import React, {useContext,useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView,FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'; 
import * as fbOperations from '../../firebase/operations';
import {Picker} from '@react-native-picker/picker';

const EventsScreen = ({navigation}) => {
  const { user } = useContext(AuthenticatedUserContext);
  const [eventsUser, eventsUserSet] = useState([]);
  const [filterSelect, filterSelectSet] = useState("upcomming");

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {

        try {
          fillEventList("upcomming")
        } catch (error) {
            console.log(error)    
        }
        
    });

    return unsubscribe;
  }, [navigation]);
  const fillEventList = (filter)=>{
    let operation ;
    if(filter === "userEvents"){
      operation = fbOperations.getUserEvents(user.id)
    }else if (filter === "pastEvents") {
      operation = fbOperations.getPastEvents(user.id)
    } else {
      operation = fbOperations.getEvents(user.id)
    }
    operation.then(async (response)=>{
      await eventsUserSet(response)
    }).catch((error)=>{
      console.log(error)   
    })
  }
  const detailEvent = (event)=>{
    if (user.id === event.item.createdBy) {
      navigation.navigate('EditEventScreen', event.item);
    } else {
      navigation.navigate('DetailEventScreen', event.item);
    }
  }
  return (
    <SafeAreaView style={[tw('mt-10'),styles.container]}>
      <View style={[tw('p-1 flex flex-row justify-between items-center')]}>
        <Text style={tw('text-2xl font-bold pl-2')}>Events</Text>
        <TouchableOpacity style={[tw('mr-4 p-3')]} onPress={()=>{navigation.navigate('EditEventScreen')}}>
          <FontAwesome name="calendar-plus-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
          <View style={[styles.field]}>
            <Picker
                selectedValue={filterSelect}
                onValueChange={(itemValue, itemIndex) =>{
                  filterSelectSet(itemValue);
                  fillEventList(itemValue)
                }}>
                <Picker.Item label="Upcomming Events" value="upcomming" />
                <Picker.Item label="My Events" value="userEvents" />
                <Picker.Item label="Past Events" value="pastEvents" />
            </Picker>
        </View>
        <View
              style={{
                  borderBottomColor: 'black',
                  borderBottomWidth: 1,
                  width:'100%',
                  marginBottom: 10,
              }}
              />
      {eventsUser.length > 0 ? (
        <FlatList 
            style={tw('h-full')}
            data={eventsUser}
            keyExtractor={event => event.id}
            renderItem={(event) => {
              return (
                <TouchableOpacity onPress={() => {detailEvent(event)}} style={[styles.item]}>
                  <View style={styles.itemDescLeft}>
                      <Text style={[styles.title]}>{event.item.title}</Text>
                      <Text >{event.item.dateString} {event.item.timeString}</Text>
                  </View>
                  <View style={styles.itemDescRight}>

                  </View>
                </TouchableOpacity>
              )
            }}
        />
    ) : (
        <View style={[styles.title ,tw('p-5')]}>
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
    backgroundColor: '#FFFAEE',

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

  item:{
    flexDirection : 'row',
    paddingHorizontal: 10,
    paddingVertical:4,
    margin: 3,
    borderRadius: 8
  },
  itemDescLeft:{
      padding: 5,
      width: '50%',
      // alignItems: 'center' 
  },
  itemDescRight:{
      padding: 5,
      width: '50%',
      // alignItems: 'center' 
  },
  title : {
      fontSize: 22,
      fontWeight: "700"
  },
  lastRow : {
      flexDirection : 'row',
      justifyContent: 'space-between'
  },
  category:{
      flexDirection: 'column',
  },  
  price : {
      fontSize: 25,
      flexDirection: 'column',
      textAlign: 'right'
  },
  status:{
      fontStyle:'italic',
    textAlign: 'right'
  }
})