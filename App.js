import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/login/LoginScreen';
import HomeScreen from './screens/home/HomeScreen';
import { AuthenticatedUserProvider } from './navigation/AuthenticatedUserProvider';
import AboutMeScreen from './screens/register/AboutMeScreen';
import PreferencesScreen from './screens/register/PreferencesScreen';
import InterestsScreen from './screens/register/InterestsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthenticatedUserProvider>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          
          <Stack.Screen name="AboutMe" component={AboutMeScreen} />
          <Stack.Screen name="Preferences" component={PreferencesScreen} />
          <Stack.Screen name="Interests" component={InterestsScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
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