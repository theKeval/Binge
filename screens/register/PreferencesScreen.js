import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';

const PreferencesScreen = ({navigation}) => {
    const [minAge , minAgeSet] = useState( 19);
    const [maxAge , maxAgeSet] = useState( 99);
    const [sexualOrientation , sexualOrientationSet] = useState( "");

    const savePreferences = () =>{
        navigation.navigate('Interests')
    }
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return  <TouchableOpacity onPress={() => { savePreferences()}}>
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
                value={minAge}
                onChangeText={text => minAgeSet(text)}
                style={[styles.textField]}
            />
        </View>
    </View>
  )
}

export default PreferencesScreen

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