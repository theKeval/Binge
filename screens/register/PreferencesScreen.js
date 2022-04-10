import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import React,{useState,useContext} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
import * as fbOperations from '../../firebase/operations';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';

const PreferencesScreen = ({navigation}) => {
    const {height, width} = useWindowDimensions();
    const { user, setUser } = useContext(AuthenticatedUserContext);

    const [minAge , minAgeSet] = useState( 19);
    const [maxAge , maxAgeSet] = useState( 99);
    const [maxLocation , maxLocationSet] = useState( 50);
    const [orientation , orientationSet] = useState( "");

    const savePreferences = () =>{
        const preferencesObj = {...user}
        preferencesObj["minAge"] = minAge; 
        preferencesObj["maxAge"] = maxAge; 
        preferencesObj["maxLocation"] = maxLocation; 
        preferencesObj["orientation"] = orientation; 
        fbOperations.updateUserInfo(user.email,preferencesObj).then(async ()=>{
            await setUser(preferencesObj);

            navigation.navigate('Interests');
        }).catch((e)=> {
            console.log(error)
        })
    }

    
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return  <TouchableOpacity onPress={() => {navigation.navigate('Interests') }}>
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
                   await minAgeSet( user.minAge)
                   await maxAgeSet( user.maxAge)
                   await maxLocationSet( user.maxLocation)
                   await orientationSet( user.orientation)
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
        <View  style={styles.row}>
            <Text style={styles.label}>I would like to meet:</Text>
            <View style={[styles.field]}>
                <Picker
                    
                    selectedValue={orientation}
                    onValueChange={(itemValue, itemIndex) =>
                        orientationSet(itemValue)
                    }>
                    <Picker.Item label="Show me all" value="" />
                    <Picker.Item label="Only men" value="male" />
                    <Picker.Item label="Only Women" value="female" />
                    
                </Picker>
            </View>

        </View>
        <View  style={styles.row}>

            <TouchableOpacity
                onPress={savePreferences}
                style={styles.btnSave}
                >
                <Text style={styles.buttonText}>Save and Continue</Text>
                </TouchableOpacity>
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
      btnSave: {
        marginTop:20,
      backgroundColor: 'lightgray',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
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