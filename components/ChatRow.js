import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import users from "../assets/data/users";
import tw from "tailwind-rn";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import getMatchedUserInfo from "../lib/getMatchedUserInfo";
import {db} from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const ChatRow = ({ matchDetails }) => {
  const navigation = useNavigation();
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(
    () => user ? setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.id)) : '',
    [matchDetails, user]
  );

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ), snapshot => setLastMessage(snapshot.docs[0]?.data()?.message)
      ),
    [matchDetails, db]
  );

  // console.log("matchDetails: " + JSON.stringify(matchDetails));
  // console.log("matchedUserInfo: " + JSON.stringify(matchedUserInfo));

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MessageScreen", { matchDetails })}
      style={[
        tw("flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg"),
        styles.cardShadow,
      ]}
    >
      <Image
        style={tw("rounded-full h-16 w-16 mr-4")}
        source={{ uri: matchedUserInfo ? matchedUserInfo.profilePicture : "https://cdn3.vectorstock.com/i/thumb-large/11/72/outline-profil-user-or-avatar-icon-isolated-vector-35681172.jpg" }}
      />

      <View>
        <Text style={tw("text-lg font-semibold")}>
          {matchedUserInfo ? matchedUserInfo.firstName : ""}
        </Text>

        <Text style={[tw(''), {maxWidth: '87%', textAlign:'left'}]}>{ lastMessage || `Let's go Food hunting!`}</Text>
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
