import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const PreferencesScreen = ({navigation}) => {
    const {height, width} = useWindowDimensions();

    const [minAge , minAgeSet] = useState( 19);
    const [maxAge , maxAgeSet] = useState( 99);
    const [maxLocation , maxLocationSet] = useState( 50);
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
            <View  style={styles.rowSlider}>
                <View style={styles.viewLabelSlider}>
                    <Text style={styles.label}>Age Range:</Text>
                </View>
                <View style={styles.viewLabelSlider}>
                    <Text style={[styles.label, {textAlign:'right'}]}>{minAge} yo - {maxAge} yo</Text>
                </View>
            </View>
            <View style={styles.rowSliderElement}>
                <MultiSlider
                values={[minAge,maxAge]}
                onValuesChange={(values) =>{minAgeSet(values[0]);maxAgeSet(values[1]);}}
                sliderLength ={width*0.85}
                min={19} max={100} step={1} allowOverlap={false} snapped minMarkerOverlapDistance={10}/>
            </View>
        </View>
        <View  style={styles.row}>
            <View  style={styles.rowSlider}>
                <View style={styles.viewLabelSlider}>
                    <Text style={styles.label}>Distance Range:</Text>
                </View>
                <View style={styles.viewLabelSlider}>
                    <Text style={[styles.label, {textAlign:'right'}]}>{maxLocation} km</Text>
                </View>
            </View>
            <View style={styles.rowSliderElement}>

                <MultiSlider
                    values={[maxLocation]}
                    min={1} max={50} step={1}
                    sliderLength={width*0.85}
                    onValuesChange={(values) =>{maxLocationSet(values[0])}}/>
            </View>
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
    rowSlider: {
        
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    viewLabelSlider: {
        width: '50%',
        
    },
    rowSliderElement:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',

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