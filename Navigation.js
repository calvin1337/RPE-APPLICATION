import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from "./Screens/Home";
import User from './Screens/User';
import { createStackNavigator } from '@react-navigation/stack'
import { FIREBASE_AUTH } from './firebase';

import Graphs from './Screens/Graph';
import Welcome from "./Screens/Welcome";
import InSport from "./Screens/InSport";
import GenderPick from './Screens/GenderPick';
import LoginInformation from './Screens/LoginInfo';
import WeightPicker from './Screens/WeightSelect';
import AddPhoto from './Screens/AddPhoto';
import CreateAccount from './Screens/CreateAccount';
import UserSettings from "./Screens/Settings";
import Login from './Screens/SignIn';
import Settings from "./Screens/Settings"; // Import the Settings screen component
import SafelyStoreData from "./Screens/SafelyStoreData"; // Import the Settings screen component MAYBE DELETE
import RPE from "./Screens/RPE";
import WhoAccessMyData from "./Screens/WhoAccessMyData";
import WhenTrackWorkout from "./Screens/WhenTrackWorkout";
import UserToCoach from "./Screens/UserToCoach";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    backgroundColor: "#2B2D42",
  }  
}


// Main navigation component
export default function Navigation({user, userData}) {
  
 
  
  return (
    <NavigationContainer>
      {user ? (
        // Analytics graphs etc
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
          <Tab.Screen 
            name="Graphs" 
            component={GraphStack} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.container}> 
                  <Ionicons name="bar-chart" size={32} color="white" />
                </View>
              )
            }}
          />
          {/* Home pages sports etc */}
          <Tab.Screen 
            name="Home" 
            component={HomeStack} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.container}> 
                  <Ionicons name="add-circle" size={32} color="#66AEC5" />
                </View>
              )
            }}
          />
          {/* Settings pages */}
          <Tab.Screen 
          name="User" 
          options={{
            tabBarIcon: ({focused}) => (
              <View style={styles.container}> 
                <Ionicons name="person" size={32} color="white" />
              </View>
            )
          }}
          >
          {() => <UserStack userData={userData} />}
        </Tab.Screen>
        </Tab.Navigator>
      ) : (
        <WelcomeStack />
      )}
    </NavigationContainer>
  );
}
// Stack navigator for home screens
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={Home} />
      <Stack.Screen name="InSportPage" component={InSport} />
      <Stack.Screen name="SettingsPage" component={UserSettings} />
      <Stack.Screen name="RPE" component={RPE} />
      <Stack.Screen name="WhenTrackWorkout" component={WhenTrackWorkout} />
      <Stack.Screen name="WhoAccessMyData" component={WhoAccessMyData} />
      <Stack.Screen name="UserToCoach" component={UserToCoach} />
      <Stack.Screen name="SafelyStoreData" component={SafelyStoreData} />
    </Stack.Navigator>
  );
};

// Stack navigator for welcome screen
// Loading pages etc
const WelcomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomePage" component={Welcome}/>
      <Stack.Screen name="GenderPick" component={GenderPick} />
      <Stack.Screen name="WeightPicker" component={WeightPicker} />
      <Stack.Screen name="AddProfilePhoto" component={AddPhoto} />
      <Stack.Screen name="LoginInfo" component={LoginInformation}/>
      <Stack.Screen name="UserLogin" component={Login} />
    </Stack.Navigator>
  );
}

const GraphStack = () => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="GraphPage" component={Graphs} />
    </Stack.Navigator>
  ) 
}

const UserStack = ({userData}) => {
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="UserPage">
        {(props) => <User {...props} userData={userData} />}
      </Stack.Screen>
    </Stack.Navigator>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
  },
});