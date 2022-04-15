import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const SplashScreen = () => {
  const navigation = useNavigation()
    const {height, width} = useWindowDimensions();

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

            try {
                setTimeout(() => {
                    // navigation.replace('Login');
                    navigation.navigate('Login')
                }, 2000);
            } catch (error) {
                console.log(error)    
            }
            
        });

        return unsubscribe;
    }, [navigation]);
  return (
    <View style={styles.container}  >
            <Image style={[styles.bingeLogo, {height: height*0.3}]} source={require('../../assets/bingelogo.png')} resizeMode="contain"/>
            <Text style={styles.label}>Welcome to Binge!</Text>

    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFAEE',
  },
  label:{
      marginTop: 20,
      fontSize: 25,
    color: '#009B81',

  }
})