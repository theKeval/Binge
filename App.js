import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5,AntDesign,Entypo,Fontisto,MaterialIcons} from '@expo/vector-icons';
import { AuthenticatedUserProvider, AuthenticatedUserContext } from './navigation/AuthenticatedUserProvider';

import LoginScreen from './screens/login/LoginScreen';
import HomeScreen from './screens/home/HomeScreen';
import AboutMeScreen from './screens/register/AboutMeScreen';
import PreferencesScreen from './screens/register/PreferencesScreen';
import InterestsScreen from './screens/register/InterestsScreen';
import PhotosScreen from './screens/register/PhotosScreen';
import SplashScreen from './screens/login/SplashScreen';
import MatchesScreen from './screens/home/MatchesScreen';
import AccountScreen from './screens/home/AccountScreen';
import OTPScreen from './screens/login/OTPScreen';
import EventsScreen from './screens/home/EventsScreen';
import MessageScreen from './screens/home/MessageScreen';
import EditEventScreen from './screens/home/EditEventScreen';
import MatchScreen from './screens/home/MatchScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ({navigation}) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {

    });
      // Return the function to unsubscribe from the event so it gets removed on unmount
      return unsubscribe;
    }, [navigation]);

  return (    
      <Tab.Navigator 
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconColor;
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'MatchesScreen') {
              iconName = focused ? 'chatbox-ellipses' : 'chatbox-ellipses-outline';
            } else if (route.name === 'AccountScreen') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'EventsScreen') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            }
            
            // else if (route.name === 'UsersListScreen') {
            //   iconName = focused ? 'people-sharp' : 'people-outline';
            // }else if (route.name === 'StatisticsScreen') {
            //   iconName = focused ? 'bar-chart' : 'bar-chart-outline';
            // }else if (route.name === 'AccountScreen' ||  route.name === 'LoginScreen') {
            //   iconName = focused ? 'person' : 'person-outline';
            // }

            // console.log(route.name)
            iconColor = focused ? '#FFC44E' : 'black';
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={iconColor} />;
          },
          tabBarActiveTintColor: 'gray',
          tabBarInactiveTintColor: 'black',
          
          headerTintColor: 'white',

          
        })}>

          <Tab.Screen name="HomeScreen" component={HomeScreen}  options={{headerShown: false, title:'People'}}/>
          <Tab.Screen name="MatchesScreen" component={MatchesScreen}  options={{ headerShown: false, title : 'Matches'}} />
          <Tab.Screen name="EventsScreen" component={EventsScreen}  options={{ headerShown: false, title : 'Events'}} />
         
          <Tab.Screen name="AccountScreen" component={AccountScreen}  options={{ headerShown: false, title : 'Account'}} />

        </Tab.Navigator>
  )
}



export default function App() {
  const { user, setUser} = useContext(AuthenticatedUserContext) ;

  return (
    <AuthenticatedUserProvider>

      <NavigationContainer>
          
        <Stack.Navigator   initialRouteName='Splash'>
          <Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen}  />
          <Stack.Screen options={{ headerShown: false }} name="OTP" component={OTPScreen} /> 
          <Stack.Screen name="AboutMe" component={AboutMeScreen} /> 
          <Stack.Screen name="Preferences" component={PreferencesScreen} /> 
          <Stack.Screen name="Interests" component={InterestsScreen} /> 
          <Stack.Screen name="Photos" component={PhotosScreen} /> 
          <Stack.Screen name="EditEventScreen" component={EditEventScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} /> 
          <Stack.Screen name="MessageScreen" component={MessageScreen}  options={{ headerShown: false, title : 'Message'}} />

          <Stack.Group screenOptions={{presentation: 'transparentModal'}}>
            <Stack.Screen name='Match' component={MatchScreen} options={{headerShown: false}} />
          </Stack.Group>
          
        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticatedUserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});