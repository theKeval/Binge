import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Platform,
  Share,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import ImageUploader from "../../components/ImageUploader";
import useWindowDimensions from "react-native/Libraries/Utilities/useWindowDimensions";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import * as fbOperations from "../../firebase/operations";

const PhotosScreen = ({ navigation }) => {
  const { height, width } = useWindowDimensions();
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const [image1, image1Set] = useState("");
  const [image2, image2Set] = useState("");
  const [image3, image3Set] = useState("");
  const [image4, image4Set] = useState("");
  const [image5, image5Set] = useState("");
  const [image6, image6Set] = useState("");
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        if (user && user.email) {
          await image1Set(user.userPhotos[0] || "");
          await image2Set(user.userPhotos[1] || "");
          await image3Set(user.userPhotos[2] || "");
          await image4Set(user.userPhotos[3] || "");
          await image5Set(user.userPhotos[4] || "");
          await image6Set(user.userPhotos[5] || "");
        }
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const savePhotos = () => {
    const photosObj = { ...user };
    photosObj["userPhotos"] = [image1, image2, image3, image4, image5, image6];
    photosObj["profilePicture"] =
      image1 || image2 || image3 || image4 || image5 || image6 || "";

    if (!photosObj["profilePicture"]) {
      alert("Please upload at least one image");
    } else {
      photosObj["finishedProfile"] = true;
      fbOperations
        .updateUserInfo(user.email, photosObj)
        .then(async () => {
          await setUser(photosObj);
          navigation.replace("Home");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.col}>
          <ImageUploader
            imageURL={image1}
            onSetImageURL={(url) => {
              image1Set(url);
            }}
            widthImg={width * 0.625}
            heightImg={width * 0.625}
          ></ImageUploader>
        </View>
        <View style={[styles.col, { justifyContent: "space-between" }]}>
          <View style={styles.row}>
            <ImageUploader
              imageURL={image2}
              onSetImageURL={(url) => {
                image2Set(url);
              }}
              widthImg={width * 0.25}
              heightImg={width * 0.25}
            ></ImageUploader>
          </View>
          <View style={styles.row}>
            <ImageUploader
              imageURL={image3}
              onSetImageURL={(url) => {
                image3Set(url);
              }}
              widthImg={width * 0.25}
              heightImg={width * 0.25}
            ></ImageUploader>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.col}>
          <ImageUploader
            imageURL={image4}
            onSetImageURL={(url) => {
              image4Set(url);
            }}
            widthImg={width * 0.25}
            heightImg={width * 0.25}
          ></ImageUploader>
        </View>
        <View style={styles.col}>
          <ImageUploader
            imageURL={image5}
            onSetImageURL={(url) => {
              image5Set(url);
            }}
            widthImg={width * 0.25}
            heightImg={width * 0.25}
          ></ImageUploader>
        </View>
        <View style={styles.col}>
          <ImageUploader
            imageURL={image6}
            onSetImageURL={(url) => {
              image6Set(url);
            }}
            widthImg={width * 0.25}
            heightImg={width * 0.25}
          ></ImageUploader>
        </View>
      </View>
      <View style={styles.row}>
        <TouchableOpacity onPress={savePhotos} style={styles.btnSave}>
          <Text style={styles.buttonText}>Finish Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#FFFAEE",
    paddingHorizontal: "5%",
    paddingTop: 20,
  },
  col: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    padding: 5,
  },
  row: {
    marginVertical: 5,

    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-start",
  },
  btnSave: {
    marginTop: 20,
    backgroundColor: "#FFBE27",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
export default PhotosScreen;
