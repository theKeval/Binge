import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useContext} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import * as fbOperations from '../../firebase/operations';

const AboutMeScreen = ({navigation}) => {
    const [show, setShow] = useState(false);
    const [currentDate, currentDateSet] = useState(moment().add(-19,'years').toDate());
    const { user, setUser } = useContext(AuthenticatedUserContext);

    const [firstName , firstNameSet] = useState( "");
    const [lastName , lastNameSet] = useState( "");
    const [dob , dobSet] = useState( "");
    const [gender , genderSet] = useState( "female");

    const saveAboutMe = () =>{
        console.log(user)
        const aboutMeObj = {...user}
        aboutMeObj["firstName"] = firstName; 
        aboutMeObj["lastName"] = lastName; 
        aboutMeObj["dob"] = dob; 
        aboutMeObj["gender"] = gender; 
        fbOperations.updateUserInfo(user.email,aboutMeObj).then(async ()=>{
            await setUser(aboutMeObj);
            // navigation.navigate('Preferences');
        }).catch((e)=> {
            console.log(error)
        })
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return  <TouchableOpacity onPress={() => {navigation.navigate('Preferences') }}>
                <Text style={styles.searchBtn}>
                  SKIP
                </Text>
              </TouchableOpacity> },
        });
    }, [navigation]);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

            try {
                if(user && user.email){
                    await firstNameSet(user.firstName);
                    await lastNameSet(user.lastName);
                    if(user.dob !== ""){
                        await dobSet(user.dob);
                        try {
                            console.log(user.dob,moment(user.dob).toDate())
                            await currentDateSet(moment(user.dob).toDate());
                        } catch (error) {
                            
                        }
                    }

                    await genderSet(user.gender);
                }
            } catch (error) {
                console.log(error)    
            }
            
        });

        return unsubscribe;
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
                onChange={(event, selectedDate) => {setShow(false);if(event.type !== 'dismissed') {dobSet(moment(selectedDate).format('DD-MMM-YYYY'))};}}
                />
            )}
                <TextInput
                        onPressIn={async ()=>{await setShow(true)}}
                    placeholder='DOB'
                    value={dob}
                    style={[styles.textField]}
                />

        </View>
        <View  style={styles.row}>
            <Text style={styles.label}>Gender:</Text>
            <View style={[styles.field]}>
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
        <View  style={styles.row}>

            <TouchableOpacity
                onPress={saveAboutMe}
                style={styles.btnSave}
                >
                <Text style={styles.buttonText}>Save and Continue</Text>
                </TouchableOpacity>
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
    field:{
        backgroundColor: 'white',
        // borderColor: MangoStyles.mangoOrangeYellow,
        borderWidth: 2,
        borderRadius: 5,
    },
    btnSave: {
        marginTop:20,
      backgroundColor: 'lightgray',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
})