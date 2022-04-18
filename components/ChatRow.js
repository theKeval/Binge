import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import users from "../assets/data/users";
import tw from "tailwind-rn";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.id))
  }, [matchDetails, user]);

  console.log("matchDetails: " + JSON.stringify(matchDetails));
  console.log("matchedUserInfo: " + JSON.stringify(matchedUserInfo));

  return (
    <TouchableOpacity
        onPress={() => navigation.navigate('MessageScreen')}
      style={[
        tw("flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"),
        styles.cardShadow,
      ]}
    >
      <Image
        style={tw("rounded-full h-16 w-16 mr-4")}
        source={{ uri: matchedUserInfo ? matchedUserInfo.profilePicture : "" }}
      />

      <View>
        <Text style={tw("text-lg font-semibold")}>{matchedUserInfo ? matchedUserInfo.firstName : ""}</Text>

        <Text>Let's go Food hunting!</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 5,
  },
});
