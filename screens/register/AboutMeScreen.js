import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';

const AboutMeScreen = ({navigation}) => {
    const [show, setShow] = useState(false);
    const [currentDate, currentDateSet] = useState(moment().add(-19,'years').toDate());

    const [firstName , firstNameSet] = useState( null);
    const [lastName , lastNameSet] = useState( null);
    const [dob , dobSet] = useState( null);
    const [gender , genderSet] = useState( "");

    const saveAboutMe = () =>{
        navigation.navigate('Preferences')
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return  <TouchableOpacity onPress={() => { saveAboutMe()}}>
                <Text style={styles.searchBtn}>
                  <Ionicons name='checkmark' size={24} color='black' />
                </Text>
              </TouchableOpacity> },
        });
    }, [navigation]);

  return (
    <View  style ={styles.container}>
        <View  style={styles.row}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
                placeholder='First Name'
                value={firstName}
                onChangeText={text => firstNameSet(text)}
                style={[styles.textField]}
            />
        </View>
        <View  style={styles.row}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
                placeholder='Last Name'
                value={lastName}
                onChangeText={text => lastNameSet(text)}
                style={[styles.textField]}
            />
        </View>
        <View  style={styles.row}>
            <Text style={styles.label}>Date of birth:</Text>
            {show && (
                <DateTimePicker
                value={currentDate}
                mode={'date'}
                onChange={(event, selectedDate) => {setShow(false);if(event.type !== 'dismissed') {dobSet(moment(selectedDate).format('DD-MM-YYYY'))};}}
                />
            )}
            {/* <DateTimePicker onPress={showDatepicker} value={dob} onChange={text => dobSet(text)} style={[styles.textField]} /> */}
                <TextInput
                        onPressIn={async ()=>{await setShow(true)}}
                    placeholder='DOB'
                    value={dob}
                    style={[styles.textField]}
                />

        </View>
        <View  style={styles.row}>
            <Text style={styles.label}>Gender:</Text>
            <View style={[styles.textField]}>
                <Picker
                    
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                        genderSet(itemValue)
                    }>
                    <Picker.Item label="-- Select --" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Non-binary" value="nonBinary" />
                    <Picker.Item label="I rather not say" value="notSay" />
                </Picker>
            </View>

        </View>
    </View>
  )
}

export default AboutMeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: MangoStyles.mangoPaleOrange,
        paddingHorizontal: '5%',
        paddingTop: 10
    },
    row: {
        justifyContent: 'center',
        marginTop: 10,
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


        // padding: 12,
        backgroundColor: 'white',
        // borderColor: MangoStyles.mangoOrangeYellow,
        borderWidth: 2,
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
})