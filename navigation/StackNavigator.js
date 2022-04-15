import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  FontAwesome5,
  AntDesign,
  Entypo,
  Fontisto,
  MaterialIcons,
} from "@expo/vector-icons";

import useAuth from "../hooks/useAuth";

import LoginScreen from "../screens/login/LoginScreen";
import HomeScreen from "../screens/home/HomeScreen";
import AboutMeScreen from "../screens/register/AboutMeScreen";
import PreferencesScreen from "../screens/register/PreferencesScreen";
import InterestsScreen from "../screens/register/InterestsScreen";
import PhotosScreen from "../screens/register/PhotosScreen";
import SplashScreen from "../screens/login/SplashScreen";
import MatchesScreen from "../screens/home/MatchesScreen";
import AccountScreen from "../screens/home/AccountScreen";
import OTPScreen from "../screens/login/OTPScreen";
import EventsScreen from "../screens/home/EventsScreen";
import MessageScreen from "../screens/home/MessageScreen";


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {    // { navigation }
//   useEffect(() => {
//     const unsubscribe = navigation.addListener("focus", () => {});
//     // Return the function to unsubscribe from the event so it gets removed on unmount
//     return unsubscribe;
//   }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconColor;
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "MatchesScreen") {
            iconName = focused
              ? "chatbox-ellipses"
              : "chatbox-ellipses-outline";
          } else if (route.name === "AccountScreen") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "EventsScreen") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          // console.log(route.name)
          iconColor = focused ? "#FFC44E" : "black";
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
        tabBarActiveTintColor: "gray",
        tabBarInactiveTintColor: "black",

        headerTintColor: "white",
      })}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false, title: "People" }}
      />
      <Tab.Screen
        name="MatchesScreen"
        component={MatchesScreen}
        options={{ headerShown: false, title: "Matches" }}
      />
      <Tab.Screen
        name="EventsScreen"
        component={EventsScreen}
        options={{ headerShown: false, title: "Events" }}
      />
      <Tab.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{ headerShown: false, title: "Account" }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  const { authUser, user } = useAuth();

  return (
      
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {console.log("test")}
      {authUser && user && user.finishedProfile ? (
        <>
        {console.log("user is logged in and profile finished")}
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="MessageScreen"
            component={MessageScreen}
            options={{ headerShown: false, title: "Message" }}
          />
        </>
      ) :  ( 
        <>
        {console.log("user is not logged in")}

          <Stack.Screen
            options={{ headerShown: false }}
            name="Splash"
            component={SplashScreen}
          />

          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="OTP"
            component={OTPScreen}
          />

          
          <Stack.Screen name="AboutMe" component={AboutMeScreen} />
          <Stack.Screen name="Preferences" component={PreferencesScreen} />
          <Stack.Screen name="Interests" component={InterestsScreen} />
          <Stack.Screen name="Photos" component={PhotosScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
