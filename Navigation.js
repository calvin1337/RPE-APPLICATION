import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from "./Screens/Home";
import User from './Screens/User';
import Graphs from './Screens/Graph';
import Welcome from "./Screens/Welcome";
import InSport from "./Screens/InSport";
import Settings from "./Screens/Settings"; // Import the Settings screen component
import FAQ from "./Screens/FAQ"; // Import the Settings screen component
import RPE from "./Screens/RPE";
import WhoAccessMyData from "./Screens/WhoAccessMyData";
import WhenTrackWorkout from "./Screens/WhenTrackWorkout";

import { createStackNavigator } from '@react-navigation/stack';

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
};

export default function Navigation() {
  const [signedIn, setSignedIn] = useState(false);

  return (
    <NavigationContainer>
      {signedIn ? (
        <Tab.Navigator screenOptions={screenOptions} initialRouteName="Home">
          <Tab.Screen 
            name="Graphs" 
            component={Graphs} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.container}> 
                  <Ionicons name="bar-chart" size={32} color="white" />
                </View>
              )
            }}
          />
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
          <Tab.Screen 
            name="User" 
            component={User} 
            options={{
              tabBarIcon: ({focused}) => (
                <View style={styles.container}> 
                  <Ionicons name="person" size={32} color="white" />
                </View>
              )
            }}
          />
       
        </Tab.Navigator>
      ) : (
        <WelcomeStack setSignedIn={setSignedIn} />
      )}
    </NavigationContainer>
  );
}

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={Home} />
      <Stack.Screen name="InSportPage" component={InSport} />
      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="RPE" component={RPE} />
      <Stack.Screen name="WhenTrackWorkout" component={WhenTrackWorkout} />
      <Stack.Screen name="WhoAccessMyData" component={WhoAccessMyData} />

      <Stack.Screen name="FAQ" component={FAQ} />
    </Stack.Navigator>
  );
};

const WelcomeStack = ({ setSignedIn }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="WelcomePage">
        {(props) => <Welcome {...props} setSignedIn={setSignedIn} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2B2D42',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
