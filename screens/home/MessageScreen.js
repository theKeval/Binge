import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from "react-native";
import tw from "tailwind-rn";
import Header from "../../components/header";
import getMatchedUserInfo from "../../lib/getMatchedUserInfo";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import ReceiverMessage from "../../components/ReceiverMessage";
import SenderMessage from "../../components/SenderMessage";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const MessageScreen = () => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { params } = useRoute();
  const { matchDetails } = params;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "matches", matchDetails.id, "messages"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [matchDetails, db]
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timestamp: serverTimestamp(),
      userId: user.id,
      displayName: user.firstName,
      photoURL: matchDetails.users[user.id].profilePicture,
      message: input,
    });

    setInput("");
  };

  return (
    <View style={tw("flex-1 mt-10")}>
      <Header
        title={getMatchedUserInfo(matchDetails.users, user.id).firstName}
        callEnabled={true}
      />

      <KeyboardAvoidingView
        style={tw("flex-1")}
        keyboardVerticalOffset={10}
        // behavior={Platform.}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            inverted={-1}
            style={tw("pl-4")}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.id ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>

        <View
          style={tw(
            "flex-row justify-between bg-white items-center border-t border-gray-200 px-5 py-2 mb-5"
          )}
        >
          <TextInput
            style={tw("h-10 text-lg")}
            placeholder="Send Message.."
            onChangeText={setInput}
            onSubmitEditing={sendMessage}
            value={input}
          />

          <Button title="Send" color="#FF5864" onPress={sendMessage} />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFAEE",
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
