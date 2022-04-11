import { StyleSheet, Text, View,TouchableOpacity,Button, Image, Platform,Share,StatusBar, ActivityIndicator,Modal} from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as fbOperations from '../firebase/operations'
import { Ionicons} from '@expo/vector-icons';

const ImageUploader = ({imageURL,onSetImageURL,widthImg, heightImg}) => {
    const [image, imageSet] = useState(imageURL);
    const [uploading, uploadingSet] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    
    React.useEffect(async () => {
        if (Platform.OS !== "web") {
            const {status,} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== "granted") {
                alert("Sorry, we need camera roll permissions to make this work!");
            }
        }

        return ;
    }, []);  


    const _takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
    
        return _handleImagePicked(pickerResult);
    };
    
    const _pickImage = async () => {
      
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
    });

        // console.log({ pickerResult });

        return _handleImagePicked(pickerResult);
    };
    
    const  _handleImagePicked = async (pickerResult) => {
      let url = null;
        try {
            uploadingSet(true)
            if (!pickerResult.cancelled) {
                const uploadUrl = await fbOperations.uploadImageAsync(pickerResult.uri);
                imageSet(uploadUrl)
                url = uploadUrl;
                onSetImageURL(url)
            }
            uploadingSet(false)
        } catch (e) {
            console.log(e);
            // alert("Upload failed, sorry :(");
            uploadingSet(false)
        } 
        return url
    };

    const  _maybeRenderUploadingOverlay = () => {
        if (uploading) {
          return (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: "rgba(0,0,0,0.4)",
                  alignItems: "center",
                  justifyContent: "center",
                },
              ]}
            >
              <ActivityIndicator color="#fff" animating size="large" />
            </View>
          );
        }
    };
    
  return (


          <TouchableOpacity onPress={() => {_pickImage() }} style={[styles.imgCont,{width: widthImg, height: heightImg,}]}>

              
              {image ?
                  <Image source={{ uri: image }} style={{ width: widthImg, height: heightImg }} />

              : 
                  <Ionicons name='image' size={widthImg*0.8} color='lightgray' />

              }
            
          {_maybeRenderUploadingOverlay()}
          <StatusBar barStyle="default" />
          </TouchableOpacity>
  
          
  )
}
const styles = StyleSheet.create({




  imgCont:{
    backgroundColor:'grey',
    borderRadius: 1, 
    elevation: 2,
    flexDirection:'row',

    alignContent: 'center',
    justifyContent: 'center',
  }
})

export default ImageUploader
