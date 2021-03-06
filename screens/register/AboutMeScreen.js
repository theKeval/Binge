import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState, useContext } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Picker } from "@react-native-picker/picker";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import * as fbOperations from "../../firebase/operations";

const AboutMeScreen = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const [currentDate, currentDateSet] = useState(
    moment().add(-19, "years").toDate()
  );
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const [firstName, firstNameSet] = useState("");
  const [lastName, lastNameSet] = useState("");
  const [dob, dobSet] = useState("");
  const [gender, genderSet] = useState("female");
  const [aboutMe, aboutMeSet] = useState("");

  const shouldNavigate = () => {
    if(!firstName || !dob) {
        alert('First name and Date of birth is mandatory');
        return false;
    }

    return true;
  }

  const saveAboutMe = () => {
    const aboutMeObj = { ...user };
    aboutMeObj["firstName"] = firstName;
    aboutMeObj["lastName"] = lastName;
    aboutMeObj["dob"] = dob;
    aboutMeObj["gender"] = gender;
    aboutMeObj["aboutMe"] = aboutMe;

    if(shouldNavigate()) {
        fbOperations
      .updateUserInfo(user.email, aboutMeObj)
      .then(async () => {
        await setUser(aboutMeObj);

        navigation.navigate("Preferences");
      })
      .catch((e) => {
        console.log(error);
      });
    } else {
        // don't navigate to next screen
    }

    
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            onPress={() => {
                // navigation.navigate("Preferences");
                saveAboutMe();
            }}
          >
            <Text style={styles.searchBtn}>SKIP</Text>
          </TouchableOpacity>
        );
      },
    });
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        if (user && user.email) {
            console.log(user);
          await firstNameSet(user.firstName);
          await lastNameSet(user.lastName);
          await aboutMeSet(user.aboutMe);
          if (user.dob !== "") {
            await dobSet(user.dob);
            try {
              await currentDateSet(moment(user.dob).toDate());
            } catch (error) {}
          }

          await genderSet(user.gender);
        }
      } catch (error) {
        console.log(error);
      }
    });

    return unsubscribe;
  }, [navigation]);
  return (
    <View  style ={styles.container}>
        <View  style={styles.row}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
                placeholder='First Name'
                value={firstName}
                onChangeText={text => firstNameSet(text)}
                style={[styles.textField]}
            />
        </View>
        <View  style={styles.row}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
                placeholder='Last Name'
                value={lastName}
                onChangeText={text => lastNameSet(text)}
                style={[styles.textField]}
            />
        </View>
        <View  style={styles.row}>
            <Text style={styles.label}>Date of birth:</Text>
            {show && (
                <DateTimePicker
                value={currentDate}
                mode={'date'}
                onChange={(event, selectedDate) => {setShow(false);if(event.type !== 'dismissed') {dobSet(moment(selectedDate).format('DD-MMM-YYYY'))};}}
                />
            )}
                <TextInput
                    onPressIn={async ()=>{await setShow(true)}}
                    placeholder='DOB'
                    value={dob}
                    style={[styles.textField]}
                />

        </View>
        <View  style={styles.row}>
            <Text style={styles.label}>Gender:</Text>
            <View style={[styles.field]}>
                <Picker
                    
                    selectedValue={gender}
                    onValueChange={(itemValue, itemIndex) =>
                        genderSet(itemValue)
                    }>
                    <Picker.Item label="-- Select --" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Non-binary" value="nonBinary" />
                    <Picker.Item label="I rather not say" value="notSay" />
                </Picker>
            </View>
        </View>
        <View  style={styles.row}>
            <Text style={styles.label}>About me:</Text>
            <TextInput
                placeholder='About me'
                value={aboutMe}
                multiline={true}
                numberOfLines={4}
                onChangeText={text => aboutMeSet(text)}
                style={[styles.textField,{textAlignVertical:'top'}]}
            />
        </View>

      {/* </View> */}
      <View style={styles.row}>
        <TouchableOpacity onPress={saveAboutMe} style={styles.btnSave}>
          <Text style={styles.buttonText}>Save and Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutMeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFAEE",
    paddingHorizontal: "5%",
    paddingTop: 10,
  },
  row: {
    justifyContent: "center",
    marginTop: 10,
  },
  label: {
    textAlign: "left",
    fontWeight: "700",
    marginBottom: 5,
    fontSize: 16,
  },
  searchBtn: {
    marginHorizontal: 10,
    padding: 5,
  },
  textField: {
    backgroundColor: "white",
    borderColor: "#009B81",
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  field: {
    backgroundColor: "white",
    borderColor: "#009B81",
    borderWidth: 2,
    borderRadius: 10,
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
