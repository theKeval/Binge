import { useNavigation, useRoute } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import tw from "tailwind-rn";

const MatchScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { loggedInProfile, userSwiped } = params;

  return (
    <View style={[tw("h-full pt-20"), { opacity: 0.92, backgroundColor: '#FFBE27' }]}>
      <View style={tw("justify-center px-10 pt-20")}>
        <Image
          style={tw("h-20 w-full")}
          source={{
            uri: "https://e9digital.com/love-at-first-website/images/its-a-match.png",
          }}
        />
      </View>

      <Text style={tw("text-white text-center mt-5")}>
        You and {userSwiped.firstName} have liked each other.
      </Text>

      <View style={tw("flex-row justify-evenly mt-5")}>
        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: loggedInProfile.profilePicture }}
        />

        <Image
          style={tw("h-32 w-32 rounded-full")}
          source={{ uri: userSwiped.profilePicture }}
        />
      </View>

      <TouchableOpacity
        style={tw("bg-white m-5 px-10 py-8 rounded-full mt-20")}
        onPress={() => {
          navigation.goBack();
          navigation.navigate("MatchesScreen");
        }}
      >
        <Text style={tw("text-center")}>Send a Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchScreen;
