import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from 'react-native-web';

const InterestsScreen = ({navigation}) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => {
            return  <TouchableOpacity onPress={() => {navigation.navigate('Photos') }}>
            <Text style={styles.searchBtn}>
              SKIP
            </Text>
          </TouchableOpacity> },
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Let others know what are you interested the most :)</Text>

      <View style={styles.interestList}>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
        <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
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
  header: {
      marginTop: 25,
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
      backgroundColor: 'white',
      borderWidth: 2,
      borderRadius: 5,
      paddingHorizontal: 15,
      paddingVertical: 10,
  },
  interestList:{
      marginTop: 60,
      display: 'flex',
  },
  button: {
    backgroundColor: 'white',
    width: '20%',
    padding: 5,
    borderRadius: 10,
    alignItems: 'center',
    borderColor: '#FFBE27',
    borderWidth: 1,
  },
})