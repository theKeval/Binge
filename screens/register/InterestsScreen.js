import { StyleSheet, Text, View,TouchableOpacity, TouchableHighlight } from 'react-native'
import React, { useEffect, useState, useContext} from 'react';
import { AuthenticatedUserContext } from '../../navigation/AuthenticatedUserProvider';
import * as fbOperations from '../../firebase/operations';

const InterestsScreen = ({navigation}) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const [interests, interestsSet] = useState([]);
  var touchProps = {
    activeOpacity: 1,
    underlayColor: '#FFBE27',

  }

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return  <TouchableOpacity onPress={() => {navigation.navigate('Photos') }}>
                      <Text style={styles.searchBtn}>SKIP</Text>
                    </TouchableOpacity> },
    });
    const unsubscribe = navigation.addListener('focus', async () => {

        try {
            if(user && user.email){
               await interestsSet( user.interests)
            }
        } catch (error) {
            console.log(error)    
        }
        
    });

    return unsubscribe;
}, [navigation]);
  const toggleInterest = (selectedInterest,event)=> {
    if(interests.includes(selectedInterest)){
      let newInterests = [...interests]
      newInterests.splice(newInterests.indexOf(selectedInterest),1)
      interestsSet(newInterests);
    }else{
      interestsSet([...interests,selectedInterest]);
    }
  }

  
  const saveInterests = () =>{
    const interestsObj = {...user}
    interestsObj["interests"] = interests; 
    fbOperations.updateUserInfo(user.email,interestsObj).then(async ()=>{
        await setUser(interestsObj);
        navigation.navigate('Photos');
    }).catch((e)=> {
        console.log(error)
    })
  }
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Let others know what are you interested the most in, from the list downbelow, pick a minimum of 5, then click continue to go to the next page. 🚀
      </Text>

      <View style={styles.interestList}>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Art',event)} style={interests.includes('Art') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Art</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Fitness',event)} style={interests.includes('Fitness') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Fitness</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Sports',event)} style={interests.includes('Sports') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Sports</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Meditation',event)} style={interests.includes('Meditation') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Meditation</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Reading',event)} style={interests.includes('Reading') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Reading</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Volunteering',event)} style={interests.includes('Volunteering') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Volunteering</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Gaming',event)} style={interests.includes('Gaming') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Gaming</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Workaholic',event)} style={interests.includes('Workaholic') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Workaholic</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Programming',event)} style={interests.includes('Programming') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Programming</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Cooking',event)} style={interests.includes('Cooking') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Cooking</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Movies',event)} style={interests.includes('Movies') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Movies</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Acting',event)} style={interests.includes('Acting') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Acting</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Education',event)} style={interests.includes('Education') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Education</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Nursing',event)} style={interests.includes('Nursing') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Nursing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Entrepreneurship',event)} style={interests.includes('Entrepreneurship') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Entrepreneurship</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Outside Activities',event)} style={interests.includes('Outside Activities') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Outside Activities</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Designing',event)} style={interests.includes('Designing') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Designing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Dancing',event)} style={interests.includes('Dancing') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Dancing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Nature',event)} style={interests.includes('Nature') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Nature</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Travelling',event)} style={interests.includes('Travelling') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Travelling</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Photography',event)} style={interests.includes('Photography') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Photography</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Reviewing',event)} style={interests.includes('Reviewing') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Reviewing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Sculpting',event)} style={interests.includes('Sculpting') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Sculpting</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Drawing',event)} style={interests.includes('Drawing') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Drawing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Music',event)} style={interests.includes('Music') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Music</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Stand-ups',event)} style={interests.includes('Stand-ups') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Stand-ups</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Coaching',event)} style={interests.includes('Coaching') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Coaching</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Journalling',event)} style={interests.includes('Journalling') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Journalling</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Painting',event)} style={interests.includes('Painting') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Painting</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Swimming',event)} style={interests.includes('Swimming') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Swimming</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Extreme-sports',event)} style={interests.includes('Extreme-sports') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Extreme-sports</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Sedentarism',event)} style={interests.includes('Sedentarism') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Sedentarism</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Streaming',event)} style={interests.includes('Streaming') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Streaming</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Fashion',event)} style={interests.includes('Fashion') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Fashion</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Modelling',event)} style={interests.includes('Modelling') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Modelling</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('DIY',event)} style={interests.includes('DIY') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>DIY</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Gardening',event)} style={interests.includes('Gardening') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Gardening</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Shopping',event)} style={interests.includes('Shopping') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Shopping</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Astrology',event)} style={interests.includes('Astrology') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Astrology</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} onPress={(event) => toggleInterest('Foodie',event)} style={interests.includes('Foodie') ? styles.buttonPressed : styles.button}><Text style={styles.buttonText}>Foodie</Text></TouchableHighlight>
      </View>
        <View  style={styles.row}>
            <TouchableOpacity
            onPress={saveInterests}
            style={styles.btnSave}
            >
                <Text style={styles.buttonText}>Save and Continue</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default InterestsScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFFAEE',
      paddingHorizontal: '5%',
      paddingTop: 10,
  },
  buttonText: {
    color: 'black',
  },
  header: {
      textAlign: 'justify',
      marginTop: 10,
      textAlign: 'center',
  },
  row: {
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
      backgroundColor: 'white',
      borderWidth: 2,
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
  },
  interestList:{
      marginTop: 10,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 3,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#FFBE27',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  buttonPressed: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 3,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#FFBE27',
    borderWidth: 1,
    backgroundColor: '#FFBE27',
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