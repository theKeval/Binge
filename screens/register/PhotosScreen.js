import { StyleSheet, Text, View,TouchableOpacity,Button, Image, Platform,Share,StatusBar, ActivityIndicator} from 'react-native';
import React, { useState, useEffect } from 'react';
import ImageUploader from '../../components/ImageUploader';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const PhotosScreen = ({navigation}) => {
    const {height, width} = useWindowDimensions();

    const [image1, image1Set] = useState(null);
    const [image2, image2Set] = useState(null);
    const [image3, image3Set] = useState(null);
    const [image4, image4Set] = useState(null);
    const [image5, image5Set] = useState(null);
    const [image6, image6Set] = useState(null);
    const [image7, image7Set] = useState(null);
    const [image8, image8Set] = useState(null);
    const [image9, image9Set] = useState(null);
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
            <View  style={styles.col}>
                <ImageUploader imageURL={image1} onSetImageURL={(url)=>{image1Set(url)}} widthImg={width*0.625} heightImg={width*0.625}></ImageUploader>
            </View>
            <View  style={styles.col}>
                <ImageUploader imageURL={image2} onSetImageURL={(url)=>{image2Set(url)}} widthImg={width*0.25} heightImg={width*0.25}></ImageUploader>

                <ImageUploader imageURL={image3} onSetImageURL={(url)=>{image3Set(url)}} widthImg={width*0.25} heightImg={width*0.25}></ImageUploader>
            </View>
        </View>
        <View  style={styles.row}>
            <View  style={styles.col}>
                <ImageUploader imageURL={image4} onSetImageURL={(url)=>{image4Set(url)}} widthImg={width*0.25} heightImg={width*0.25}></ImageUploader>
            </View>
            <View  style={styles.col}>
                <ImageUploader imageURL={image5} onSetImageURL={(url)=>{image5Set(url)}} widthImg={width*0.25} heightImg={width*0.25}></ImageUploader>
            </View>
            <View  style={styles.col}>
                <ImageUploader imageURL={image6} onSetImageURL={(url)=>{image6Set(url)}} widthImg={width*0.25} heightImg={width*0.25}></ImageUploader>
            </View>
        </View>
        <View  style={styles.row}>
            <View  style={styles.col}>
                <ImageUploader imageURL={image7} onSetImageURL={(url)=>{image7Set(url)}} widthImg={width*0.25} heightImg={width*0.25}></ImageUploader>
            </View>
            <View  style={styles.col}>
                <ImageUploader imageURL={image8} onSetImageURL={(url)=>{image8Set(url)}} widthImg={width*0.25} heightImg={width*0.25}></ImageUploader>
            </View>
            <View  style={styles.col}>
                <ImageUploader imageURL={image9} onSetImageURL={(url)=>{image9Set(url)}} widthImg={width*0.25} heightImg={width*0.25}></ImageUploader>
            </View>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#FFFAEE',
        paddingHorizontal: '5%',
        paddingTop: 10
    },
    col: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent:'center',
        padding: 5,
    },
    row: {
        marginVertical: 5,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent:'center',
    },
    bigImg: {
        
    },
    tinyImg: {
        
    },
})
export default PhotosScreen

