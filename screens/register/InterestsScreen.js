import { StyleSheet, Text, View,TouchableOpacity, TouchableHighlight } from 'react-native'
import React from 'react'
import { Button } from 'react-native-web';

const InterestsScreen = ({navigation}) => {

  var [isPress, setIsPress] = React.useState(false);

  var touchProps = {
    activeOpacity: 1,
    underlayColor: '#FFBE27',
    style: isPress ? styles.buttonPressed : styles.button,
    onHideUnderlay: () => setIsPress(false),
    onShowUnderlay: () => setIsPress(true),
    onPress: () => console.log('hello'),
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => {
            return  <TouchableOpacity onPress={() => {navigation.navigate('Photos') }}>
                      <Text style={styles.searchBtn}>SKIP</Text>
                    </TouchableOpacity> },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let others know what are you interested the most in from the list downbelow, pick minimum 5 then click continue to go the next page. 🚀</Text>

      <View style={styles.interestList}>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Art</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Fitness</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Sports</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Meditation</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Reading</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Volunteering</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Gaming</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Workaholic</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Programming</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Cooking</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Movies</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Acting</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Education</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Nursing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Entrepreneurship</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Outside Activities</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Designing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Dancing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Nature</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Travelling</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Photography</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Nature</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Reviewing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Sculpting</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Drawing</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Music</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Stand-ups</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Coaching</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Journalling</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Painting</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Swimming</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Extreme-sports</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Sedentarism</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Streaming</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Fashion</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Modelling</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>DIY</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Gardening</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Shopping</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Astrology</Text></TouchableHighlight>
        <TouchableHighlight {...touchProps} style={styles.button}><Text style={styles.buttonText}>Foodie</Text></TouchableHighlight>
      </View>
      <View style={styles.submitArea}>
      <TouchableOpacity style={styles.submit}><Text style={styles.submitText}>Continue 0/5</Text></TouchableOpacity></View>
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
      marginTop: 25,
      textAlign: 'center',
  },
  row: {
      justifyContent: 'center',
      marginTop: 5,
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
      marginTop: 40,
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
  submitArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submit: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 5,
    marginVertical: 25,
    borderWidth: 0,
    backgroundColor: '#FFBE27',
    borderRadius: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  submitText: {
    fontWeight: 'bold',
  }
})