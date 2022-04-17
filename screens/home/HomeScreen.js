import { useNavigation } from "@react-navigation/core";
import { AuthenticatedUserContext } from "../../navigation/AuthenticatedUserProvider";
import React, { useContext, useRef, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
} from "react-native";
import { auth, db } from "../../firebase/config";
import Card from "../../components/BingeCard";
import users from "../../assets/data/users";
import AnimatedStack from "../../components/AnimatedStack";
import Swiper from "react-native-deck-swiper";
import tw from "tailwind-rn";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";

const HomeScreen = () => {
  const [profiles, setProfiles] = useState([]);
  const swipeRef = useRef(null);

  const onSwipeLeft = (user) => {
    console.warn("swipe left", user.name);
  };

  const onSwipeRight = (user) => {
    console.warn("swipe right: ", user.name);
  };

  useEffect(() => {
    let unsub;

    const fetchUsers = async () => {
      unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
        setProfiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    fetchUsers();
    return unsub;
  }, []);

  console.log(profiles);

  return (
    <SafeAreaView style={[styles.safeAreaView, tw("flex-1 ")]}>
      <View style={styles.swiperContainer}>
        <Swiper
          ref={swipeRef}
          containerStyle={{ backgroundColor: "transparent" }}
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipeLeft={() => {
            console.log("Swipe Left");
          }}
          onSwipeRight={() => {
            console.log("Swipe Right");
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "LIKE",
              style: {
                label: {
                  color: "green",
                },
              },
            },
          }}
          renderCard={(card) => {
            return card ? (
              <View key={card.id} style={styles.cardView}>
                {/* , tailwind('bg-red-500 h-3/4 rounded-xl') */}
                {/* <Text style={styles.cardText}>{card.name}</Text> */}
                <Image style={styles.cardImg} source={{ uri: card.userPhotos[0] }} />

                <View
                  style={[
                    tw(
                      "absolute bottom-0 bg-white w-full flex-row justify-between items-center h-20 px-6 py-2 rounded-b-lg"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <View>
                    <Text style={tw("text-xl font-bold")}>{card.firstName}</Text>
                    <Text>{card.bio}</Text>
                  </View>
                  <Text style={tw("text-2xl font-bold")}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View style={[styles.noMoreProfileView, styles.cardShadow]}>
                {/* tw('relative bg-white h-3/4 rounded-lg justify-center items-center') */}
                <Text style={tw("font-bold pb-5")}>No More Profiles</Text>
                <Image
                  height={100}
                  width={100}
                  style={[tw("h-20 w-20"), styles.sadfaceImg]}
                  source={{
                    uri: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/313/crying-face_1f622.png",
                  }}
                />
              </View>
            );
          }}
        />
      </View>

      <View style={tw("flex flex-row justify-evenly mb-5")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={tw(
            "items-center justify-center rounded-full h-16 w-16 bg-red-200"
          )}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={tw(
            "items-center justify-center rounded-full h-16 w-16 bg-green-200"
          )}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  pageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "100%",
  },
  safeAreaView: {
    backgroundColor: "#FFFAEE",
  },
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
  swiperContainer: {
    flex: 1,
    // marginTop: 15,
  },
  cardView: {
    flex: 1,
    position: "relative",
    borderRadius: 15,
    // borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 100,
  },
  cardImg: {
    // position: 'absolute',
    height: "100%",
    width: "100%",
    borderRadius: 15,
    alignSelf: "center",
  },
  cardText: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
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
  noMoreProfileView: {
    // flex: 1,
    position: "relative",
    borderRadius: 15,
    height: "87%",
    // borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    marginBottom: 100,
    alignItems: "center",
  },
  sadfaceImg: {},
});
