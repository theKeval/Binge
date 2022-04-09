import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InterestsScreen = () => {
  return (
    <View  style ={styles.container}>
      <Text>InterestsScreen</Text>
    </View>
  )
}

export default InterestsScreen

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