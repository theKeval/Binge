import { useNavigation } from "@react-navigation/core";
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import users from "../assets/data/users";
import tw from "tailwind-rn";
import ChatRow from "./ChatRow";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { AuthenticatedUserContext } from "../navigation/AuthenticatedUserProvider";
import { db } from "../firebase/config";

const ChatList = ({ navigation }) => {
  const [matches, setMatches] = useState([]);
  const { user, setUser } = useContext(AuthenticatedUserContext);

  useEffect(
    () => user ?
      onSnapshot(
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user?.id)
        ),
        (snapshot) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ) : '',
    [user]
  );

  // console.log(matches);

  return users.length > 0 ? (
    <FlatList
      style={tw("h-full")}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    />
  ) : (
    <View style={tw("p-5")}>
      <Text>No Matches at the Moment</Text>
    </View>
  );
};

export default ChatList;

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
});
