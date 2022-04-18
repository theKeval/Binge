import { StyleSheet, Text,TextInput, View ,SafeAreaView,TouchableOpacity} from 'react-native'
import React, {useContext,useState} from 'react'
import tw from 'tailwind-rn';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import Header from '../../components/header';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import * as fbOperations from '../../firebase/operations';
import { FontAwesome,Ionicons } from '@expo/vector-icons'; 
import openMap from 'react-native-open-maps';
import { FontAwesome5 } from '@expo/vector-icons';
const EditEventScreen = ({navigation,route}) => {
  const { user } = useContext(AuthenticatedUserContext);

  const [showDatePicker, showDatePickerset] = useState(false);
  const [showTimePicker, showTimePickerset] = useState(false);
  const [currentDate, currentDateSet] = useState(moment().toDate());

  const [id, idSet] = useState(null);
  const [title, titleSet] = useState('');
  const [date, dateSet] = useState(moment().format('DD-MMM-YYYY'));
  const [time, timeSet] = useState(moment().format('hh:mm a'));
  const [description, descriptionSet] = useState('');
  const [place, placeSet]= useState(null);
  const [placeIndex, placeIndexSet]= useState(null);
  const [placesList, placesListSet]= useState([]);
  const [attendees, attendeesSet]= useState([]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {

        try {
          fbOperations.getPlaces()
          .then(async (response)=>{
            await placesListSet(response)
            if(route.params && route.params.id){
              idSet(route.params.id);
              titleSet(route.params.title);
              dateSet(moment(route.params.date).format('DD-MMM-YYYY'));
              timeSet(moment(route.params.date).format('hh:mm a'));
              currentDateSet(moment(route.params.date).toDate())
              descriptionSet(route.params.description);
              placeSet(route.params.place);
            }
          }).catch((error)=>{
            console.log(error)   
          })
        } catch (error) {
            console.log(error)    
        }
        
    });

    return unsubscribe;
  }, [navigation]);

  const deleteEvent = () => {
    fbOperations.deleteEvent(id)
    .then((eventDeleted)=>{
      alert("Event Deleted!!")
      navigation.goBack()
    })
    .catch((error)=>{
      console.log(error)   
    })
  }
  const saveEvent = () => {
    if(!title || title === "" ){
      alert("");
    } else if (!date || date === "" ) {
      alert("");
    } else if (!time || time === "" ) {
      alert("");
    } else if (!description || description === "" ) {
      alert("");
    } else if (!place || place === "" ) {
      alert("");
    } else {
      const eventObj = {
        id: id,
        title : title,
        description : description,
        date: moment(currentDate).toISOString(),
        dateString: moment(currentDate).format('DD-MMM-YYYY'),
        timeString: moment(currentDate).format('hh:mm a'),
        place : place,
        createdBy : user.id,
      };
      if(id){
        fbOperations.updateEvent(id,eventObj).then(()=> {
          navigation.goBack()
        }).catch((error)=>{console.log(error)})
      }else{
        fbOperations.createEvent(eventObj).then(()=> {
          navigation.goBack()
        }).catch((error)=>{console.log(error)})
      }
    }
  }

  const renderPlaceList = () => {
    console.log(place)
    return placesList.map((place,i) => {
      return <Picker.Item key={place} label={ place.name} value={place} style={[{}]} />
    })
  }

  return (
    <SafeAreaView style={[tw('mt-10'),styles.container]}>
      <View style={tw('p-1 flex-row items-center justify-between')}>
        <View style={tw('flex flex-row items-center')}>
            <TouchableOpacity style={tw('p-2')} onPress={() => navigation.goBack()}>
              <Ionicons name='chevron-back-outline' size={34} color='black' />
            </TouchableOpacity>
            <Text style={tw('text-2xl font-bold pl-2')}>Edit Event</Text>
        </View>
        {id && <TouchableOpacity style={tw(' mr-4 p-3')} onPress={deleteEvent}>
          <FontAwesome name="trash-o" size={30} color="black" />
        </TouchableOpacity>}
    </View>

      <View  style={styles.row}>
          <Text style={styles.label}>Title: {date}</Text>
          <TextInput
              placeholder='Title'
              value={title}
              onChangeText={text => titleSet(text)}
              style={[styles.textField]}
          />
      </View>

      <View  style={styles.row2columns}>
        <View  style={[styles.row, {width:'50%'}]}>
            <Text style={styles.label}>Date:</Text>
            <TextInput
                
                placeholder='Date'
                value={date}
                onPressIn={async ()=>{await showDatePickerset(true)}}
                style={[styles.textField]}
            />
            {showDatePicker && (
                <DateTimePicker
                minimumDate={new Date()}
                value={currentDate}
                mode={'date'}
                onChange={(event, selectedDate) => {
                  showDatePickerset(false);
                  if(event.type !== 'dismissed') {
                    console.log(selectedDate)
                    dateSet(moment(selectedDate).format('DD-MMM-YYYY'));
                    currentDateSet(selectedDate);
                  };
                } }
                />
            )}
        </View>
        <View  style={[styles.row, {width:'50%'}]}>
            <Text style={styles.label}>Time:</Text>
            <TextInput
                
                placeholder='Time'
                value={time}
                onPressIn={async ()=>{await showTimePickerset(true)}}
                style={[styles.textField]}
            />
            {showTimePicker && (
                <DateTimePicker
                minimumDate={new Date()}
                value={currentDate}
                mode={'time'}
                onChange={(event, selectedDate) => {
                  showTimePickerset(false);
                  if(event.type !== 'dismissed') {
                    console.log(selectedDate)
                    timeSet(moment(selectedDate).format('hh:mm a'));
                    currentDateSet(selectedDate);
                  }
                }}
                />
            )}
        </View>
      </View>
      <View  style={styles.row}>
          <Text style={styles.label}>Description:</Text>
          <TextInput
              placeholder='Description'
              value={description}
              multiline={true}
              numberOfLines={3}
              onChangeText={text => descriptionSet(text)}
              style={[styles.textField,{textAlignVertical:'top'}]}
          />
      </View>
      <View  style={styles.row}>
        <Text style={styles.label}>Place:</Text>
        <View  style={[ {flexDirection:'row',alignItems:'center', justifyContent:'space-between'}]}>
          <View style={[styles.field, {width:"85%"}]}>
              <Picker
                  selectedValue={place}
                  onValueChange={(itemValue, itemIndex) =>
                      { placeSet(itemValue)}
                  }>
                  <Picker.Item label="-- Select --" value="" />
                  {renderPlaceList()}
              </Picker>
          </View>
          <TouchableOpacity disabled={place===null || place===""} onPress={()=>{openMap({ latitude: 37.865101, longitude: -119.538330 });}} style={{width:"10%"}}>
            <FontAwesome5 name="directions" size={30} color={place===null || place==="" ? "gray" :"#009B81"} />
          </TouchableOpacity>
        </View>
      </View>
      <View  style={styles.row}>
        <TouchableOpacity onPress={saveEvent} style={styles.btnSave}>
            <Text style={styles.buttonText}>Save Event</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default EditEventScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFAEE'
  },
  row: {
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: "5%"
  },
  row2columns: {
    justifyContent: 'space-between',
    flexDirection:'row'
  },
  label: {
    textAlign: 'left',
    fontWeight: '700',
    marginBottom: 5,
    fontSize: 16,

  },
  searchBtn: {
    marginHorizontal: 10,
    padding: 5
  },
  textField: {
    backgroundColor: 'white',
    borderColor: '#009B81',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  field:{
    backgroundColor: 'white',
    borderColor: '#009B81',
    borderWidth: 2,
    borderRadius: 10,
  },
  btnSave: {
    marginTop:20,
    backgroundColor: '#FFBE27',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
})