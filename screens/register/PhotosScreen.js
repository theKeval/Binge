import { StyleSheet, Text, View,TouchableOpacity,Button, Image, Platform,Share,StatusBar, ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react';
import ImagePick from '../../components/imagePick';

const PhotosScreen = ({navigation}) => {
    const [image, imageSet] = useState(null);
    const [uploading, uploadingSet] = useState(false);
    React.useEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return  <TouchableOpacity onPress={() => {navigation.navigate('Home') }}>
                            <Text style={styles.searchBtn}>SKIP</Text>
                        </TouchableOpacity> },
        });
        const unsubscribe = navigation.addListener('focus', async () => {
        try {
        } catch (error) {
            console.log(error)
        }
            
        });

        return unsubscribe;
    }, [navigation]);    

    
  return (
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Button title="Pick an image from camera roll" onPress={pickImage} />
    //   {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    // </View>
    <View  style ={styles.container}>
        <View  style={styles.row}>
            {/* <ImagePick ></ImagePick> */}
        </View>
    </View>
  )
}

export default PhotosScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFAEE',
        paddingHorizontal: '5%',
        paddingTop: 10
    },
    row: {
        justifyContent: 'center',
        marginTop: 10,
    },
})