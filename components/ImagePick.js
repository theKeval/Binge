import { StyleSheet, Text, View,TouchableOpacity,Button, Image, Platform,Share,StatusBar, ActivityIndicator} from 'react-native';
import * as Clipboard from "expo-clipboard";
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as fbOperations from '../firebase/operations'
const ImagePick = () => {
    const [image, imageSet] = useState(null);
    const [uploading, uploadingSet] = useState(false);
    React.useEffect(() => {
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
    
        _handleImagePicked(pickerResult);
    };
    
    const _pickImage = async () => {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
    });

        console.log({ pickerResult });

        _handleImagePicked(pickerResult);
    };
    
    const  _handleImagePicked = async (pickerResult) => {
        try {
            uploadingSet(true)
            if (!pickerResult.cancelled) {
                const uploadUrl = await fbOperations.uploadImageAsync(pickerResult.uri);
                imageSet(uploadUrl)
            }
        } catch (e) {
            console.log(e);
            alert("Upload failed, sorry :(");
        } finally {
            uploadingSet(false)

        }
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
    
      const _maybeRenderImage = () => {
        if (!image) {
          return;
        }
    
        return (
          <View
            style={{
              marginTop: 30,
              width: 250,
              borderRadius: 3,
              elevation: 2,
            }}
          >
            <View
              style={{
                borderTopRightRadius: 3,
                borderTopLeftRadius: 3,
                shadowColor: "rgba(0,0,0,1)",
                shadowOpacity: 0.2,
                shadowOffset: { width: 4, height: 4 },
                shadowRadius: 5,
                overflow: "hidden",
              }}
            >
              <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
            </View>
          </View>
        );
      };
  return (
        <View style={{alignItems: "center", justifyContent: "center" }}>
          {!!image && (
            <Text
              style={{
                fontSize: 20,
                marginBottom: 20,
                textAlign: "center",
                marginHorizontal: 15,
              }}
            >
              Example: Upload ImagePicker result
            </Text>
          )}
  
          <Button
            onPress={_pickImage}
            title="Pick an image from camera roll"
          />
  
          <Button onPress={_takePhoto} title="Take a photo" />
          
          {_maybeRenderImage()}
          {_maybeRenderUploadingOverlay()}
  
          <StatusBar barStyle="default" />
        </View>
  )
}

export default ImagePick

const styles = StyleSheet.create({})