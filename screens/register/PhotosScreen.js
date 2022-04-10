import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const PhotosScreen = ({navigation}) => {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return  <TouchableOpacity onPress={() => {navigation.navigate('Home') }}>
                <Text style={styles.searchBtn}>
                  SKIP
                </Text>
              </TouchableOpacity> },
        });
      }, [navigation]);
  return (
    <View>
      <Text>PhotosScreen</Text>
    </View>
  )
}

export default PhotosScreen

const styles = StyleSheet.create({})