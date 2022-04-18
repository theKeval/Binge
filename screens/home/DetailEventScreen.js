import { StyleSheet, Text,TextInput, View ,SafeAreaView,TouchableOpacity} from 'react-native'
import React, {useContext,useState} from 'react'
import tw from 'tailwind-rn';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import Header from '../../components/header';
import moment from 'moment';
import * as fbOperations from '../../firebase/operations';

const DetailEventScreen = ({navigation,route}) => {
    const [id, idSet] = useState(null);
    const [title, titleSet] = useState('');
    const [date, dateSet] = useState(moment().format('DD-MMMM-YYYY'));
    const [time, timeSet] = useState(moment().format('hh:mm a'));
    const [description, descriptionSet] = useState('');
    const [place, placeSet]= useState(null);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
    
            try {
                console.log(route.params.place)
                if(route.params && route.params.id){
                    idSet(route.params.id);
                    titleSet(route.params.title);
                    dateSet(moment(route.params.date).format('DD-MMM-YYYY'));
                    timeSet(moment(route.params.date).format('hh:mm a'));
                    descriptionSet(route.params.description);
                    placeSet(route.params.place);
                }
            } catch (error) {
                console.log(error)    
            }
            
        });
    
        return unsubscribe;
      }, [navigation]);
  return (
    <SafeAreaView style={[tw('mt-10'),styles.container]}>
        <Header title="Event Detail" callEnabled={false} />
        <View  style={styles.row}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{title}</Text>
        </View>
        <View  style={styles.row}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{date}</Text>
        </View>
        <View  style={styles.row}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>{time}</Text>
        </View>
        <View  style={styles.row}>
          <Text style={styles.label}>Place:</Text>
          <Text style={styles.value}>{place.name}</Text>
        </View>
        <View  style={styles.row}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>{place.location}</Text>
        </View>
        <View  style={styles.row}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{place.phone}</Text>
        </View>
        <View  style={styles.row}>
          <Text style={styles.label}>Description:</Text>
        </View>
        <View  style={styles.row}>
        <Text style={{marginBottom: 5,fontSize: 20,}}>{description}</Text>
        </View>
    </SafeAreaView>
  )
}

export default DetailEventScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFAEE'
    },
    row: {
        justifyContent: 'space-between',
        marginTop: 10,
        paddingHorizontal: "5%",
        flexDirection: "row"

    },
    label: {
        width: '50%',
        textAlign: 'left',
        fontWeight: '700',
        marginBottom: 5,
        fontSize: 20,
    },
    value: { 
        width: '50%',
        textAlign: 'right',
        marginBottom: 5,
        fontSize: 20,

    },
})